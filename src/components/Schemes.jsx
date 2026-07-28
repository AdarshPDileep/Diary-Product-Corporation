import React from 'react';
import { Plus } from 'lucide-react';

export default function Schemes({ schemes, onCreateScheme, t }) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('schemes')}</h1>
          <p>Create, version, and set budgets for milk cooperative welfare schemes.</p>
        </div>
        <button className="btn btn-primary" onClick={onCreateScheme}>
          <Plus size={16}/> Create Scheme
        </button>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Scheme Code</th>
                <th>Name</th>
                <th>Year</th>
                <th>Max Benefit</th>
                <th>Allocated Budget</th>
                <th>Utilized Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map(sch => (
                <tr key={sch.code}>
                  <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{sch.code}</span></td>
                  <td>
                    <div>{sch.name}</div>
                    <div style={{fontSize: '11px', color: 'var(--text-light)'}}>{sch.nameMl}</div>
                  </td>
                  <td>{sch.schemeYear}</td>
                  <td>₹{sch.maxBenefitAmount.toLocaleString()}</td>
                  <td>₹{sch.budgetAllocation.toLocaleString()}</td>
                  <td>₹{sch.utilizedBudget.toLocaleString()}</td>
                  <td><span className="badge badge-approved">{sch.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
