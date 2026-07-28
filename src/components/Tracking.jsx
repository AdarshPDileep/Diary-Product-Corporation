import React, { useState } from 'react';
import { Search, CheckCircle, MapPin, CreditCard, Clock, FileText } from 'lucide-react';
import { statusText } from '../i18n';

export default function Tracking({ applications, t, lang }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const ui = lang === 'ml' ? {
    subtitle: 'നിങ്ങളുടെ അപേക്ഷയുടെ റഫറൻസ് നമ്പർ നൽകി നിലവിലെ നില, അംഗീകാര ഘട്ടം, പേയ്മെന്റ് വിശദാംശങ്ങൾ എന്നിവ കാണുക.',
    searchPlaceholder: 'ഉദാ: FSA-2026-0000088',
    trackBtn: 'അപേക്ഷാ ട്രാക്കിംഗ്',
    notFoundTitle: 'അപേക്ഷ കണ്ടെത്താനായില്ല',
    notFoundSub: 'റഫറൻസ് നമ്പർ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.',
    submitted: 'സമർപ്പിച്ചത്',
    applicant: 'അപേക്ഷകൻ',
    approvalStatus: 'അംഗീകാര നില',
    atLevel: (level) => `${level} ഘട്ടത്തിൽ`,
    paymentStatus: 'പേയ്മെന്റ് നില',
    sanctioned: (amount) => `₹${amount} അനുവദിച്ചു`,
    milkBillRef: 'പാൽ ബിൽ റഫറൻസ്',
    unassigned: 'നൽകിയിട്ടില്ല',
    verificationProgress: 'പരിശോധനാ പുരോഗതി',
  } : {
    subtitle: 'Enter your application Reference Number to view its current status, approval stage, and payment details.',
    searchPlaceholder: 'e.g. FSA-2026-0000088',
    trackBtn: 'Track Application',
    notFoundTitle: 'No application found',
    notFoundSub: 'Please check the Reference Number and try again.',
    submitted: 'Submitted',
    applicant: 'Applicant',
    approvalStatus: 'Approval Status',
    atLevel: (level) => `At ${level} level`,
    paymentStatus: 'Payment Status',
    sanctioned: (amount) => `₹${amount} sanctioned`,
    milkBillRef: 'Milk Bill Reference',
    unassigned: 'Unassigned',
    verificationProgress: 'Verification Progress',
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const found = applications.find(a => a.refNo.toLowerCase() === query.trim().toLowerCase());
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('tracking')}</h1>
          <p>{ui.subtitle}</p>
        </div>
      </div>

      {/* Search */}
      <div className="card-section" style={{ padding: '16px 20px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="nav-search" style={{ flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ color: 'var(--text-light)' }} />
            <input
              type="text"
              placeholder={ui.searchPlaceholder}
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">{ui.trackBtn}</button>
        </form>
      </div>

      {/* Result */}
      {searched && !result && (
        <div className="card-section">
          <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-light)' }}>
            <CheckCircle size={28} style={{ color: 'var(--accent-amber)', display: 'inline', marginBottom: '8px' }} />
            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{ui.notFoundTitle}</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{ui.notFoundSub}</div>
          </div>
        </div>
      )}

      {result && (
        <>
          {/* Status summary */}
          <div className="card-section" style={{ marginBottom: '20px' }}>
            <div className="card-section-header">
              <span className="card-section-title">
                <FileText size={16} /> {result.refNo}
              </span>
              <span className="card-subtitle">{ui.submitted} {result.submissionDate}</span>
            </div>
            <div style={{ padding: '20px' }}>
              <div className="metrics-grid" style={{ marginBottom: '0' }}>
                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">{ui.applicant}</span>
                    <div className="metric-icon-wrapper"><FileText size={16} /></div>
                  </div>
                  <span className="metric-val" style={{ fontSize: '16px' }}>{result.farmerName}</span>
                  <span className="metric-desc">{result.schemeName}</span>
                </div>

                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">{ui.approvalStatus}</span>
                    <div className="metric-icon-wrapper"><CheckCircle size={16} /></div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>
                    <span className={`badge badge-${result.status === 'Approved' || result.status === 'Completed' ? 'approved' : 'pending'}`}>{statusText(lang, result.status)}</span>
                  </span>
                  <span className="metric-desc" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {ui.atLevel(result.currentLevel)}</span>
                </div>

                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">{ui.paymentStatus}</span>
                    <div className="metric-icon-wrapper"><CreditCard size={16} /></div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>
                    <span className={`badge badge-${result.paymentStatus === 'Paid' ? 'approved' : 'pending'}`}>{statusText(lang, result.paymentStatus)}</span>
                  </span>
                  <span className="metric-desc">{ui.sanctioned(result.benefitAmount.toLocaleString())}</span>
                </div>

                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">{ui.milkBillRef}</span>
                    <div className="metric-icon-wrapper"><MapPin size={16} /></div>
                  </div>
                  <span className="metric-val" style={{ fontSize: '15px' }}>{result.milkBillRef || <span style={{ color: 'var(--text-light)', fontSize: '13px' }}>{ui.unassigned}</span>}</span>
                  <span className="metric-desc">{result.societyName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification timeline */}
          <div className="card-section">
            <div className="card-section-header">
              <span className="card-section-title">{ui.verificationProgress}</span>
            </div>
            <div style={{ padding: '24px' }}>
              <div className="timeline">
                {result.remarksLog.map((log, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className={`timeline-dot ${index === 0 ? 'active' : ''}`}></div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span>{log.role} ({log.user})</span>
                        <span style={{ color: 'var(--text-light)', fontWeight: '400' }}>{log.date}</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary-color)' }}>{log.action}</div>
                      <div className="timeline-note">{log.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
