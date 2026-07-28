import React from 'react';
import { exportToExcel } from '../utils/exporters';

export default function Audit({ auditLogs, lang }) {
  const ui = lang === 'ml' ? {
    title: 'ഓഡിറ്റ് ലോഗുകൾ & പ്രവർത്തന ലോഗുകൾ',
    subtitle: 'കർഷക രജിസ്ട്രേഷനുകൾ, അപേക്ഷ സമർപ്പണങ്ങൾ, വർക്ക്ഫ്ലോ അഭിപ്രായങ്ങൾ എന്നിവയുടെ മുഴുവൻ ചരിത്രവും.',
    exportExcel: 'എക്സൽ എക്സ്പോർട്ട്',
    timestamp: 'സമയം',
    user: 'ഉപയോക്താവ്',
    role: 'പദവി',
    module: 'മോഡ്യൂൾ',
    action: 'നടപടി',
    recordRef: 'രേഖ റഫറൻസ്',
    prevValue: 'മുൻ മൂല്യം',
    newValue: 'പുതിയ മൂല്യം',
    remarks: 'അഭിപ്രായങ്ങൾ',
    ipAddress: 'ഐപി വിലാസം'
  } : {
    title: 'Audit Trail & Activity Log',
    subtitle: 'Complete historical logs of farmer registrations, application submissions, and workflow comments.',
    exportExcel: 'Export Excel',
    timestamp: 'Timestamp',
    user: 'User',
    role: 'Role',
    module: 'Module',
    action: 'Action',
    recordRef: 'Record Ref',
    prevValue: 'Prev Value',
    newValue: 'New Value',
    remarks: 'Remarks',
    ipAddress: 'IP Address'
  };

  const auditHeaders = [
    { label: ui.timestamp, key: 'timestamp' },
    { label: ui.user, key: 'user' },
    { label: ui.role, key: 'role' },
    { label: ui.module, key: 'module' },
    { label: ui.action, key: 'action' },
    { label: ui.recordRef, key: 'recordId' },
    { label: ui.prevValue, key: 'prevValue' },
    { label: ui.newValue, key: 'newValue' },
    { label: ui.remarks, key: 'remarks' },
    { label: ui.ipAddress, key: 'ipAddress' }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{ui.title}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <button className="btn btn-secondary" onClick={() => exportToExcel('audit-trail', auditLogs, auditHeaders)}>
          {ui.exportExcel}
        </button>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.timestamp}</th>
                <th>{ui.user}</th>
                <th>{ui.role}</th>
                <th>{ui.module}</th>
                <th>{ui.action}</th>
                <th>{ui.recordRef}</th>
                <th>{ui.remarks}</th>
                <th>{ui.ipAddress}</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td><span style={{fontSize: '12px', color: 'var(--text-muted)'}}>{log.timestamp}</span></td>
                  <td><strong>{log.user}</strong></td>
                  <td><span style={{fontSize: '12px'}}>{log.role}</span></td>
                  <td>{log.module}</td>
                  <td><span style={{fontWeight: '600'}}>{log.action}</span></td>
                  <td><span style={{fontFamily: 'monospace', fontSize: '12px'}}>{log.recordId}</span></td>
                  <td style={{fontSize: '12px', maxWidth: '250px'}}>{log.remarks}</td>
                  <td><span style={{fontFamily: 'monospace', fontSize: '12px'}}>{log.ipAddress}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
