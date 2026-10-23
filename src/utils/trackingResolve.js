import { buildSocietySubmissionProgress, pendingAtLevel } from './verificationProgress';

const REF_PATTERN = /^FSA-\d{4}-\d+$/i;

export function formatTrackingRefNo(input) {
  const q = input.trim().toUpperCase();
  if (REF_PATTERN.test(q)) return q;
  const digits = q.replace(/\D/g, '');
  if (digits.length >= 4) {
    return `FSA-2026-${digits.slice(-7).padStart(7, '0')}`;
  }
  return `FSA-2026-${q.replace(/[^A-Z0-9]/gi, '').slice(0, 7).padStart(7, '0') || '0000999'}`;
}

/**
 * Resolve tracking search: real application if matched, otherwise demo tracker for any ref.
 */
export function resolveTrackingResult(query, applications) {
  const q = query.trim();
  if (!q) return null;

  const lower = q.toLowerCase();
  const exact = applications.find((a) => a.refNo.toLowerCase() === lower);
  if (exact) return { app: exact, isDemo: false };

  const partial = applications.find(
    (a) =>
      a.refNo.toLowerCase().includes(lower) ||
      lower.includes(a.refNo.toLowerCase()) ||
      a.refNo.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
  );
  if (partial) return { app: partial, isDemo: false };

  const refNo = formatTrackingRefNo(q);
  const seed = applications[0];
  const submissionDate = '2026-08-18';

  const demoApp = {
    id: 'DEMO-TRACK',
    refNo,
    farmerName: 'Vijayan Pillai (Demo)',
    farmerNameMl: 'വിജയൻ പിള്ള (ഡെമോ)',
    societyName: seed?.societyName || 'Vattiyoorkavu Milk Society',
    schemeName: seed?.schemeName || 'Cattle Feed Subsidy Scheme 2026',
    submissionDate,
    status: 'Pending Field Supervisor',
    currentLevel: 'Field Supervisor',
    benefitAmount: 7200,
    paymentStatus: 'Not Initiated',
    milkBillRef: '',
    remarksLog: [
      ...buildSocietySubmissionProgress({
        submissionDate,
        submitNote: `Application ${refNo} submitted for verification (sample tracking record).`
      }),
      pendingAtLevel(
        'Field Supervisor',
        'Queued for field verification — demo timeline for training and UAT.',
        `${submissionDate} 10:31`
      )
    ]
  };

  return { app: demoApp, isDemo: true };
}
