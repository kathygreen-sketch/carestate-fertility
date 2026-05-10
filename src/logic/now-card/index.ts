import { MedicationInstruction, NowCardState, UserPackageState, SyncStep } from '../../shared/types';

/**
 * CareState Habit OS — Now Card Logic
 * Suppresses long-term data to eliminate "Instruction Amnesia."
 * Includes Phase-Awareness and Emotional Pulse transitions.
 */
export const filterNowCardActions = (
  instructions: MedicationInstruction[],
  userState: UserPackageState,
  currentTime: Date = new Date(),
): NowCardState => {
  const next24Hours = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);

  const activeInstructions = instructions.filter(instruction => {
    const [hours, minutes] = instruction.time.split(':').map(Number);
    const instructionTime = new Date(currentTime);
    instructionTime.setHours(hours, minutes, 0, 0);
    if (instructionTime < currentTime) instructionTime.setDate(instructionTime.getDate() + 1);
    return instructionTime >= currentTime && instructionTime <= next24Hours;
  });

  const sortedActions = activeInstructions.sort((a, b) => {
    const getAbs = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      const d = new Date(currentTime);
      d.setHours(h, m, 0, 0);
      if (d < currentTime) d.setDate(d.getDate() + 1);
      return d.getTime();
    };
    return getAbs(a.time) - getAbs(b.time);
  });

  const isSOSWindow = currentTime.getHours() >= 21 || currentTime.getHours() < 6;

  const pulse: 'Clinical Authority' | 'Empathetic Companion' =
    userState.status === 'retrieval' || userState.status === 'active'
      ? 'Clinical Authority'
      : 'Empathetic Companion';

  const verifiedSeal = sortedActions.filter(a => a.isCritical).every(a => a.isVerified);

  return {
    nextAction:              sortedActions[0],
    upcomingActions:         sortedActions.slice(1),
    peacePulseStatus:        true,
    triageContactAvailable:  isSOSWindow,
    soloSyncActive:          isSOSWindow,
    currentPhaseContext: {
      name: userState.currentPhase || 'Unknown',
      pulse,
      verifiedSeal,
    },
  };
};

/**
 * 9 PM SOS Bridge
 * Triggered during high-stakes moments (injection errors, meds-sync failures).
 */
export const triggerSOSBridge = (reason: string): void => {
  console.log(`[9 PM SOS] Crisis Bridge activated: ${reason}`);
};

/**
 * Solo-Sync Injection Conductor
 * Interactive, step-by-step guidance for solo patients (SMBC focus).
 * 7-step safety protocol with timed holds and bubble check.
 */
export class SoloSyncConductor {
  readonly steps: SyncStep[] = [
    { num:'①', title:'Bubble Check',    subtitle:'Clear the air',               instruction:'Hold the syringe vertically, needle up. Tap the barrel 2–3 times. Push the plunger until a droplet appears at the tip.', timer:null, accentColor:'#00BAFF', ctaLabel:'Air is cleared →', isFinal:false },
    { num:'②', title:'Take a Breath',   subtitle:'Ground yourself first',       instruction:'Breathe in slowly through your nose. Hold at the top. You are calm. You have done this. You can do this.',          timer:{ seconds:8,  label:'Breathing in…', stroke:'#FFED4A', type:'inhale'    }, accentColor:'#FFED4A', ctaLabel:"I'm ready →",              isFinal:false },
    { num:'③', title:'Site Prep',       subtitle:'Alcohol swab — 30 seconds',   instruction:'Swab the injection site in small circles outward from center. Wait the full 30 seconds. Do not touch after swabbing.', timer:{ seconds:30, label:'Drying…',        stroke:'#00BAFF', type:'countdown' }, accentColor:'#00BAFF', ctaLabel:'Site is dry →',            isFinal:false },
    { num:'④', title:'Pinch & Insert',  subtitle:'One smooth, confident motion', instruction:'Pinch a 1-inch fold of skin. Insert the needle at 90° in one unhesitating motion. Hesitation increases discomfort.', timer:null, accentColor:'#00BAFF', ctaLabel:'Needle is in →',           isFinal:false },
    { num:'⑤', title:'Inject Slowly',   subtitle:'Ten seconds — do not rush',   instruction:'Depress the plunger slowly over 10 full seconds. Rushing causes pooling and bruising. Grip loose, breath even.',     timer:{ seconds:10, label:'Injecting…',    stroke:'#00BAFF', type:'countdown' }, accentColor:'#00BAFF', ctaLabel:'Plunger depressed →',      isFinal:false },
    { num:'⑥', title:'Hold & Exhale',   subtitle:'The final ten',               instruction:'Keep the needle in place. Breathe out slowly through your mouth over 10 seconds. Prevents medication tracking back.', timer:{ seconds:10, label:'Hold…',          stroke:'#FFED4A', type:'countdown' }, accentColor:'#FFED4A', ctaLabel:'Held for 10 seconds →',   isFinal:false },
    { num:'⑦', title:'Remove & Log',    subtitle:'You did it.',                 instruction:'Remove needle smoothly — no twisting. Apply gentle pressure with a clean pad. Dispose in sharps container. Done.',    timer:null, accentColor:'#10B981', ctaLabel:'Log Dose Complete ✓',      isFinal:true  },
  ];

  async startConductor(medName: string): Promise<void> {
    console.log(`[Solo-Sync] Starting synchronous conductor for: ${medName}`);
    for (const step of this.steps) {
      console.log(`[Solo-Sync] Step ${step.num}: ${step.title}`);
      const delay = step.timer ? step.timer.seconds * 1000 : 2000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/** Returns true between 8 PM and 11 PM — the injection window. */
export function isInjectionWindow(): boolean {
  const h = new Date().getHours();
  return h >= 20 && h < 23;
}
