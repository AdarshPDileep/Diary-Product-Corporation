import React from 'react';
import { CreditCard, CheckCircle, PieChart, Layers, MapPin, Building2 } from 'lucide-react';
import { statusText } from '../i18n';

const fmtINR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

export default function Finance({
  budgetAllocation, applications, schemes, financeBreakdown,
  setActivePaymentApp, setMilkBillNo, setPaymentAmount, setPaymentUpdateModal, lang
}) {
  const ui = lang === 'ml' ? {
    dashboardTitle: 'ധനകാര്യം & ബഡ്ജറ്റ് ഡാഷ്ബോർഡ്',
    dashboardDesc: 'അംഗീകരിച്ച ഗ്രാന്റുകൾ വിതരണം ചെയ്യുകയും പാൽ ബിൽ നമ്പറുകൾ സമന്വയിപ്പിക്കുകയും ചെയ്യുക.',
    totalAllocated: 'മൊത്തം വകയിരുത്തിയ ബഡ്ജറ്റ്',
    totalDisbursed: 'മൊത്തം വിതരണം ചെയ്തത്',
    remainingBalance: 'ശേഷിക്കുന്ന തുക',
    processingQueue: 'ധനകാര്യ അപേക്ഷാ പ്രോസസ്സിംഗ് ക്യൂ',
    applicationRef: 'അപേക്ഷ റഫ്',
    farmer: 'കർഷകൻ',
    society: 'സഹകരണ സംഘം',
    sanctionedAmount: 'അനുവദിച്ച തുക',
    paymentStatus: 'ധനമിടപാട് നില',
    milkBillRef: 'പാൽ ബിൽ റഫറൻസ്',
    actions: 'നടപടികൾ',
    unassigned: 'നൽകിയിട്ടില്ല',
    updatePayment: 'ധനമിടപാട് അപ്ഡേറ്റ് ചെയ്യുക',
    completed: 'പൂർത്തിയായി',
    schemeBudgetTitle: 'പദ്ധതി തിരിച്ചുള്ള ബഡ്ജറ്റ് വിഹിതം',
    scheme: 'പദ്ധതി',
    allocated: 'വകയിരുത്തിയത്',
    utilized: 'ഉപയോഗിച്ചത്',
    utilization: 'ഉപയോഗം',
    districtTitle: 'ജില്ല തിരിച്ചുള്ള ചെലവ്',
    district: 'ജില്ല',
    expended: 'ചെലവഴിച്ചത്',
    remaining: 'ശേഷിക്കുന്നത്',
    societyFundTitle: 'സഹകരണ സംഘം തിരിച്ചുള്ള ഫണ്ട് വിതരണം',
    fundAllocated: 'വകയിരുത്തിയ ഫണ്ട്',
    distributed: 'വിതരണം ചെയ്തത്',
    beneficiaries: 'ഗുണഭോക്താക്കൾ'
  } : {
    dashboardTitle: 'Finance & Budget Dashboard',
    dashboardDesc: 'Disburse approved grants and reconcile Milk Bill numbers.',
    totalAllocated: 'Total Allocated Budget',
    totalDisbursed: 'Total Disbursed',
    remainingBalance: 'Remaining Balance',
    processingQueue: 'Finance Application Processing Queue',
    applicationRef: 'Application Ref',
    farmer: 'Farmer',
    society: 'Society',
    sanctionedAmount: 'Sanctioned Amount',
    paymentStatus: 'Payment Status',
    milkBillRef: 'Milk Bill Reference',
    actions: 'Actions',
    unassigned: 'Unassigned',
    updatePayment: 'Update Payment',
    completed: 'Completed',
    schemeBudgetTitle: 'Scheme-wise Budget Allocation',
    scheme: 'Scheme',
    allocated: 'Allocated',
    utilized: 'Utilized',
    utilization: 'Utilization',
    districtTitle: 'District-wise Expenditure',
    district: 'District',
    expended: 'Expended',
    remaining: 'Remaining',
    societyFundTitle: 'Society-wise Fund Distribution',
    fundAllocated: 'Fund Allocated',
    distributed: 'Distributed',
    beneficiaries: 'Beneficiaries'
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{ui.dashboardTitle}</h1>
          <p>{ui.dashboardDesc}</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{ui.totalAllocated}</span>
            <div className="metric-icon-wrapper"><CreditCard size={16}/></div>
          </div>
          <span className="metric-val">₹{(budgetAllocation.total/100000).toFixed(1)}L</span>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{ui.totalDisbursed}</span>
            <div className="metric-icon-wrapper"><CheckCircle size={16}/></div>
          </div>
          <span className="metric-val">₹{(budgetAllocation.utilized/100000).toFixed(1)}L</span>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{ui.remainingBalance}</span>
            <div className="metric-icon-wrapper"><PieChart size={16}/></div>
          </div>
          <span className="metric-val">₹{((budgetAllocation.total - budgetAllocation.utilized)/100000).toFixed(1)}L</span>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title">{ui.processingQueue}</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.applicationRef}</th>
                <th>{ui.farmer}</th>
                <th>{ui.society}</th>
                <th>{ui.sanctionedAmount}</th>
                <th>{ui.paymentStatus}</th>
                <th>{ui.milkBillRef}</th>
                <th>{ui.actions}</th>
              </tr>
            </thead>
            <tbody>
              {applications
                .filter(app => app.paymentStatus === 'Awaiting Finance Approval' || app.paymentStatus === 'Paid')
                .map(app => (
                  <tr key={app.id}>
                    <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{app.refNo}</span></td>
                    <td>{app.farmerName}</td>
                    <td>{app.societyName}</td>
                    <td>₹{app.benefitAmount.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${app.paymentStatus === 'Paid' ? 'approved' : 'pending'}`}>
                        {statusText(lang, app.paymentStatus)}
                      </span>
                    </td>
                    <td>{app.milkBillRef || <span style={{color: 'var(--text-light)'}}>{ui.unassigned}</span>}</td>
                    <td>
                      {app.paymentStatus !== 'Paid' ? (
                        <button className="btn btn-primary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => {
                          setActivePaymentApp(app);
                          setMilkBillNo(`MB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
                          setPaymentAmount(app.benefitAmount);
                          setPaymentUpdateModal(true);
                        }}>
                          {ui.updatePayment}
                        </button>
                      ) : (
                        <span style={{fontSize: '12px', color: '#10b981', fontWeight: '600'}}>{ui.completed}</span>
                      )}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheme-wise Budget Allocation (URS §9) */}
      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title"><Layers size={16} /> {ui.schemeBudgetTitle}</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.scheme}</th>
                <th>{ui.allocated}</th>
                <th>{ui.utilized}</th>
                <th style={{ minWidth: '180px' }}>{ui.utilization}</th>
              </tr>
            </thead>
            <tbody>
              {(financeBreakdown?.schemeWise || schemes || []).map((row, i) => {
                const allocated = row.allocated ?? row.budgetAllocation ?? 0;
                const utilized = row.utilized ?? row.utilizedBudget ?? 0;
                const pct = allocated ? Math.round((utilized / allocated) * 100) : 0;
                return (
                  <tr key={i}>
                    <td>{row.schemeName}</td>
                    <td>{fmtINR(allocated)}</td>
                    <td>{fmtINR(utilized)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
                        <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '36px' }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '0', marginBottom: '0' }}>
        {/* District-wise Expenditure */}
        <div className="card-section" style={{ marginBottom: '0' }}>
          <div className="card-section-header">
            <span className="card-section-title"><MapPin size={16} /> {ui.districtTitle}</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr><th>{ui.district}</th><th>{ui.allocated}</th><th>{ui.expended}</th><th>{ui.remaining}</th></tr>
              </thead>
              <tbody>
                {(financeBreakdown?.districtWise || []).map((d, i) => (
                  <tr key={i}>
                    <td>{d.districtName}</td>
                    <td>{fmtINR(d.allocated)}</td>
                    <td>{fmtINR(d.expended)}</td>
                    <td>{fmtINR(d.allocated - d.expended)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Society-wise Fund Distribution */}
        <div className="card-section" style={{ marginBottom: '0' }}>
          <div className="card-section-header">
            <span className="card-section-title"><Building2 size={16} /> {ui.societyFundTitle}</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr><th>{ui.society}</th><th>{ui.fundAllocated}</th><th>{ui.distributed}</th><th>{ui.beneficiaries}</th></tr>
              </thead>
              <tbody>
                {(financeBreakdown?.societyWise || []).map((s, i) => (
                  <tr key={i}>
                    <td>{s.societyName}</td>
                    <td>{fmtINR(s.fundAllocated)}</td>
                    <td>{fmtINR(s.fundDistributed)}</td>
                    <td>{s.beneficiaryCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
