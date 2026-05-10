/**
 * CareState Fertility Core Data Schema
 * Focused on the "Orchestration Layer" and "Habit OS" philosophy.
 */

// ─── Domain & Foundation ──────────────────────────────────────────

export type SanctuaryDomain = 'Fertility' | 'Warmth-Sanctuary' | 'Longevity';

export interface ConfidenceBaseline {
  score: number;         // 0–100
  isAuthorized: boolean; // Must be > 90 to clear "Foundation Gate"
  lastAssessment: string;
}

export interface BiofeedbackState {
  isRespirationActive: boolean;
  bpm: number;
  rhythm: 'Calm' | 'Elevated';
}

// ─── Warmth Protocol ─────────────────────────────────────────────

export interface WarmthProtocol {
  protocolId: string;
  name: string;
  day: number;
  habits: {
    term: string;
    isCompleted: boolean;
    description: string;
  }[];
  empathyPulse: string;
  recoveryState: 'Luminous Amber' | 'Standard'; // #FFF5D6
}

export interface WarmthStatus {
  domain: 'Emotional' | 'Thermal';
  status: 'Cold' | 'Warm';
  recommendation: string;
}

// ─── Core Clinical ────────────────────────────────────────────────

export interface ClinicalPhase {
  name: string;
  milestones: string[];
  primaryAction: string;
  proTrigger?: string;
  isDelegatedViewActive?: boolean;
}

export interface MedicationInstruction {
  id: string;
  name: string;
  dosage: string;
  time: string; // e.g., "21:00"
  method: 'injection' | 'oral' | 'topical';
  isCritical: boolean;
  isVerified: boolean;
  notes?: string;
}

// ─── Attrition / Resilience Funnel ───────────────────────────────

export interface AttritionStage {
  stage: 'Retrieved' | 'Mature' | 'Fertilized' | 'Blastocyst' | 'PGT-Normal';
  count: number;
  statisticalBenchmark?: number;
}

export interface AttritionFunnel {
  cycleId: string;
  stages: AttritionStage[];
  lastUpdate: string;
}

// ─── Financial State ──────────────────────────────────────────────

export interface FinancialState {
  insuranceLifetimeMax: number;
  usedAmount: number;
  currentCycleEstimate: {
    insurancePrice: number;
    cashPrice: number;
    savingsOpportunity: number;
  };
  recommendation: 'Use Insurance' | 'Pay Cash' | 'Mixed';
}

// ─── Unboxing / Pharmacy Station ─────────────────────────────────

export interface UnboxingItem {
  id: string;
  name: string;
  storage: 'Refrigerated' | 'Room Temp';
  quantity: number;
  isInventoried: boolean;
}

// ─── User Package ─────────────────────────────────────────────────

export interface UserPackageState {
  userId: string;
  domain: SanctuaryDomain;
  packageType: string;
  status: 'foundation' | 'planning' | 'active' | 'retrieval' | 'afterglow' | 'completed';
  currentPhase?: string;
  currentCycleDay: number;
  phases: ClinicalPhase[];
  confidenceBaseline: ConfidenceBaseline; // The Foundation Gate
  financialState?: FinancialState;
  attritionFunnel?: AttritionFunnel;
  warmthProtocol?: WarmthProtocol;
  biofeedback?: BiofeedbackState;
  lastUpdate: string; // ISO timestamp
}

// ─── Partner & Companion ─────────────────────────────────────────

export interface PartnerIntegrity {
  partnerId: string;
  isSynced: boolean;
  lastPeacePulse: string; // ISO timestamp
  mode: 'standard' | 'retrieval' | 'support';
}

// ─── Now Card ────────────────────────────────────────────────────

export interface NowCardState {
  nextAction: MedicationInstruction;
  upcomingActions: MedicationInstruction[];
  peacePulseStatus: boolean;
  triageContactAvailable: boolean;
  soloSyncActive?: boolean;
  currentPhaseContext?: {
    name: string;
    pulse: 'Clinical Authority' | 'Empathetic Companion';
    verifiedSeal: boolean;
  };
}

// ─── B2B Conversion Reporting ─────────────────────────────────────

export interface B2BConversionMetric {
  authorizedLeads: number;
  conversionVelocity: number; // Days from onboarding to Foundation Gate clearance
  sentimentPulse: number;     // B2B sentiment tracking
}

// ─── Solo-Sync Conductor (UI module extensions) ───────────────────

export type SyncStepTimerType = 'inhale' | 'countdown';

export interface SyncStep {
  num: string;
  title: string;
  subtitle: string;
  instruction: string;
  timer: {
    seconds: number;
    label: string;
    stroke: string;
    type: SyncStepTimerType;
  } | null;
  accentColor: string;
  ctaLabel: string;
  isFinal: boolean;
}

export interface SyncProtocolResult {
  completedAt: string;
  stepsCompleted: number;
  medId: string;
  medName: string;
  patientCode: string;
}

// ─── Financial Strategist (extended delta calc) ───────────────────

export interface FinancialDeltaResult {
  insurancePatientCost: number;
  cashPatientCost: number;
  deltaFavoringCash: number;
  lifetimeMaxDepletedByInsurance: boolean;
  coveragePreservedByCash: number;
  recommendation: 'insurance' | 'cash' | 'neutral';
  pivotReason: string;
}
