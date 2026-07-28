import React from 'react';
import {
  Users, Award, Clock, CreditCard, TrendingUp, PieChart, Bell, Eye, Plus,
  Sprout, Leaf, Beef, Activity, FileText, CheckCircle, ArrowRight, Wallet
} from 'lucide-react';
import { roleDashboardMetrics } from '../mockData';

const fmtINR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
const isApproved = (s) => s === 'Approved' || s === 'Completed';

/* ---- SVG area chart (SolarPulse-style) ---- */
function AreaChart({ data = [], labels = [], color = '#2196F3' }) {
  const W = 560, H = 180, padX = 14, padTop = 16, padBottom = 26;
  const max = Math.max(...data) * 1.15 || 1;
  const min = Math.min(0, Math.min(...data));
  const range = max - min || 1;
  const step = (W - padX * 2) / (data.length - 1 || 1);

  const pts = data.map((v, i) => {
    const x = padX + i * step;
    const y = H - padBottom - ((v - min) / range) * (H - padTop - padBottom);
    return [x, y];
  });

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${H - padBottom} L ${pts[0][0].toFixed(1)} ${H - padBottom} Z`;
  const gid = `area-grad-${color.replace('#', '')}`;

  return (
    <svg className="area-chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} className="chart-grid-line" x1={padX} x2={W - padX}
          y1={padTop + f * (H - padTop - padBottom)} y2={padTop + f * (H - padTop - padBottom)} />
      ))}
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#fff" stroke={color} strokeWidth="2.5" />
      ))}
      {labels.map((lb, i) => (
        <text key={i} className="chart-axis-label" x={pts[i][0]} y={H - 8} textAnchor="middle">{lb}</text>
      ))}
    </svg>
  );
}

/* ---- Circular progress ring ---- */
function ProgressRing({ value, label, color = '#4CAF50', sub }) {
  const size = 96, stroke = 9, r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="ring">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2F7" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x={size / 2} y={size / 2 - 1} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: '19px', fontWeight: 800, fill: '#1A1F36' }}>{value}%</text>
      </svg>
      <span className="ring-label">{label}</span>
      {sub && <span className="ring-label" style={{ marginTop: '-4px', color: 'var(--text-light)' }}>{sub}</span>}
    </div>
  );
}

/* ============ OFFICER DASHBOARD (default) ============ */
function OfficerDashboard({ farmers, schemes, applications, budgetAllocation, username, notifications, setSelectedApplication, t }) {
  const pending = applications.filter(a => a.status.startsWith('Pending')).length;
  const openSchemes = schemes.filter(s => s.status === 'Published').length;
  const activeFarmers = farmers.length + 85;
  const totalMilk = farmers.reduce((s, f) => s + (f.milkSupplyAvg || 0), 0);
  const utilPct = Math.round((budgetAllocation.utilized / budgetAllocation.total) * 100);
  const approvedCount = applications.filter(a => isApproved(a.status)).length;
  const approvalRate = applications.length ? Math.round((approvedCount / applications.length) * 100) : 0;
  const adoptionPct = Math.min(99, Math.round((applications.length / (farmers.length || 1)) * 100) + 12);

  const trendData = [18, 24, 21, 30, 28, 36, 33, 42];
  const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  return (
    <>
      <div className="hero-card">
        <div className="hero-left">
          <div className="hero-title">Your farmer schemes are performing excellently 🌱</div>
          <div className="hero-sub">Union-wide disbursements are on track for FY 2026-27. Keep approvals moving to stay ahead of the cycle.</div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="v">{activeFarmers.toLocaleString()}</div><div className="l">Active Farmers</div></div>
          <div className="hero-stat"><div className="v">{openSchemes}</div><div className="l">Open Schemes</div></div>
          <div className="hero-stat"><div className="v">{applications.length}</div><div className="l">Applications</div></div>
          <div className="hero-stat"><div className="v">₹{(budgetAllocation.utilized / 100000).toFixed(1)}L</div><div className="l">Disbursed</div></div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span className="metric-title">{t('activeFarmers')}</span><div className="metric-icon-wrapper green"><Users size={18} /></div></div>
          <span className="metric-val">{activeFarmers.toLocaleString()}</span>
          <span className="metric-desc"><span className="trend-up"><TrendingUp size={12} /> +4.2%</span> from last year</span>
        </div>
        <div className="metric-card">
          <div className="metric-header"><span className="metric-title">{t('openSchemes')}</span><div className="metric-icon-wrapper"><Award size={18} /></div></div>
          <span className="metric-val">{openSchemes}</span>
          <span className="metric-desc">Available for applications</span>
        </div>
        <div className="metric-card">
          <div className="metric-header"><span className="metric-title">{t('pending')} Decisions</span><div className="metric-icon-wrapper amber"><Clock size={18} /></div></div>
          <span className="metric-val">{pending}</span>
          <span className="metric-desc">Awaiting verification</span>
        </div>
        <div className="metric-card">
          <div className="metric-header"><span className="metric-title">Disbursed Budget</span><div className="metric-icon-wrapper"><CreditCard size={18} /></div></div>
          <span className="metric-val">₹{(budgetAllocation.utilized / 100000).toFixed(1)}L</span>
          <span className="metric-desc">of ₹{(budgetAllocation.total / 100000).toFixed(1)}L allocated</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card-section">
          <div className="card-section-header">
            <span className="card-section-title"><Activity size={16} /> Scheme Applications Trend</span>
            <span className="card-subtitle">Monthly · FY 2026-27</span>
          </div>
          <div style={{ padding: '8px 22px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)' }}>{applications.length}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>total this cycle</span>
              <span className="trend-up" style={{ fontSize: '12px', marginLeft: 'auto' }}><TrendingUp size={13} /> +12.5%</span>
            </div>
            <div className="area-chart-wrap"><AreaChart data={trendData} labels={trendLabels} color="#2196F3" /></div>
          </div>
        </div>
        <div className="card-section">
          <div className="card-section-header">
            <span className="card-section-title"><PieChart size={16} /> Performance &amp; Health</span>
            <span className="card-subtitle">Union Overview</span>
          </div>
          <div className="ring-row">
            <ProgressRing value={utilPct} label="Budget Used" color="#2196F3" />
            <ProgressRing value={approvalRate} label="Approval Rate" color="#4CAF50" />
            <ProgressRing value={adoptionPct} label="Scheme Adoption" color="#26A69A" />
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '22px' }}>
        <div className="card-section">
          <div className="card-section-header">
            <span className="card-section-title">Recent Scheme Applications</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead><tr><th>Ref No</th><th>Farmer</th><th>Scheme</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {applications.slice(0, 5).map(app => (
                  <tr key={app.id}>
                    <td><span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{app.refNo}</span></td>
                    <td>{app.farmerName}</td>
                    <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.schemeName}</td>
                    <td><span className={`badge badge-${app.status.toLowerCase().includes('pending') ? 'pending' : app.status.toLowerCase().includes('return') ? 'returned' : app.status.toLowerCase()}`}>{app.status}</span></td>
                    <td><button className="btn btn-secondary" style={{ padding: '5px 10px', fontSize: '11px' }} onClick={() => setSelectedApplication(app)}><Eye size={12} /> View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-section" style={{ padding: '20px 22px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}><Leaf size={16} style={{ color: 'var(--primary-color)' }} /> Union Impact</h4>
          <div className="env-impact-row"><div className="env-impact-icon"><Beef size={20} /></div><div className="env-impact-text"><div className="t">{farmers.reduce((s, f) => s + (f.cattleCount || 0), 0).toLocaleString()} Cattle</div><div className="d">Across active farmers</div></div></div>
          <div className="env-impact-row"><div className="env-impact-icon"><Sprout size={20} /></div><div className="env-impact-text"><div className="t">{totalMilk.toFixed(0)} L/Day Milk</div><div className="d">Average daily supply</div></div></div>
          <div className="env-impact-row"><div className="env-impact-icon"><Users size={20} /></div><div className="env-impact-text"><div className="t">{applications.length} Lives Supported</div><div className="d">Beneficiaries this cycle</div></div></div>
        </div>
      </div>
    </>
  );
}

/* ============ SOCIETY DASHBOARD ============ */
function SocietyDashboard({ applications, schemes, notifications, username, setSelectedApplication, setActiveMenu, t }) {
  const m = roleDashboardMetrics['Society User'];
  const myApps = applications.filter(a => a.societyId === 'SOC101');
  const schemeCounts = {};
  myApps.forEach(a => { schemeCounts[a.schemeName] = (schemeCounts[a.schemeName] || 0) + 1; });

  return (
    <>
      <div className="hero-card">
        <div className="hero-left">
          <div className="hero-title">Welcome back, {username} 🐄</div>
          <div className="hero-sub">Track applications submitted by your society and stay updated on scheme notifications and payments.</div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="v">{m.submitted}</div><div className="l">Submitted</div></div>
          <div className="hero-stat"><div className="v">{m.approved}</div><div className="l">Approved</div></div>
          <div className="hero-stat"><div className="v">{m.paymentsCompleted}</div><div className="l">Payments Done</div></div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Submitted Applications</span><div className="metric-icon-wrapper"><FileText size={18} /></div></div><span className="metric-val">{m.submitted}</span><span className="metric-desc">This financial year</span></div>
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Drafts</span><div className="metric-icon-wrapper amber"><FileText size={18} /></div></div><span className="metric-val">{m.drafts}</span><span className="metric-desc">Not yet submitted</span></div>
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Returned for Review</span><div className="metric-icon-wrapper red"><Bell size={18} /></div></div><span className="metric-val">{m.returned}</span><span className="metric-desc">Action needed</span></div>
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Payments Completed</span><div className="metric-icon-wrapper green"><CheckCircle size={18} /></div></div><span className="metric-val">{m.paymentsCompleted}</span><span className="metric-desc">{m.balanceBudget} balance budget</span></div>
      </div>

      <div className="dashboard-grid">
        <div className="card-section">
          <div className="card-section-header">
            <span className="card-section-title">{t('myApplications')}</span>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveMenu('SubmitApp')}><Plus size={14} /> New</button>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead><tr><th>Ref No</th><th>Scheme</th><th>Amount</th><th>Status</th><th>Payment</th></tr></thead>
              <tbody>
                {myApps.map(app => (
                  <tr key={app.id}>
                    <td><span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{app.refNo}</span></td>
                    <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.schemeName}</td>
                    <td>₹{app.benefitAmount.toLocaleString()}</td>
                    <td><span className={`badge badge-${app.status.toLowerCase().includes('pending') ? 'pending' : 'approved'}`}>{app.status}</span></td>
                    <td><span className={`badge badge-${app.paymentStatus === 'Paid' ? 'approved' : 'pending'}`}>{app.paymentStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div className="card-section" style={{ padding: '20px 22px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={16} style={{ color: 'var(--primary-color)' }} /> {t('schemeNotifications')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.map(n => (
                <div key={n.id} style={{ fontSize: '12px', borderBottom: '1px solid var(--hairline)', paddingBottom: '10px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{n.title}</div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '3px' }}>{n.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-section" style={{ padding: '20px 22px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}><PieChart size={16} style={{ color: 'var(--primary-color)' }} /> {t('schemeWiseCounts')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.keys(schemeCounts).map(s => (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{s}</span>
                  <span style={{ fontWeight: '700' }}>{schemeCounts[s]} app(s)</span>
                </div>
              ))}
              {Object.keys(schemeCounts).length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>No applications yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ FINANCE DASHBOARD ============ */
function FinanceDashboard({ budgetAllocation, schemes, setActiveMenu, t }) {
  const m = roleDashboardMetrics['Finance Head'];
  const remaining = budgetAllocation.total - budgetAllocation.utilized;

  return (
    <>
      <div className="hero-card">
        <div className="hero-left">
          <div className="hero-title">Finance overview · FY 2026-27 💰</div>
          <div className="hero-sub">{m.budgetWarningStatus}. Track budget allocation, utilization and district/society-wise expenditure.</div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="v">₹{(budgetAllocation.total / 100000).toFixed(1)}L</div><div className="l">Allocated</div></div>
          <div className="hero-stat"><div className="v">₹{(budgetAllocation.utilized / 100000).toFixed(1)}L</div><div className="l">Utilized</div></div>
          <div className="hero-stat"><div className="v">{m.paymentQueue}</div><div className="l">Payment Queue</div></div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Total Allocated</span><div className="metric-icon-wrapper"><Wallet size={18} /></div></div><span className="metric-val">{fmtINR(budgetAllocation.total)}</span></div>
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Total Disbursed</span><div className="metric-icon-wrapper green"><CheckCircle size={18} /></div></div><span className="metric-val">{fmtINR(budgetAllocation.utilized)}</span></div>
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Remaining Balance</span><div className="metric-icon-wrapper amber"><PieChart size={18} /></div></div><span className="metric-val">{fmtINR(remaining)}</span></div>
        <div className="metric-card"><div className="metric-header"><span className="metric-title">Processed Today</span><div className="metric-icon-wrapper"><CreditCard size={18} /></div></div><span className="metric-val">{m.processedToday}</span><span className="metric-desc">{m.paymentQueue} awaiting payment</span></div>
      </div>

      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title">{t('fundDistribution')}</span>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveMenu('Finance')}>Open Finance Module <ArrowRight size={14} /></button>
        </div>
        <div style={{ padding: '12px 22px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {schemes.map(s => {
            const pct = s.budgetAllocation ? Math.round((s.utilizedBudget / s.budgetAllocation) * 100) : 0;
            return (
              <div key={s.code}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600' }}>{s.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{fmtINR(s.utilizedBudget)} / {fmtINR(s.budgetAllocation)}</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ============ DISPATCHER ============ */
export default function Dashboard(props) {
  const { currentRole } = props;
  // role-specific page header (Submit App button for society users)
  const societyHeader = currentRole === 'Society User';

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{props.t('dashboard')}</h1>
          <p>{props.t('welcome')}, {props.username} · Trivandrum Region Co-operative Milk Producers Union</p>
        </div>
        {societyHeader && (
          <button className="btn btn-primary" onClick={() => props.setActiveMenu('SubmitApp')}>
            <Plus size={16} /> {props.t('submitApp')}
          </button>
        )}
      </div>

      {currentRole === 'Society User' && <SocietyDashboard {...props} />}
      {currentRole === 'Finance Head' && <FinanceDashboard {...props} />}
      {currentRole !== 'Society User' && currentRole !== 'Finance Head' && <OfficerDashboard {...props} />}
    </div>
  );
}
