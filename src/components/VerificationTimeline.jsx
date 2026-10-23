import React from 'react';
import { isTimelinePendingEntry } from '../utils/verificationProgress';

export default function VerificationTimeline({ entries, title }) {
  if (!entries?.length) return null;

  return (
    <div>
      {title && (
        <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
          {title}
        </h4>
      )}
      <div className="timeline">
        {entries.map((log, index) => {
          const pending = isTimelinePendingEntry(log);
          const isLast = index === entries.length - 1;
          return (
            <div key={`${log.date}-${index}`} className={`timeline-item${pending ? ' timeline-item--pending' : ''}`}>
              <div className="timeline-marker">
                <div className={`timeline-dot ${pending ? 'pending' : 'active'}`} />
                {!isLast && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span>{log.role} ({log.user})</span>
                  <span style={{ color: 'var(--text-light)', fontWeight: '400' }}>{log.date}</span>
                </div>
                <div className={`timeline-action ${pending ? 'timeline-action--pending' : ''}`}>{log.action}</div>
                <div className="timeline-note">{log.note}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
