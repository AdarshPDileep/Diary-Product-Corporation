import React from 'react';
import { CheckCircle, Eye, Check, X } from 'lucide-react';

export default function FarmerApproval({
  farmers, currentRole, setSelectedFarmerApproval, setSelectedFarmer, t
}) {
  const pending = farmers.filter(f => f.status === 'Pending Verification');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('farmerApproval')}</h1>
          <p>Review and approve farmer master records pending field/unit-level verification. Changes do not go live until approved.</p>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title">Pending Farmer Master Records ({pending.length})</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Society</th>
                <th>Requested Change</th>
                <th>KYC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(f => (
                <tr key={f.id}>
                  <td><span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{f.farmerId}</span></td>
                  <td>
                    <div>{f.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{f.nameMl}</div>
                  </td>
                  <td>{f.societyId}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '260px' }}>{f.remarks || 'New registration awaiting verification'}</td>
                  <td>
                    <span className="badge badge-pending">{f.kycStatus}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setSelectedFarmer(f)}>
                        <Eye size={12} /> View
                      </button>
                      <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setSelectedFarmerApproval({ farmer: f, action: 'approve' })}>
                        <Check size={12} /> Approve
                      </button>
                      <button className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setSelectedFarmerApproval({ farmer: f, action: 'reject' })}>
                        <X size={12} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-light)' }}>
                    <CheckCircle size={24} style={{ color: 'var(--accent-green)', display: 'inline', marginBottom: '8px' }} />
                    <div>No farmer records pending verification.</div>
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
