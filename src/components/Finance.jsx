import React from 'react';
import { CreditCard, CheckCircle, PieChart, Layers, MapPin, Building2 } from 'lucide-react';

const fmtINR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

export default function Finance({
  budgetAllocation, applications, schemes, financeBreakdown,
  setActivePaymentApp, setMilkBillNo, setPaymentAmount, setPaymentUpdateModal
}) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Finance & Budget Dashboard</h1>
          <p>Disburse approved grants and reconcile Milk Bill numbers.</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Allocated Budget</span>
            <div className="metric-icon-wrapper"><CreditCard size={16}/></div>
          </div>
          <span className="metric-val">₹{(budgetAllocation.total/100000).toFixed(1)}L</span>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Disbursed</span>
            <div className="metric-icon-wrapper"><CheckCircle size={16}/></div>
          </div>
          <span className="metric-val">₹{(budgetAllocation.utilized/100000).toFixed(1)}L</span>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Remaining Balance</span>
            <div className="metric-icon-wrapper"><PieChart size={16}/></div>
          </div>
          <span className="metric-val">₹{((budgetAllocation.total - budgetAllocation.utilized)/100000).toFixed(1)}L</span>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title">Finance Application Processing Queue</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Application Ref</th>
                <th>Farmer</th>
                <th>Society</th>
                <th>Sanctioned Amount</th>
                <th>Payment Status</th>
                <th>Milk Bill Reference</th>
                <th>Actions</th>
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
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td>{app.milkBillRef || <span style={{color: 'var(--text-light)'}}>Unassigned</span>}</td>
                    <td>
                      {app.paymentStatus !== 'Paid' ? (
                        <button className="btn btn-primary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => {
                          setActivePaymentApp(app);
                          setMilkBillNo(`MB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
                          setPaymentAmount(app.benefitAmount);
                          setPaymentUpdateModal(true);
                        }}>
                          Update Payment
                        </button>
                      ) : (
                        <span style={{fontSize: '12px', color: '#10b981', fontWeight: '600'}}>Completed</span>
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
          <span className="card-section-title"><Layers size={16} /> Scheme-wise Budget Allocation</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Scheme</th>
                <th>Allocated</th>
                <th>Utilized</th>
                <th style={{ minWidth: '180px' }}>Utilization</th>
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
            <span className="card-section-title"><MapPin size={16} /> District-wise Expenditure</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr><th>District</th><th>Allocated</th><th>Expended</th><th>Remaining</th></tr>
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
            <span className="card-section-title"><Building2 size={16} /> Society-wise Fund Distribution</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr><th>Society</th><th>Fund Allocated</th><th>Distributed</th><th>Beneficiaries</th></tr>
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
