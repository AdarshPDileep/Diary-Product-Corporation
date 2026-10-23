import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ApprovalQueue({ applications, currentRole, setSelectedApplication, t, lang }) {
  const ui = lang === 'ml' ? {
    description: `നിലവിലെ ${currentRole} അംഗീകാര ഘട്ടത്തിൽ കാത്തിരിക്കുന്ന പദ്ധതി അപേക്ഷകൾ കാണുകയും പ്രോസസ്സ് ചെയ്യുകയും ചെയ്യുക.`,
    thRefNo: 'റഫറൻസ് നമ്പർ',
    thFarmer: 'കർഷകൻ',
    thScheme: 'പദ്ധതി',
    thSociety: 'സഹകരണ സംഘം',
    thAmount: 'അഭ്യർത്ഥിച്ച തുക',
    thDate: 'സമർപ്പിച്ച തീയതി',
    thActions: 'നടപടി',
    review: 'പ്രോസസ്സ് ചെയ്ത് പരിശോധിക്കുക',
    empty: 'ഈ സമയത്ത് നിങ്ങളുടെ പരിശോധന ഘട്ടത്തിൽ കാത്തിരിക്കുന്ന അപേക്ഷകളൊന്നുമില്ല.',
  } : {
    description: `View and process scheme applications pending at the ${currentRole} approval level.`,
    thRefNo: 'Ref No',
    thFarmer: 'Farmer',
    thScheme: 'Scheme',
    thSociety: 'Society',
    thAmount: 'Requested Amount',
    thDate: 'Submission Date',
    thActions: 'Actions',
    review: 'Process & Review',
    empty: 'No applications require your verification level at this time.',
  };

  const rolePendingStatus = {
    'Field Supervisor': 'Pending Field Supervisor',
    'P&I Officer': 'Pending P&I Officer',
    'Section Head': 'Pending Section Head',
    'Unit Head': 'Pending Unit Head',
    'Functional Head': 'Pending Functional Head',
    'Managing Director': 'Pending Managing Director',
    'Finance Head': 'Pending Finance'
  };

  const getFilteredApps = () => {
    if (currentRole === 'Super Administrator') {
      return applications.filter((app) => app.status.startsWith('Pending ') || app.paymentStatus === 'Awaiting Finance Approval');
    }
    if (currentRole === 'Finance Head') {
      return applications.filter(
        (app) => app.status === rolePendingStatus['Finance Head'] || app.paymentStatus === 'Awaiting Finance Approval'
      );
    }
    const pendingStatus = rolePendingStatus[currentRole];
    if (!pendingStatus) return [];
    return applications.filter((app) => app.status === pendingStatus);
  };

  const filteredApps = getFilteredApps();

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('approvalQueue')}</h1>
          <p>{ui.description}</p>
        </div>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.thRefNo}</th>
                <th>{ui.thFarmer}</th>
                <th>{ui.thScheme}</th>
                <th>{ui.thSociety}</th>
                <th>{ui.thAmount}</th>
                <th>{ui.thDate}</th>
                <th>{ui.thActions}</th>
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
                      {ui.review}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={7} style={{textAlign: 'center', padding: '24px', color: 'var(--text-light)'}}>
                    <CheckCircle size={24} style={{color: '#10b981', display: 'inline', marginBottom: '8px'}}/>
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
