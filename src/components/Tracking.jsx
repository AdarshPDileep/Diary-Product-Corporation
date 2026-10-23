import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, MapPin, CreditCard, Clock, FileText, Info } from 'lucide-react';
import { statusText } from '../i18n';
import VerificationTimeline from './VerificationTimeline';
import { resolveTrackingResult } from '../utils/trackingResolve';

export default function Tracking({ applications, t, lang, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [resolved, setResolved] = useState(null);
  const [searched, setSearched] = useState(false);

  const runSearch = (value) => {
    const q = value.trim();
    if (!q) {
      setResolved(null);
      setSearched(false);
      return;
    }
    setResolved(resolveTrackingResult(q, applications));
    setSearched(true);
  };

  useEffect(() => {
    if (!initialQuery?.trim()) return;
    setQuery(initialQuery);
    setResolved(resolveTrackingResult(initialQuery, applications));
    setSearched(true);
  }, [initialQuery, applications]);

  const ui = lang === 'ml' ? {
    subtitle: 'നിങ്ങളുടെ അപേക്ഷയുടെ റഫറൻസ് നമ്പർ നൽകി നിലവിലെ നില, അംഗീകാര ഘട്ടം, പേയ്മെന്റ് വിശദാംശങ്ങൾ എന്നിവ കാണുക.',
    searchPlaceholder: 'ഉദാ: FSA-2026-0000088 അല്ലെങ്കിൽ ഏതെങ്കിലും റഫ് നമ്പർ',
    trackBtn: 'അപേക്ഷാ ട്രാക്കിംഗ്',
    enterRef: 'ട്രാക്ക് ചെയ്യാൻ ഒരു റഫറൻസ് നമ്പർ നൽകുക.',
    submitted: 'സമർപ്പിച്ചത്',
    applicant: 'അപേക്ഷകൻ',
    approvalStatus: 'അംഗീകാര നില',
    atLevel: (level) => `${level} ഘട്ടത്തിൽ`,
    paymentStatus: 'പേയ്മെന്റ് നില',
    sanctioned: (amount) => `₹${amount} അനുവദിച്ചു`,
    milkBillRef: 'പാൽ ബിൽ റഫറൻസ്',
    unassigned: 'നൽകിയിട്ടില്ല',
    verificationProgress: 'പരിശോധനാ പുരോഗതി',
    demoNotice: 'ഡെമോ ട്രാക്കർ — ഈ റഫറൻസ് mock ഡാറ്റയിൽ ഇല്ല; സാമ്പിൾ workflow കാണിക്കുന്നു.'
  } : {
    subtitle: 'Enter your application reference number to view status, approval stage, and payment details.',
    searchPlaceholder: 'e.g. FSA-2026-0000088 or any reference',
    trackBtn: 'Track application',
    enterRef: 'Enter a reference number to track.',
    submitted: 'Submitted',
    applicant: 'Applicant',
    approvalStatus: 'Approval status',
    atLevel: (level) => `At ${level} level`,
    paymentStatus: 'Payment status',
    sanctioned: (amount) => `₹${amount} sanctioned`,
    milkBillRef: 'Milk bill reference',
    unassigned: 'Unassigned',
    verificationProgress: 'Verification progress',
    demoNotice: 'Demo tracker — this reference is not in sample data; showing a sample workflow for demonstration.'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const result = resolved?.app;
  const isDemo = resolved?.isDemo;

  return (
    <div className="tracking-page">
      <div className="page-header">
        <div className="page-title">
          <h1>{t('tracking')}</h1>
          <p>{ui.subtitle}</p>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-body card-section-body--compact">
          <form onSubmit={handleSearch} className="track-search-form">
            <div className="nav-search">
              <Search size={16} style={{ color: 'var(--text-light)' }} aria-hidden />
              <input
                type="search"
                placeholder={ui.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                aria-label={ui.searchPlaceholder}
              />
            </div>
            <button type="submit" className="btn btn-primary">{ui.trackBtn}</button>
          </form>
        </div>
      </div>

      {searched && !result && (
        <div className="card-section">
          <div className="empty-state">
            <div className="empty-state-title">{ui.enterRef}</div>
          </div>
        </div>
      )}

      {result && (
        <>
          {isDemo && (
            <div className="tracking-demo-notice" role="status">
              <Info size={18} aria-hidden />
              <span>{ui.demoNotice}</span>
            </div>
          )}

          <div className="card-section">
            <div className="card-section-header">
              <span className="card-section-title">
                <FileText size={16} /> {result.refNo}
              </span>
              <span className="card-subtitle">{ui.submitted} {result.submissionDate}</span>
            </div>
            <div className="tracking-metrics">
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-title">{ui.applicant}</span>
                    <div className="metric-icon-wrapper"><FileText size={16} /></div>
                  </div>
                  <span className="metric-val tracking-metric-val">
                    {lang === 'ml' && result.farmerNameMl ? result.farmerNameMl : result.farmerName}
                  </span>
                  <span className="metric-desc">{result.schemeName}</span>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-title">{ui.approvalStatus}</span>
                    <div className="metric-icon-wrapper"><CheckCircle size={16} /></div>
                  </div>
                  <span className="tracking-badge-wrap">
                    <span className={`badge badge-${result.status === 'Approved' || result.status === 'Completed' ? 'approved' : 'pending'}`}>
                      {statusText(lang, result.status)}
                    </span>
                  </span>
                  <span className="metric-desc tracking-metric-inline"><Clock size={12} /> {ui.atLevel(result.currentLevel)}</span>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-title">{ui.paymentStatus}</span>
                    <div className="metric-icon-wrapper"><CreditCard size={16} /></div>
                  </div>
                  <span className="tracking-badge-wrap">
                    <span className={`badge badge-${result.paymentStatus === 'Paid' ? 'approved' : 'pending'}`}>
                      {statusText(lang, result.paymentStatus)}
                    </span>
                  </span>
                  <span className="metric-desc">{ui.sanctioned(result.benefitAmount.toLocaleString('en-IN'))}</span>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-title">{ui.milkBillRef}</span>
                    <div className="metric-icon-wrapper"><MapPin size={16} /></div>
                  </div>
                  <span className="metric-val tracking-metric-val-sm">
                    {result.milkBillRef || <span className="tracking-unassigned">{ui.unassigned}</span>}
                  </span>
                  <span className="metric-desc">{result.societyName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-section">
            <div className="card-section-header">
              <span className="card-section-title">{ui.verificationProgress}</span>
            </div>
            <div className="card-section-body">
              <VerificationTimeline entries={result.remarksLog} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
