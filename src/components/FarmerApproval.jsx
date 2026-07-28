import React from 'react';
import { CheckCircle, Eye, Check, X } from 'lucide-react';
import { statusText } from '../i18n';

export default function FarmerApproval({
  farmers, currentRole, setSelectedFarmerApproval, setSelectedFarmer, t, lang
}) {
  const ui = lang === 'ml' ? {
    description: 'കർഷക മാസ്റ്റർ രേഖകൾ പരിശോധിച്ച് അംഗീകരിക്കുക. ഫീൽഡ്/യൂണിറ്റ് തല പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്നവയാണ്. അംഗീകരിക്കുന്നതുവരെ മാറ്റങ്ങൾ പ്രാബല്യത്തിൽ വരില്ല.',
    pendingTitle: 'പരിശോധന നടക്കാത്ത കർഷക മാസ്റ്റർ രേഖകൾ',
    thFarmerId: 'കർഷക ഐഡി',
    thName: 'പേര്',
    thSociety: 'സഹകരണ സംഘം',
    thRequestedChange: 'അഭ്യർത്ഥിച്ച മാറ്റം',
    thKyc: 'KYC',
    thActions: 'നടപടി',
    newRegFallback: 'പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്ന പുതിയ രജിസ്ട്രേഷൻ',
    view: 'കാണുക',
    approve: 'അംഗീകരിക്കുക',
    reject: 'നിരസിക്കുക',
    empty: 'പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്ന കർഷക രേഖകളൊന്നുമില്ല.',
  } : {
    description: 'Review and approve farmer master records pending field/unit-level verification. Changes do not go live until approved.',
    pendingTitle: 'Pending Farmer Master Records',
    thFarmerId: 'Farmer ID',
    thName: 'Name',
    thSociety: 'Society',
    thRequestedChange: 'Requested Change',
    thKyc: 'KYC',
    thActions: 'Actions',
    newRegFallback: 'New registration awaiting verification',
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    empty: 'No farmer records pending verification.',
  };

  const pending = farmers.filter(f => f.status === 'Pending Verification');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('farmerApproval')}</h1>
          <p>{ui.description}</p>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title">{ui.pendingTitle} ({pending.length})</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.thFarmerId}</th>
                <th>{ui.thName}</th>
                <th>{ui.thSociety}</th>
                <th>{ui.thRequestedChange}</th>
                <th>{ui.thKyc}</th>
                <th>{ui.thActions}</th>
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
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '260px' }}>{f.remarks || ui.newRegFallback}</td>
                  <td>
                    <span className="badge badge-pending">{statusText(lang, f.kycStatus)}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setSelectedFarmer(f)}>
                        <Eye size={12} /> {ui.view}
                      </button>
                      <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setSelectedFarmerApproval({ farmer: f, action: 'approve' })}>
                        <Check size={12} /> {ui.approve}
                      </button>
                      <button className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setSelectedFarmerApproval({ farmer: f, action: 'reject' })}>
                        <X size={12} /> {ui.reject}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-light)' }}>
                    <CheckCircle size={24} style={{ color: 'var(--accent-green)', display: 'inline', marginBottom: '8px' }} />
                    <div>{ui.empty}</div>
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
