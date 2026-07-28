import React from 'react';
import { Eye } from 'lucide-react';
import { statusText } from '../i18n';

export default function Statements({ statements, currentRole, handleCreateStatement, setSelectedStatement, lang }) {
  const ui = lang === 'ml' ? {
    title: 'ഏകീകൃത പ്രസ്താവന പ്രോസസ്സിംഗ്',
    description: 'പരിശോധിച്ച അപേക്ഷകളുടെ ഗ്രൂപ്പുകൾ തയ്യാറാക്കി, ബാച്ച് ചെയ്ത്, അന്തിമ അംഗീകാരത്തിനായി ഹെഡ് ഓഫീസിന് സമർപ്പിക്കുക.',
    generate: 'പ്രസ്താവന തയ്യാറാക്കുക',
    thStmtNo: 'പ്രസ്താവന നമ്പർ',
    thScheme: 'പദ്ധതിയുടെ പേര്',
    thDistrict: 'ജില്ല',
    thSociety: 'സഹകരണ സംഘം',
    thApplications: 'അപേക്ഷകൾ',
    thAmount: 'മൊത്തം തുക',
    thStatus: 'നില',
    thActions: 'നടപടി',
    applicants: 'അപേക്ഷക്കാർ',
    viewStatement: 'പ്രസ്താവന കാണുക',
  } : {
    title: 'Consolidated Statement Processing',
    description: 'Generate, batch, and submit groups of verified applications to Head Office for final sanctioning.',
    generate: 'Generate Statement',
    thStmtNo: 'Statement No',
    thScheme: 'Scheme Name',
    thDistrict: 'District',
    thSociety: 'Co-op Society',
    thApplications: 'Applications',
    thAmount: 'Total Amount',
    thStatus: 'Status',
    thActions: 'Actions',
    applicants: 'Applicants',
    viewStatement: 'View Statement',
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{ui.title}</h1>
          <p>{ui.description}</p>
        </div>
        {currentRole === 'P&I Officer' && (
          <button className="btn btn-primary" onClick={handleCreateStatement}>
            {ui.generate}
          </button>
        )}
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.thStmtNo}</th>
                <th>{ui.thScheme}</th>
                <th>{ui.thDistrict}</th>
                <th>{ui.thSociety}</th>
                <th>{ui.thApplications}</th>
                <th>{ui.thAmount}</th>
                <th>{ui.thStatus}</th>
                <th>{ui.thActions}</th>
              </tr>
            </thead>
            <tbody>
              {statements.map(stmt => (
                <tr key={stmt.id}>
                  <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{stmt.stmtNo}</span></td>
                  <td>{stmt.schemeName}</td>
                  <td>{stmt.district}</td>
                  <td>{stmt.societyName}</td>
                  <td>{stmt.totalApplications} {ui.applicants}</td>
                  <td>₹{stmt.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${stmt.status === 'Approved' ? 'approved' : 'pending'}`}>
                      {statusText(lang, stmt.status)}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => setSelectedStatement(stmt)}>
                      <Eye size={12}/> {ui.viewStatement}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
