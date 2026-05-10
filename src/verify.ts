import { filterNowCardActions } from './logic/now-card';
import { QSBSTelemetryService } from './infrastructure/telemetry/qsbs';
import { DelegatedViewService } from './logic/delegated-view';
import { LoopCloserEngine } from './logic/loop-closer';
import { InClinicCapture } from './logic/in-clinic-capture';
import { MedicationInstruction, UserPackageState } from './shared/types';

const mockInstructions: MedicationInstruction[] = [
  {
    id: '1',
    name: 'Gonal-F',
    dosage: '300 IU',
    time: '21:00',
    method: 'injection',
    isCritical: true,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Menopur',
    dosage: '75 IU',
    time: '09:00',
    method: 'injection',
    isCritical: true,
    isVerified: false,
  },
  {
    id: '3',
    name: 'Prenatal Vitamin',
    dosage: '1 tablet',
    time: '08:00',
    method: 'oral',
    isCritical: false,
    isVerified: true,
  },
];

const mockUserState: UserPackageState = {
  userId: 'user_123',
  packageType: 'IVF',
  status: 'active',
  currentPhase: 'Stimulation',
  currentCycleDay: 8,
  phases: [
    {
      name: 'Stimulation',
      milestones: ['Daily Injections', 'Follicle Tracking'],
      primaryAction: 'Administer Meds',
    },
    {
      name: 'Retrieval Prep',
      milestones: ['Trigger Shot', 'Fast from Midnight'],
      primaryAction: 'Final Trigger',
    }
  ],
  lastUpdate: new Date().toISOString(),
};

const runVerification = async () => {
  console.log('--- CareState Infrastructure Verification (Sprint 1) ---');

  // 1. Verify Now Card Logic (Phase-Aware & Verified Seal)
  const mockNow = new Date();
  mockNow.setHours(20, 0, 0, 0);
  // @ts-ignore - Yang's previous call signature might differ
  const nowCard = filterNowCardActions(mockInstructions, mockUserState, mockNow);
  
  console.log('[Verification] Now Card (Stimulation Phase, 20:00):');
  console.log(`Next Action: ${nowCard.nextAction?.name} at ${nowCard.nextAction?.time}`);
  console.log(`Pulse: ${nowCard.currentPhaseContext?.pulse}`);
  console.log(`Verified Seal (Next 24h Critical): ${nowCard.currentPhaseContext?.verifiedSeal}`);

  // 2. Verify Delegated View (Retrieval Day)
  const retrievalState: UserPackageState = { ...mockUserState, status: 'retrieval', currentPhase: 'Retrieval Prep' };
  const delegatedViewService = new DelegatedViewService();
  const companionView = delegatedViewService.getCompanionView(retrievalState, nowCard);
  
  console.log('\n[Verification] Delegated View (Retrieval Day Mode):');
  console.log(`Patient Status: ${companionView.patientStatus}`);
  console.log(`Milestones for Companion: ${companionView.logistics.join(', ')}`);

  // 3. Verify QSBS Telemetry
  const telemetry = new QSBSTelemetryService();
  const compliance = await telemetry.checkCompliance(42_000_000);
  console.log('\n[Verification] QSBS Telemetry ($42M Assets):');
  console.log(`Compliant: ${compliance.isCompliant}`);
  console.log(`Alert Level: ${compliance.alertLevel}`);

  // 4. Verify Loop Closer Engine
  const loopCloser = new LoopCloserEngine();
  console.log('\n[Verification] Loop Closer Engine:');
  await loopCloser.auditMedSync(mockInstructions);

  // 5. Verify In-Clinic Capture
  const capture = new InClinicCapture();
  console.log('\n[Verification] In-Clinic Capture:');
  const summary = await capture.summarizeVoiceRecap('mock-audio-recap.mp3');
  console.log(`Voice Summary: ${summary}`);

  console.log('\n--- Verification Complete ---');
};

runVerification();
