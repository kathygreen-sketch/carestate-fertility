import { FinancialState, FinancialDeltaResult } from '../../shared/types';

/**
 * CareState Financial Strategist
 * Advocacy-first calculator for insurance vs. cash optimization.
 */
export class FinancialStrategist {
  /**
   * Evaluate Medication Payment Strategy
   * Compares insurance lifetime max impact vs. cash price.
   */
  calculateOptimalPayment(
    insurancePrice: number,
    cashPrice: number,
    lifetimeMaxRemaining: number,
  ): FinancialState['currentCycleEstimate'] & { recommendation: FinancialState['recommendation'] } {
    const savingsOpportunity = insurancePrice - cashPrice;

    // If cash is cheaper OR insurance will consume >15% of remaining lifetime max, recommend cash.
    const insuranceImpact = (insurancePrice / lifetimeMaxRemaining) * 100;
    let recommendation: FinancialState['recommendation'] = 'Use Insurance';
    if (cashPrice < insurancePrice || insuranceImpact > 15) {
      recommendation = 'Pay Cash';
    }

    return { insurancePrice, cashPrice, savingsOpportunity, recommendation };
  }

  /**
   * Get Financial Contextual Advice
   */
  getAdvice(state: FinancialState): string {
    if (state.recommendation === 'Pay Cash') {
      return `Your insurance med-price is $${state.currentCycleEstimate.insurancePrice}, but the cash price is $${state.currentCycleEstimate.cashPrice}. We recommend paying cash to save your remaining $${state.insuranceLifetimeMax} lifetime max for the retrieval procedure.`;
    }
    return 'Using insurance for this cycle is optimal based on your remaining lifetime max.';
  }
}

// ─── Functional export: delta check for UI module ─────────────────

export function computeFinancialDelta(
  totalListPrice: number,
  lifetimeRemaining: number,
  cashPrice: number,
): FinancialDeltaResult {
  const insurancePays    = lifetimeRemaining; // assumes max is nearly depleted (worst case)
  const insuranceCost    = totalListPrice - insurancePays;
  const deltaFavoringCash = insuranceCost - cashPrice;

  const lifetimeMaxDepletedByInsurance = true; // when remaining < cycle cost, always depleted
  const coveragePreservedByCash        = lifetimeRemaining;

  let recommendation: FinancialDeltaResult['recommendation'];
  let pivotReason: string;

  if (deltaFavoringCash > 500) {
    recommendation = 'cash';
    pivotReason    = `Cash saves $${deltaFavoringCash.toLocaleString()} this cycle and preserves $${coveragePreservedByCash.toLocaleString()} of lifetime coverage.`;
  } else if (deltaFavoringCash < -500) {
    recommendation = 'insurance';
    pivotReason    = `Insurance saves $${Math.abs(deltaFavoringCash).toLocaleString()} this cycle.`;
  } else {
    recommendation = 'neutral';
    pivotReason    = `The difference is less than $500. Consider future cycle likelihood before deciding.`;
  }

  return {
    insurancePatientCost: insuranceCost,
    cashPatientCost:      cashPrice,
    deltaFavoringCash,
    lifetimeMaxDepletedByInsurance,
    coveragePreservedByCash,
    recommendation,
    pivotReason,
  };
}
