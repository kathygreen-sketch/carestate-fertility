-- ═══════════════════════════════════════════════════════════════
-- CareState Fertility · Safe Room Schema
-- Supabase / PostgreSQL · HIPAA-adjacent design
--
-- All clinical payload columns store AES-256 ciphertext (base64).
-- The encryption key never touches this database; it lives in the
-- user's device keychain or AWS KMS per deployment environment.
-- ═══════════════════════════════════════════════════════════════

-- ── Extensions ──────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ── Enum types ───────────────────────────────────────────────────
create type package_type   as enum ('egg_freezing','iui','ivf','fet','ropa','donor','surrogacy');
create type package_status as enum ('pre_cycle','stimulation','retrieval','transfer','tww','complete','cancelled');
create type record_type    as enum ('medication','package_state','lab_result','clinic_comm','ocr_capture','voice_capture');
create type sync_status    as enum ('pending','syncing','synced','failed');
create type alert_level    as enum ('clear','watch','warning','critical','exceeded');

-- ── Users (thin profile; identity managed by Supabase Auth) ──────
create table if not exists profiles (
  id            uuid primary key references auth.users on delete cascade,
  display_alias text        not null default 'Patient',   -- never real name in DB
  package_type  package_type,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Sanctuary Records (encrypted clinical payload store) ─────────
-- Each row holds one encrypted document. The server never sees the
-- plaintext; it only indexes metadata for sync orchestration.
create table if not exists sanctuary_records (
  id                uuid         primary key default uuid_generate_v4(),
  user_id           uuid         not null references profiles(id) on delete cascade,
  record_type       record_type  not null,
  encrypted_payload text         not null,  -- AES-256-GCM ciphertext (base64)
  iv                text         not null,  -- 12-byte GCM nonce (base64)
  sync_status       sync_status  not null default 'pending',
  synced_at         timestamptz,
  created_at        timestamptz  not null default now(),
  updated_at        timestamptz  not null default now()
);

create index sanctuary_records_user_type on sanctuary_records(user_id, record_type);
create index sanctuary_records_sync      on sanctuary_records(user_id, sync_status) where sync_status != 'synced';

-- ── Medication Instructions (metadata only — payload encrypted) ───
-- Stores enough metadata for Loop Closer to orchestrate sync
-- without exposing PHI. Plaintext medication data lives in
-- sanctuary_records encrypted payload.
create table if not exists medication_sync_state (
  id                  uuid         primary key default uuid_generate_v4(),
  user_id             uuid         not null references profiles(id) on delete cascade,
  sanctuary_record_id uuid         not null references sanctuary_records(id) on delete cascade,
  is_critical         boolean      not null default false,
  is_verified         boolean      not null default false,
  pharmacy_synced_at  timestamptz,
  clinic_synced_at    timestamptz,
  bridge_rx_active    boolean      not null default false,
  created_at          timestamptz  not null default now(),
  updated_at          timestamptz  not null default now()
);

create index med_sync_pending on medication_sync_state(user_id, is_verified)
  where is_verified = false;

-- ── User Package State ────────────────────────────────────────────
create table if not exists package_states (
  id                uuid           primary key default uuid_generate_v4(),
  user_id           uuid           not null references profiles(id) on delete cascade,
  package_type      package_type   not null,
  status            package_status not null default 'pre_cycle',
  current_phase     text,
  current_cycle_day smallint       not null default 1,
  phases_json       text           not null default '[]',   -- encrypted JSON of ClinicalPhase[]
  last_update       timestamptz    not null default now(),
  created_at        timestamptz    not null default now()
);

create unique index package_states_user_active on package_states(user_id)
  where status not in ('complete','cancelled');

-- ── Peace Pulse Logs (partner / companion check-ins) ─────────────
create table if not exists peace_pulse_logs (
  id          uuid         primary key default uuid_generate_v4(),
  user_id     uuid         not null references profiles(id) on delete cascade,
  partner_id  uuid         references profiles(id),
  status      text         not null,   -- e.g. "verified","pending","missed"
  logged_at   timestamptz  not null default now()
);

create index peace_pulse_user_recent on peace_pulse_logs(user_id, logged_at desc);

-- ── Loop Closer Sync Ledger ───────────────────────────────────────
-- Audit trail for every outbound ping (pharmacy, clinic, lender).
create table if not exists loop_closer_events (
  id              uuid         primary key default uuid_generate_v4(),
  user_id         uuid         not null references profiles(id) on delete cascade,
  target_type     text         not null,   -- 'pharmacy' | 'clinic' | 'lender'
  target_name     text         not null,
  event_type      text         not null,   -- 'audit_med_sync' | 'bridge_rx' | 'financial_reconcile'
  status          sync_status  not null,
  payload_ref     uuid         references sanctuary_records(id),
  resolved_at     timestamptz,
  created_at      timestamptz  not null default now()
);

create index loop_closer_user_pending on loop_closer_events(user_id, status)
  where status in ('pending','syncing');

-- ── QSBS Telemetry (company-level, not per-patient) ──────────────
create table if not exists qsbs_asset_entries (
  id          uuid         primary key default uuid_generate_v4(),
  description text         not null,
  value_usd   numeric(15,2) not null,
  recorded_at timestamptz  not null default now()
);

create table if not exists qsbs_issuance_events (
  id                      uuid          primary key default uuid_generate_v4(),
  issued_at               timestamptz   not null,
  shares_issued           integer       not null,
  price_per_share_usd     numeric(12,6) not null,
  gross_assets_at_issuance numeric(15,2) not null,
  qsbs_eligible           boolean       not null,
  alert_level             alert_level   not null,
  created_at              timestamptz   not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────
alter table profiles                enable row level security;
alter table sanctuary_records       enable row level security;
alter table medication_sync_state   enable row level security;
alter table package_states          enable row level security;
alter table peace_pulse_logs        enable row level security;
alter table loop_closer_events      enable row level security;

-- Profiles: users see only their own row
create policy "profiles_self" on profiles
  for all using (auth.uid() = id);

-- Sanctuary: users access only their own records
create policy "sanctuary_self" on sanctuary_records
  for all using (auth.uid() = user_id);

-- Medication sync state: own records
create policy "med_sync_self" on medication_sync_state
  for all using (auth.uid() = user_id);

-- Package states: own records
create policy "package_self" on package_states
  for all using (auth.uid() = user_id);

-- Peace pulse logs: users see their own logs; partners see logs where they are partner_id
create policy "peace_pulse_self" on peace_pulse_logs
  for all using (auth.uid() = user_id or auth.uid() = partner_id);

-- Loop closer: own events
create policy "loop_closer_self" on loop_closer_events
  for all using (auth.uid() = user_id);

-- ── Realtime (enable for sync orchestration) ─────────────────────
alter publication supabase_realtime add table medication_sync_state;
alter publication supabase_realtime add table loop_closer_events;
alter publication supabase_realtime add table package_states;

-- ── Updated-at trigger (shared function) ─────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_profiles_updated          before update on profiles            for each row execute function set_updated_at();
create trigger trg_sanctuary_updated         before update on sanctuary_records   for each row execute function set_updated_at();
create trigger trg_med_sync_updated          before update on medication_sync_state for each row execute function set_updated_at();
