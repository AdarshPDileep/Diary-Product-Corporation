import React from 'react';
import { Plus } from 'lucide-react';
import { statusText } from '../i18n';

export default function Schemes({ schemes, onCreateScheme, t, lang }) {
  const ui = lang === 'ml' ? {
    subtitle: 'പാൽ സഹകരണ ക്ഷേമ പദ്ധതികൾ സൃഷ്ടിക്കുക, പതിപ്പുകൾ നിശ്ചയിക്കുക, ബഡ്ജറ്റ് ക്രമീകരിക്കുക.',
    createScheme: 'പദ്ധതി സൃഷ്ടിക്കുക',
    schemeCode: 'പദ്ധതി കോഡ്',
    name: 'പേര്',
    year: 'വർഷം',
    maxBenefit: 'പരമാവധി ആനുകൂല്യം',
    allocatedBudget: 'വകയിരുത്തിയ ബഡ്ജറ്റ്',
    utilizedBudget: 'ഉപയോഗിച്ച ബഡ്ജറ്റ്',
    status: 'നില'
  } : {
    subtitle: 'Create, version, and set budgets for milk cooperative welfare schemes.',
    createScheme: 'Create Scheme',
    schemeCode: 'Scheme Code',
    name: 'Name',
    year: 'Year',
    maxBenefit: 'Max Benefit',
    allocatedBudget: 'Allocated Budget',
    utilizedBudget: 'Utilized Budget',
    status: 'Status'
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('schemes')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <button className="btn btn-primary" onClick={onCreateScheme}>
          <Plus size={16}/> {ui.createScheme}
        </button>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.schemeCode}</th>
                <th>{ui.name}</th>
                <th>{ui.year}</th>
                <th>{ui.maxBenefit}</th>
                <th>{ui.allocatedBudget}</th>
                <th>{ui.utilizedBudget}</th>
                <th>{ui.status}</th>
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
                  <td><span className="badge badge-approved">{statusText(lang, sch.status)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
