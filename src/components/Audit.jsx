import React from 'react';
import { exportToExcel } from '../utils/exporters';

const auditHeaders = [
  { label: 'Timestamp', key: 'timestamp' },
  { label: 'User', key: 'user' },
  { label: 'Role', key: 'role' },
  { label: 'Module', key: 'module' },
  { label: 'Action', key: 'action' },
  { label: 'Record Ref', key: 'recordId' },
  { label: 'Prev Value', key: 'prevValue' },
  { label: 'New Value', key: 'newValue' },
  { label: 'Remarks', key: 'remarks' },
  { label: 'IP Address', key: 'ipAddress' }
];

export default function Audit({ auditLogs }) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Audit Trail & Activity Log</h1>
          <p>Complete historical logs of farmer registrations, application submissions, and workflow comments.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => exportToExcel('audit-trail', auditLogs, auditHeaders)}>
          Export Excel
        </button>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Role</th>
                <th>Module</th>
                <th>Action</th>
                <th>Record Ref</th>
                <th>Remarks</th>
                <th>IP Address</th>
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
