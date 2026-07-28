import React, { useState } from 'react';
import { Search, CheckCircle, MapPin, CreditCard, Clock, FileText } from 'lucide-react';

export default function Tracking({ applications, t }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

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
          <p>Enter your application Reference Number to view its current status, approval stage, and payment details.</p>
        </div>
      </div>

      {/* Search */}
      <div className="card-section" style={{ padding: '16px 20px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="nav-search" style={{ flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ color: 'var(--text-light)' }} />
            <input
              type="text"
              placeholder="e.g. FSA-2026-0000088"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">Track Application</button>
        </form>
      </div>

      {/* Result */}
      {searched && !result && (
        <div className="card-section">
          <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-light)' }}>
            <CheckCircle size={28} style={{ color: 'var(--accent-amber)', display: 'inline', marginBottom: '8px' }} />
            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>No application found</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Please check the Reference Number and try again.</div>
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
              <span className="card-subtitle">Submitted {result.submissionDate}</span>
            </div>
            <div style={{ padding: '20px' }}>
              <div className="metrics-grid" style={{ marginBottom: '0' }}>
                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">Applicant</span>
                    <div className="metric-icon-wrapper"><FileText size={16} /></div>
                  </div>
                  <span className="metric-val" style={{ fontSize: '16px' }}>{result.farmerName}</span>
                  <span className="metric-desc">{result.schemeName}</span>
                </div>

                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">Approval Status</span>
                    <div className="metric-icon-wrapper"><CheckCircle size={16} /></div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>
                    <span className={`badge badge-${result.status === 'Approved' || result.status === 'Completed' ? 'approved' : 'pending'}`}>{result.status}</span>
                  </span>
                  <span className="metric-desc" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> At {result.currentLevel} level</span>
                </div>

                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">Payment Status</span>
                    <div className="metric-icon-wrapper"><CreditCard size={16} /></div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>
                    <span className={`badge badge-${result.paymentStatus === 'Paid' ? 'approved' : 'pending'}`}>{result.paymentStatus}</span>
                  </span>
                  <span className="metric-desc">₹{result.benefitAmount.toLocaleString()} sanctioned</span>
                </div>

                <div className="metric-card" style={{ boxShadow: 'none', border: 'none', padding: '8px 0' }}>
                  <div className="metric-header">
                    <span className="metric-title">Milk Bill Reference</span>
                    <div className="metric-icon-wrapper"><MapPin size={16} /></div>
                  </div>
                  <span className="metric-val" style={{ fontSize: '15px' }}>{result.milkBillRef || <span style={{ color: 'var(--text-light)', fontSize: '13px' }}>Unassigned</span>}</span>
                  <span className="metric-desc">{result.societyName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification timeline */}
          <div className="card-section">
            <div className="card-section-header">
              <span className="card-section-title">Verification Progress</span>
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
