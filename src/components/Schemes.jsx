import React, { useState } from 'react';
import { Plus, Eye, Pencil } from 'lucide-react';
import { statusText } from '../i18n';
import ModalPortal from './ModalPortal';

function schemeToForm(scheme) {
  return {
    name: scheme.name,
    nameMl: scheme.nameMl || '',
    type: scheme.type || 'Subsidy',
    schemeYear: scheme.schemeYear || scheme.financialYear || '2026-27',
    openDate: scheme.openDate || '',
    closeDate: scheme.closeDate || '',
    maxBenefitAmount: scheme.maxBenefitAmount ?? 0,
    budgetAllocation: scheme.budgetAllocation ?? 0,
    beneficiaryType: scheme.beneficiaryType || '',
    requiredDocs: (scheme.requiredDocs || []).join(', '),
    minCattle: scheme.eligibility?.minCattle ?? 0,
    minMilkSupply: scheme.eligibility?.minMilkSupply ?? 0,
    description: scheme.description || scheme.objective || ''
  };
}

export default function Schemes({ schemes, onCreateScheme, onUpdateScheme, t, lang }) {
  const [viewScheme, setViewScheme] = useState(null);
  const [editCode, setEditCode] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const ui = lang === 'ml' ? {
    subtitle: 'പാൽ സഹകരണ ക്ഷേമ പദ്ധതികൾ സൃഷ്ടിക്കുക, പതിപ്പുകൾ നിശ്ചയിക്കുക, ബഡ്ജറ്റ് ക്രമീകരിക്കുക.',
    createScheme: 'പദ്ധതി സൃഷ്ടിക്കുക',
    schemeCode: 'പദ്ധതി കോഡ്',
    name: 'പേര്',
    year: 'വർഷം',
    maxBenefit: 'പരമാവധി ആനുകൂല്യം',
    allocatedBudget: 'വകയിരുത്തിയ ബഡ്ജറ്റ്',
    utilizedBudget: 'ഉപയോഗിച്ച ബഡ്ജറ്റ്',
    status: 'നില',
    actions: 'നടപടി',
    view: 'കാണുക',
    edit: 'തിരുത്തുക',
    viewTitle: 'പദ്ധതി വിശദാംശങ്ങൾ',
    editTitle: 'പദ്ധതി തിരുത്തുക',
    save: 'മാറ്റങ്ങൾ സേവ് ചെയ്യുക',
    close: 'അടയ്ക്കുക',
    type: 'തരം',
    dates: 'തുറക്കുന്ന / അവസാനിക്കുന്ന തീയതി',
    beneficiary: 'ഗുണഭോക്താവ്',
    docs: 'ആവശ്യമായ രേഖകൾ',
    eligibility: 'യോഗ്യത',
    districts: 'ജില്ലകൾ',
    version: 'പതിപ്പ്',
    fields: 'ഇഷ്ടാനുസൃത ഫീൽഡുകൾ',
    checklist: 'ചെക്ക്‌ലിസ്റ്റ്'
  } : {
    subtitle: 'Create, version, and set budgets for milk cooperative welfare schemes.',
    createScheme: 'Create Scheme',
    schemeCode: 'Scheme Code',
    name: 'Name',
    year: 'Year',
    maxBenefit: 'Max Benefit',
    allocatedBudget: 'Allocated Budget',
    utilizedBudget: 'Utilized Budget',
    status: 'Status',
    actions: 'Actions',
    view: 'View',
    edit: 'Edit',
    viewTitle: 'Scheme details',
    editTitle: 'Edit scheme',
    save: 'Save changes',
    close: 'Close',
    type: 'Type',
    dates: 'Open / close dates',
    beneficiary: 'Beneficiary',
    docs: 'Required documents',
    eligibility: 'Eligibility',
    districts: 'Districts',
    version: 'Version',
    fields: 'Custom fields',
    checklist: 'Verification checklist'
  };

  const openEdit = (sch) => {
    setEditCode(sch.code);
    setEditForm(schemeToForm(sch));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const original = schemes.find((s) => s.code === editCode);
    if (!original || !editForm) return;
    onUpdateScheme({
      ...original,
      name: editForm.name.trim(),
      nameMl: editForm.nameMl.trim() || editForm.name.trim(),
      type: editForm.type,
      schemeYear: editForm.schemeYear,
      financialYear: editForm.schemeYear,
      openDate: editForm.openDate,
      closeDate: editForm.closeDate,
      maxBenefitAmount: Number(editForm.maxBenefitAmount) || 0,
      budgetAllocation: Number(editForm.budgetAllocation) || 0,
      beneficiaryType: editForm.beneficiaryType,
      description: editForm.description,
      requiredDocs: editForm.requiredDocs.split(',').map((d) => d.trim()).filter(Boolean),
      eligibility: {
        ...original.eligibility,
        minCattle: Number(editForm.minCattle) || 0,
        minMilkSupply: Number(editForm.minMilkSupply) || 0
      }
    });
    setEditCode(null);
    setEditForm(null);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('schemes')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn btn-primary" onClick={onCreateScheme}>
            <Plus size={16} /> {ui.createScheme}
          </button>
        </div>
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
                <th>{ui.actions}</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((sch) => (
                <tr key={sch.code}>
                  <td><span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{sch.code}</span></td>
                  <td>
                    <div>{sch.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{sch.nameMl}</div>
                  </td>
                  <td>{sch.schemeYear}</td>
                  <td>₹{sch.maxBenefitAmount.toLocaleString()}</td>
                  <td>₹{sch.budgetAllocation.toLocaleString()}</td>
                  <td>₹{sch.utilizedBudget.toLocaleString()}</td>
                  <td><span className="badge badge-approved">{statusText(lang, sch.status)}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button type="button" className="btn btn-secondary role-perm-action-btn" onClick={() => setViewScheme(sch)}>
                        <Eye size={14} /> {ui.view}
                      </button>
                      <button type="button" className="btn btn-secondary role-perm-action-btn" onClick={() => openEdit(sch)}>
                        <Pencil size={14} /> {ui.edit}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewScheme && (
        <ModalPortal>
        <div className="modal-overlay" onClick={() => setViewScheme(null)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: '700', fontSize: '17px' }}>{ui.viewTitle}: {viewScheme.code}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{viewScheme.name}</p>
              </div>
              <button type="button" onClick={() => setViewScheme(null)} className="doc-preview-close" aria-label={ui.close}>×</button>
            </div>
            <div className="modal-body scheme-detail-body">
              <dl className="scheme-detail-dl">
                <div><dt>{ui.name}</dt><dd>{viewScheme.name} {viewScheme.nameMl ? `(${viewScheme.nameMl})` : ''}</dd></div>
                <div><dt>{ui.type}</dt><dd>{viewScheme.type}</dd></div>
                <div><dt>{ui.version}</dt><dd>{viewScheme.version}</dd></div>
                <div><dt>{ui.dates}</dt><dd>{viewScheme.openDate} → {viewScheme.closeDate}</dd></div>
                <div><dt>{ui.beneficiary}</dt><dd>{viewScheme.beneficiaryType}</dd></div>
                <div><dt>{ui.maxBenefit}</dt><dd>₹{viewScheme.maxBenefitAmount.toLocaleString()}</dd></div>
                <div><dt>{ui.allocatedBudget}</dt><dd>₹{viewScheme.budgetAllocation.toLocaleString()}</dd></div>
                <div><dt>{ui.utilizedBudget}</dt><dd>₹{viewScheme.utilizedBudget.toLocaleString()}</dd></div>
                <div><dt>{ui.districts}</dt><dd>{(viewScheme.applicableDistricts || []).join(', ')}</dd></div>
                <div><dt>{ui.eligibility}</dt><dd>{viewScheme.eligibility?.minCattle} cattle · {viewScheme.eligibility?.minMilkSupply} L/day min supply</dd></div>
                <div><dt>{ui.docs}</dt><dd>{(viewScheme.requiredDocs || []).join(', ')}</dd></div>
              </dl>
              {viewScheme.description && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>{viewScheme.description}</p>
              )}
              {(viewScheme.fields?.length > 0) && (
                <>
                  <h4 className="scheme-detail-section">{ui.fields}</h4>
                  <ul className="scheme-detail-list">
                    {viewScheme.fields.map((f) => (
                      <li key={f.key}>{f.label} ({f.type}){f.mandatory ? ' *' : ''}</li>
                    ))}
                  </ul>
                </>
              )}
              {(viewScheme.checklist?.length > 0) && (
                <>
                  <h4 className="scheme-detail-section">{ui.checklist}</h4>
                  <ul className="scheme-detail-list">
                    {viewScheme.checklist.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setViewScheme(null)}>{ui.close}</button>
              <button type="button" className="btn btn-primary" onClick={() => { setViewScheme(null); openEdit(viewScheme); }}>{ui.edit}</button>
            </div>
          </div>
        </div>
        </ModalPortal>
      )}

      {editCode && editForm && (
        <ModalPortal>
        <div className="modal-overlay">
          <form className="modal-content" style={{ maxWidth: '720px' }} onSubmit={saveEdit}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: '700', fontSize: '17px' }}>{ui.editTitle}: {editCode}</h3>
              </div>
              <button type="button" onClick={() => { setEditCode(null); setEditForm(null); }} className="doc-preview-close" aria-label={ui.close}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ padding: 0 }}>
                <div className="form-group">
                  <label>{ui.name} (EN)</label>
                  <input className="form-input" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>{ui.name} (ML)</label>
                  <input className="form-input" value={editForm.nameMl} onChange={(e) => setEditForm({ ...editForm, nameMl: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{ui.type}</label>
                  <input className="form-input" value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{ui.year}</label>
                  <input className="form-input" value={editForm.schemeYear} onChange={(e) => setEditForm({ ...editForm, schemeYear: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{t('openDate')}</label>
                  <input type="date" className="form-input" value={editForm.openDate} onChange={(e) => setEditForm({ ...editForm, openDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{t('closeDate')}</label>
                  <input type="date" className="form-input" value={editForm.closeDate} onChange={(e) => setEditForm({ ...editForm, closeDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{ui.maxBenefit}</label>
                  <input type="number" className="form-input" value={editForm.maxBenefitAmount} onChange={(e) => setEditForm({ ...editForm, maxBenefitAmount: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{ui.allocatedBudget}</label>
                  <input type="number" className="form-input" value={editForm.budgetAllocation} onChange={(e) => setEditForm({ ...editForm, budgetAllocation: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{ui.beneficiary}</label>
                  <input className="form-input" value={editForm.beneficiaryType} onChange={(e) => setEditForm({ ...editForm, beneficiaryType: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>{ui.docs}</label>
                  <input className="form-input" value={editForm.requiredDocs} onChange={(e) => setEditForm({ ...editForm, requiredDocs: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{t('minCattleCount')}</label>
                  <input type="number" className="form-input" value={editForm.minCattle} onChange={(e) => setEditForm({ ...editForm, minCattle: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>{t('minMilkSupply')}</label>
                  <input type="number" className="form-input" value={editForm.minMilkSupply} onChange={(e) => setEditForm({ ...editForm, minMilkSupply: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>{t('descriptionObjective')}</label>
                  <textarea className="form-textarea" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => { setEditCode(null); setEditForm(null); }}>{ui.close}</button>
              <button type="submit" className="btn btn-primary">{ui.save}</button>
            </div>
          </form>
        </div>
        </ModalPortal>
      )}
    </div>
  );
}
