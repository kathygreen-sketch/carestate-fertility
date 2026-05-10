import { appSchema, tableSchema } from '@nozbe/watermelondb';

/**
 * CareState Sanctuary - HIPAA-Compliant Offline Schema
 * Designed for the "Fortress Build" protocol.
 */
export const safeRoomSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'medication_instructions',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'dosage', type: 'string' },
        { name: 'time', type: 'string' },
        { name: 'method', type: 'string' },
        { name: 'is_critical', type: 'boolean' },
        { name: 'is_verified', type: 'boolean' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'synced_at', type: 'number', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'user_package_states',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'package_type', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'current_phase', type: 'string', isOptional: true },
        { name: 'current_cycle_day', type: 'number' },
        { name: 'phases_json', type: 'string' }, // Store ClinicalPhase[] as JSON
        { name: 'last_update', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'peace_pulse_logs',
      columns: [
        { name: 'partner_id', type: 'string', isIndexed: true },
        { name: 'status', type: 'string' },
        { name: 'timestamp', type: 'string' },
      ],
    }),
  ],
});
