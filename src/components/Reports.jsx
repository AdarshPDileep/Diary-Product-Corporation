import React, { useState, useMemo } from 'react';
import { FileSpreadsheet, FileText, Download, Filter } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../utils/exporters';
import { reportTypes } from '../mockData';

const fmtINR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
const isApproved = (s) => s === 'Approved' || s === 'Completed';

function computeReport(type, filters, { schemes, applications, statements, farmers, districts, societies }) {
  if (type === 'scheme-wise') {
    const rows = schemes
      .filter(s => !filters.scheme || s.code === filters.scheme)
      .map(s => {
        const apps = applications.filter(a => a.schemeCode === s.code);
        return {
          scheme: s.name,
          applications: apps.length,
          approved: apps.filter(a => isApproved(a.status)).length,
          pending: apps.filter(a => a.status.startsWith('Pending')).length,
          rejected: apps.filter(a => a.status === 'Rejected').length,
          totalBenefit: fmtINR(apps.reduce((sum, a) => sum + a.benefitAmount, 0))
        };
      });
    return {
      rows,
      headers: [
        { label: 'Scheme', key: 'scheme' }, { label: 'Applications', key: 'applications' },
        { label: 'Approved', key: 'approved' }, { label: 'Pending', key: 'pending' },
        { label: 'Rejected', key: 'rejected' }, { label: 'Total Benefit', key: 'totalBenefit' }
      ]
    };
  }

  if (type === 'district-wise') {
    const rows = districts
      .filter(d => !filters.district || d.code === filters.district)
      .map(d => {
        const farmerIds = farmers.filter(f => f.district === d.code).map(f => f.farmerId);
        const apps = applications.filter(a => farmerIds.includes(a.farmerId));
        const disbursed = apps.filter(a => a.paymentStatus === 'Paid').reduce((s, a) => s + a.benefitAmount, 0);
        return {
          district: d.name,
          applications: apps.length,
          beneficiaries: new Set(apps.map(a => a.farmerId)).size,
          totalDisbursed: fmtINR(disbursed)
        };
      });
    return {
      rows,
      headers: [
        { label: 'District', key: 'district' }, { label: 'Applications', key: 'applications' },
        { label: 'Beneficiaries', key: 'beneficiaries' }, { label: 'Total Disbursed', key: 'totalDisbursed' }
      ]
    };
  }

  if (type === 'society-wise') {
    const rows = societies
      .filter(s => !filters.society || s.id === filters.society)
      .map(s => {
        const apps = applications.filter(a => a.societyId === s.id);
        return {
          society: s.name,
          district: s.district,
          applications: apps.length,
          approved: apps.filter(a => isApproved(a.status)).length,
          totalBenefit: fmtINR(apps.reduce((sum, a) => sum + a.benefitAmount, 0))
        };
      });
    return {
      rows,
      headers: [
        { label: 'Society', key: 'society' }, { label: 'District', key: 'district' },
        { label: 'Applications', key: 'applications' }, { label: 'Approved', key: 'approved' },
        { label: 'Total Benefit', key: 'totalBenefit' }
      ]
    };
  }

  if (type === 'consolidated') {
    const rows = statements.map(st => ({
      stmtNo: st.stmtNo,
      scheme: st.schemeName,
      society: st.societyName,
      applications: st.totalApplications,
      totalAmount: fmtINR(st.totalAmount),
      status: st.status
    }));
    return {
      rows,
      headers: [
        { label: 'Statement No', key: 'stmtNo' }, { label: 'Scheme', key: 'scheme' },
        { label: 'Society', key: 'society' }, { label: 'Applications', key: 'applications' },
        { label: 'Total Amount', key: 'totalAmount' }, { label: 'Status', key: 'status' }
      ]
    };
  }

  if (type === 'monthly') {
    const byMonth = {};
    applications.forEach(a => {
      const m = (a.submissionDate || '').slice(0, 7);
      if (!m) return;
      byMonth[m] = byMonth[m] || { submitted: 0, approved: 0, returned: 0, total: 0 };
      byMonth[m].submitted++;
      if (isApproved(a.status)) byMonth[m].approved++;
      if (a.status.includes('Returned')) byMonth[m].returned++;
      byMonth[m].total += a.benefitAmount;
    });
    const rows = Object.keys(byMonth).sort().map(m => ({
      month: m,
      submitted: byMonth[m].submitted,
      approved: byMonth[m].approved,
      returned: byMonth[m].returned,
      total: fmtINR(byMonth[m].total)
    }));
    return {
      rows,
      headers: [
        { label: 'Month', key: 'month' }, { label: 'Submitted', key: 'submitted' },
        { label: 'Approved', key: 'approved' }, { label: 'Returned', key: 'returned' },
        { label: 'Total Benefit', key: 'total' }
      ]
    };
  }

  // batch-wise
  const rows = statements.map(st => ({
    batchNo: st.stmtNo,
    scheme: st.schemeName,
    society: st.societyName,
    applications: st.applications.length,
    totalAmount: fmtINR(st.totalAmount),
    status: st.status
  }));
  return {
    rows,
    headers: [
      { label: 'Batch No', key: 'batchNo' }, { label: 'Scheme', key: 'scheme' },
      { label: 'Society', key: 'society' }, { label: 'Applications', key: 'applications' },
      { label: 'Total Amount', key: 'totalAmount' }, { label: 'Status', key: 'status' }
    ]
  };
}

export default function Reports({ schemes, applications, statements, farmers, districts, societies, t }) {
  const [reportType, setReportType] = useState('scheme-wise');
  const [schemeFilter, setSchemeFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [societyFilter, setSocietyFilter] = useState('');

  const { rows, headers } = useMemo(
    () => computeReport(reportType, { scheme: schemeFilter, district: districtFilter, society: societyFilter }, { schemes, applications, statements, farmers, districts, societies }),
    [reportType, schemeFilter, districtFilter, societyFilter, schemes, applications, statements, farmers, districts, societies]
  );

  const activeLabel = reportTypes.find(r => r.key === reportType)?.label || 'Report';

  const doExcel = () => exportToExcel(`${reportType}-report`, rows, headers);
  const doPDF = () => exportToPDF(`${activeLabel} — TRCMPU`, `${reportType}-report`, rows, headers);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('reports')}</h1>
          <p>Scheme-wise, district-wise, society-wise, consolidated, monthly and batch-wise reports. Export to Excel or PDF.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={doExcel} disabled={!rows.length}>
            <Download size={15} /> Excel
          </button>
          <button className="btn btn-primary" onClick={doPDF} disabled={!rows.length}>
            <FileText size={15} /> PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-section" style={{ padding: '16px 20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ minWidth: '220px' }}>
          <label><Filter size={12} style={{ display: 'inline', marginRight: '4px' }} />Report Type</label>
          <select className="form-select" value={reportType} onChange={e => { setReportType(e.target.value); setSchemeFilter(''); setDistrictFilter(''); setSocietyFilter(''); }}>
            {reportTypes.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
        </div>

        {reportType === 'scheme-wise' && (
          <div className="form-group" style={{ minWidth: '220px' }}>
            <label>Scheme</label>
            <select className="form-select" value={schemeFilter} onChange={e => setSchemeFilter(e.target.value)}>
              <option value="">All Schemes</option>
              {schemes.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
          </div>
        )}

        {reportType === 'district-wise' && (
          <div className="form-group" style={{ minWidth: '200px' }}>
            <label>District</label>
            <select className="form-select" value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
              <option value="">All Districts</option>
              {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
            </select>
          </div>
        )}

        {reportType === 'society-wise' && (
          <div className="form-group" style={{ minWidth: '220px' }}>
            <label>Society</label>
            <select className="form-select" value={societyFilter} onChange={e => setSocietyFilter(e.target.value)}>
              <option value="">All Societies</option>
              {societies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="card-section">
        <div className="card-section-header">
          <span className="card-section-title"><FileSpreadsheet size={16} /> {activeLabel}</span>
          <span className="card-subtitle">{rows.length} record(s)</span>
        </div>
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>{headers.map(h => <th key={h.key}>{h.label}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {headers.map(h => {
                    const isStatus = h.key === 'status';
                    const val = r[h.key];
                    return isStatus ? (
                      <td key={h.key}><span className={`badge badge-${val === 'Approved' || val === 'Processed' ? 'approved' : 'pending'}`}>{val}</span></td>
                    ) : <td key={h.key}>{val}</td>;
                  })}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={headers.length} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-light)' }}>
                    No records for the selected report / filters.
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
