import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ApprovalQueue({ applications, currentRole, setSelectedApplication, t }) {
  const getFilteredApps = () => {
    return applications.filter(app => {
      if (currentRole === 'Field Supervisor') return app.status === 'Pending Field Supervisor';
      if (currentRole === 'P&I Officer') return app.status === 'Pending P&I Officer';
      if (currentRole === 'Section Head') return app.status === 'Pending Section Head';
      if (currentRole === 'Unit Head') return app.status === 'Pending Unit Head';
      if (currentRole === 'Functional Head') return app.status === 'Pending Functional Head';
      if (currentRole === 'Managing Director') return app.status === 'Pending Managing Director';
      if (currentRole === 'Finance Head') return app.status === 'Pending Finance' || app.paymentStatus === 'Awaiting Finance Approval';
      return true;
    });
  };

  const filteredApps = getFilteredApps();

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('approvalQueue')}</h1>
          <p>View and process scheme applications pending at the {currentRole} approval level.</p>
        </div>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Ref No</th>
                <th>Farmer</th>
                <th>Scheme</th>
                <th>Society</th>
                <th>Requested Amount</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => (
                <tr key={app.id}>
                  <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{app.refNo}</span></td>
                  <td>{app.farmerName}</td>
                  <td>{app.schemeName}</td>
                  <td>{app.societyName}</td>
                  <td>₹{app.benefitAmount.toLocaleString()}</td>
                  <td>{app.submissionDate}</td>
                  <td>
                    <button className="btn btn-primary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => setSelectedApplication(app)}>
                      Process & Review
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={7} style={{textAlign: 'center', padding: '24px', color: 'var(--text-light)'}}>
                    <CheckCircle size={24} style={{color: '#10b981', display: 'inline', marginBottom: '8px'}}/>
                    <div>No applications require your verification level at this time.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
