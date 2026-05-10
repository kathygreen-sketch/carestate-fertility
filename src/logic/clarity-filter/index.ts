import { UserPackageState, ConfidenceBaseline } from '../../shared/types';

/**
 * CareState Clarity Filter & Foundation Gate
 * Strict state machine to suppress noise and enforce psychological authorization.
 */
export class ClarityFilterStateMachine {
  /**
   * Enforce Foundation Gate
   * Blocks cycle entry if Confidence Baseline is below 90%.
   */
  canEnterCycle(baseline: ConfidenceBaseline): boolean {
    return baseline.score >= 90;
  }

  /**
   * The Clarity Filter
   * Suppresses all secondary data, rendering only the next 24-hour step.
   */
  getVisibleState(fullState: UserPackageState): Partial<UserPackageState> {
    if (!this.canEnterCycle(fullState.confidenceBaseline)) {
      return {
        status: 'foundation',
        confidenceBaseline: fullState.confidenceBaseline,
        domain: fullState.domain,
        lastUpdate: fullState.lastUpdate
      };
    }

    // If in cycle, strip everything except immediate next 24h context
    return {
      status: fullState.status,
      currentPhase: fullState.currentPhase,
      warmthProtocol: fullState.warmthProtocol,
      // Note: MedicationInstruction filtering happens in the NowCard logic
    };
  }
}

/**
 * B2B Reporting: Authorized Lead Conversion
 */
export class B2BReportingEngine {
  calculateAuthorizedLeads(users: UserPackageState[]): number {
    return users.filter(u => u.confidenceBaseline.score >= 90).length;
  }
}
