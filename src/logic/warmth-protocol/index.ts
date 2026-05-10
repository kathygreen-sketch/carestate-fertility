import { WarmthProtocol, WarmthStatus } from '../../shared/types';

/**
 * CareState Warmth Protocol (暖宫)
 * Orchestrates the "Warmth Sanctuary" ecosystem.
 * Focuses on thermal regulation, blood flow, and emotional warmth.
 */
export class WarmthProtocolLogic {
  /**
   * Get Daily Warmth Habit Map
   * Targeted habits to improve uterine blood flow and reduce "Cold Clinical" anxiety.
   */
  getDailyHabits(day: number): WarmthProtocol {
    return {
      protocolId: 'warmth_v1',
      name: 'The Warmth Protocol: Uterus Readiness',
      day,
      habits: [
        { 
          term: 'Socks On', 
          isCompleted: false, 
          description: 'Keep feet warm to ensure optimal blood flow to the pelvic region.' 
        },
        { 
          term: 'Warm Liquids Only', 
          isCompleted: false, 
          description: 'Avoid iced drinks to maintain internal core temperature.' 
        },
        { 
          term: 'Gentle Movement', 
          isCompleted: false, 
          description: '15-min walk to stimulate circulation.' 
        }
      ],
      empathyPulse: "Your body is a sanctuary. Today, we focus on creating the warmth needed for life to take root."
    };
  }

  /**
   * Evaluate Environmental Warmth
   */
  checkWarmthStatus(signals: { temp: number; hydration: number; anxietyLevel: number }): WarmthStatus {
    if (signals.anxietyLevel > 7) {
      return {
        domain: 'Emotional',
        status: 'Cold',
        recommendation: "Triggering 'Solo-Sync' Companion. Let's do a 5-minute breathing warmth reset."
      };
    }
    
    return {
      domain: 'Thermal',
      status: 'Warm',
      recommendation: "Flow is optimal. Maintain current warmth habits."
    };
  }
}
