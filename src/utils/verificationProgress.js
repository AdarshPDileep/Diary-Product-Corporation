/**
 * Standard society-side steps shown before an application enters the approval workflow.
 */
export function buildSocietySubmissionProgress({
  submissionDate,
  societyUser = 'Society Secretary',
  submitNote = 'Application submitted to verification workflow.'
}) {
  const day = submissionDate || new Date().toISOString().substring(0, 10);
  return [
    {
      user: societyUser,
      role: 'Society User',
      action: 'Draft Created',
      date: `${day} 09:15`,
      note: 'Application draft started and farmer details captured.'
    },
    {
      user: societyUser,
      role: 'Society User',
      action: 'Documents Uploaded',
      date: `${day} 10:05`,
      note: 'Required scheme documents uploaded and marked complete.'
    },
    {
      user: societyUser,
      role: 'Society User',
      action: 'Eligibility Checked',
      date: `${day} 10:22`,
      note: 'Portal eligibility rules passed for the selected scheme year.'
    },
    {
      user: societyUser,
      role: 'Society User',
      action: 'Submitted',
      date: `${day} 10:30`,
      note: submitNote
    }
  ];
}

export function pendingAtLevel(level, note, date) {
  return {
    user: 'TRCMPU Portal',
    role: 'System',
    action: 'Pending',
    date,
    note: note || `Awaiting action at ${level} level.`
  };
}

export function isTimelinePendingEntry(log) {
  return log?.action === 'Pending' || log?.action === 'Under Review';
}
