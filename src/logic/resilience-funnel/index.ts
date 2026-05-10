import { AttritionFunnel, AttritionStage } from '../../shared/types';

/**
 * CareState Resilience Funnel
 * High-fidelity visualization logic for "The Hunger Games" (embryo attrition).
 * Statistical benchmarks derived from SART / ESHRE cohort data 2021–2024.
 */
export class ResilienceFunnelLogic {
  /**
   * Calculate Attrition Benchmarks
   * Provides realistic expectations based on clinical averages.
   */
  getBenchmarks(retrievedCount: number): AttritionStage[] {
    return [
      { stage: 'Retrieved',   count: retrievedCount,                         statisticalBenchmark: retrievedCount },
      { stage: 'Mature',      count: Math.round(retrievedCount * 0.80),      statisticalBenchmark: Math.round(retrievedCount * 0.80) },
      { stage: 'Fertilized',  count: Math.round(retrievedCount * 0.60),      statisticalBenchmark: Math.round(retrievedCount * 0.60) },
      { stage: 'Blastocyst',  count: Math.round(retrievedCount * 0.30),      statisticalBenchmark: Math.round(retrievedCount * 0.30) },
      { stage: 'PGT-Normal',  count: Math.round(retrievedCount * 0.15),      statisticalBenchmark: Math.round(retrievedCount * 0.15) },
    ];
  }

  /**
   * Format Attrition Narrative
   * Delivers results with empathetic context.
   */
  getEmpatheticNarrative(funnel: AttritionFunnel): string {
    const blastStage = funnel.stages.find(s => s.stage === 'Blastocyst');
    if (!blastStage) return 'Awaiting lab updates. We are standing by with you.';
    if (blastStage.count > 0) {
      return `You have ${blastStage.count} blastocyst${blastStage.count !== 1 ? 's' : ''}. This is a resilient result. Every embryo is a significant milestone.`;
    }
    return 'This stage is the most difficult. We are here to help you navigate the next best step and pivot logic.';
  }
}

// ─── Functional export: benchmark comparison for UI ───────────────

interface FunnelInput {
  retrieved:   number;
  mature:      number | null;
  fertilized:  number | null;
  day3:        number | null;
}

interface UIFunnelStage {
  label:           string;
  count:           number | null;
  projectedCount:  number | null;
  benchmarkFraction: number;
  benchmarkDesc:   string;
  status:          'green' | 'amber' | 'red' | 'neutral' | null;
  isProjected:     boolean;
}

export function buildUIFunnel(input: FunnelInput): UIFunnelStage[] {
  const { retrieved: maxEggs } = input;
  const fertilized = input.fertilized ?? Math.round(maxEggs * 0.70);

  function classify(actual: number, expected: number): 'green' | 'amber' | 'red' {
    const r = actual / expected;
    return r >= 0.95 ? 'green' : r >= 0.80 ? 'amber' : 'red';
  }

  return [
    { label:'Eggs Retrieved',   count:maxEggs,         projectedCount:null, benchmarkFraction:1.00, benchmarkDesc:'Starting count',           status:'neutral', isProjected:false },
    { label:'Mature (MII)',      count:input.mature,    projectedCount:input.mature === null ? Math.round(maxEggs*0.80) : null, benchmarkFraction:0.80, benchmarkDesc:'~80% expected', status:input.mature === null ? null : classify(input.mature, maxEggs*0.80), isProjected:input.mature === null },
    { label:'Fertilized (2PN)', count:input.fertilized,projectedCount:input.fertilized === null ? Math.round(maxEggs*0.70) : null, benchmarkFraction:0.70, benchmarkDesc:'~70% of retrieved', status:input.fertilized === null ? null : classify(input.fertilized, maxEggs*0.70), isProjected:input.fertilized === null },
    { label:'Day 3 Cleavage',   count:input.day3,      projectedCount:input.day3 === null ? Math.round(fertilized*0.95) : null, benchmarkFraction:0.95, benchmarkDesc:'~95% of fertilized', status:input.day3 === null ? null : classify(input.day3, fertilized*0.95), isProjected:input.day3 === null },
    { label:'Day 5 Blastocyst', count:null,             projectedCount:Math.round(fertilized*0.45), benchmarkFraction:0.45, benchmarkDesc:'~45% of fertilized', status:null, isProjected:true },
    { label:'PGT Biopsied',     count:null,             projectedCount:Math.round(fertilized*0.45*0.90), benchmarkFraction:0.90, benchmarkDesc:'~90% of blasts', status:null, isProjected:true },
    { label:'Euploid (Normal)', count:null,             projectedCount:Math.round(fertilized*0.45*0.90*0.60), benchmarkFraction:0.60, benchmarkDesc:'~60% of tested', status:null, isProjected:true },
  ];
}
