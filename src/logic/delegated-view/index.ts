import { MedicationInstruction, NowCardState, UserPackageState } from '../../shared/types';

/**
 * CareState Delegated View Service
 * Orchestrates the "Support Mode" for drivers and companions.
 * Ensures "Command Sharing" while maintaining patient data sovereignty.
 */
export class DelegatedViewService {
  /**
   * Generate a read-only snapshot for the companion.
   * Strips away private data, showing only logistics and instructions.
   */
  getCompanionView(
    patientState: UserPackageState,
    nowCard: NowCardState
  ): {
    logistics: string[];
    instructions: MedicationInstruction[];
    patientStatus: string;
  } {
    return {
      logistics: patientState.phases
        .find(p => p.name === patientState.currentPhase)
        ?.milestones || [],
      instructions: [nowCard.nextAction, ...nowCard.upcomingActions],
      patientStatus: patientState.status === 'retrieval' ? 'In Recovery' : 'Standard Support',
    };
  }

  /**
   * Logic for Automated Hand-off.
   * Triggered when the patient is checked into post-op.
   */
  autoHandoffTrigger(userId: string) {
    console.log(`[Delegated View] Automated Hand-off triggered for patient: ${userId}`);
    // Notify companion and activate the Support Mode UI
  }
}
