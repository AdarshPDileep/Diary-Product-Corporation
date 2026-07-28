import React from 'react';
import { Search, ArrowRight, CheckCircle, Plus } from 'lucide-react';

export default function SubmitApp({
  appStep, setAppStep, schemes, newApp, handleSelectScheme, handleSelectFarmerForApp,
  farmers, farmerSearch, setFarmerSearch, handleRunEligibilityCheck, handleSaveAppDetails,
  handleDocUploadForApp, handleAppSubmit, t
}) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('submitApp')}</h1>
          <p>Create a new farmer application (Step {appStep} of 6).</p>
        </div>
      </div>

      <div className="card-section" style={{padding: '24px'}}>
        
        {/* Step 1: Scheme Selector */}
        {appStep === 1 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Step 1: Select Active Scheme</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {schemes.map(sch => (
                <div key={sch.code} className="list-item" style={{cursor: 'pointer'}} onClick={() => handleSelectScheme(sch.code)}>
                  <div>
                    <div style={{fontWeight: '600'}}>{sch.name}</div>
                    <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>{sch.description}</div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <span style={{fontSize: '13px', fontWeight: '700'}}>Max: ₹{sch.maxBenefitAmount}</span>
                    <ArrowRight size={16} style={{color: 'var(--primary-color)'}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Farmer search */}
        {appStep === 2 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Step 2: Choose Registered Farmer</h3>
            <div style={{marginBottom: '20px'}} className="nav-search">
              <Search size={16}/>
              <input type="text" placeholder="Type farmer name or ID..." value={farmerSearch} onChange={e => setFarmerSearch(e.target.value)} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {farmers
                .filter(f => f.name.toLowerCase().includes(farmerSearch.toLowerCase()) || f.farmerId.includes(farmerSearch))
                .map(f => (
                  <div key={f.id} className="list-item" style={{cursor: 'pointer'}} onClick={() => handleSelectFarmerForApp(f.farmerId)}>
                    <div>
                      <div style={{fontWeight: '600'}}>{f.name} ({f.farmerId})</div>
                      <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>Cattle: {f.cattleCount} | Supply: {f.milkSupplyAvg}L/day</div>
                    </div>
                    <ArrowRight size={16} style={{color: 'var(--primary-color)'}}/>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 3: Eligibility checks */}
        {appStep === 3 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Step 3: Verification & Rules Pre-Check</h3>
            <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px'}}>
              <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px'}}>
                <CheckCircle size={16} style={{color: '#10b981'}}/>
                <span style={{fontSize: '13px'}}>Farmer Master Record status: Active</span>
              </div>
              <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                <CheckCircle size={16} style={{color: '#10b981'}}/>
                <span style={{fontSize: '13px'}}>Panchayat Land Records verification: Match</span>
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(2)}>Back</button>
              <button className="btn btn-primary" onClick={handleRunEligibilityCheck}>Check Eligibility</button>
            </div>
          </div>
        )}

        {/* Step 4: Custom Fields Entry */}
        {appStep === 4 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Step 4: Enter Scheme Custom Details</h3>
            <div className="form-grid" style={{padding: '0 0 20px 0'}}>
              <div className="form-group">
                <label>Purchased Quantity (Bags)</label>
                <input type="number" className="form-input" placeholder="e.g. 10" defaultValue={10} />
              </div>
              <div className="form-group">
                <label>Purchase Bill No</label>
                <input type="text" className="form-input" placeholder="e.g. B-8877/26" />
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(3)}>Back</button>
              <button className="btn btn-primary" onClick={() => handleSaveAppDetails({ feedQty: '10', billNo: 'B-8877/26' })}>Next Step</button>
            </div>
          </div>
        )}

        {/* Step 5: Document Uploads */}
        {appStep === 5 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Step 5: Upload Scheme Verification Documents</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: '8px'}}>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px'}}>Milk Supply Certificate (PDF)</div>
                  <div style={{fontSize: '11px', color: 'var(--text-light)'}}>Required</div>
                </div>
                <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>Choose file</button>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: '8px'}}>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px'}}>Feed Purchase Bill (JPG/PNG/PDF)</div>
                  <div style={{fontSize: '11px', color: 'var(--text-light)'}}>Required</div>
                </div>
                <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>Choose file</button>
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(4)}>Back</button>
              <button className="btn btn-primary" onClick={() => handleDocUploadForApp({ uploaded: true })}>Confirm Docs</button>
            </div>
          </div>
        )}

        {/* Step 6: Submit */}
        {appStep === 6 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Step 6: Preview and Declaration</h3>
            <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px', fontSize: '13px'}}>
              <p style={{marginBottom: '8px'}}><strong>Applicant:</strong> Radhakrishnan Nair</p>
              <p style={{marginBottom: '8px'}}><strong>Scheme:</strong> Cattle Feed Subsidy Scheme 2026</p>
              <p style={{marginBottom: '12px'}}><strong>Estimate Benefit:</strong> ₹7,500</p>
              <label style={{display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: '500'}}>
                <input type="checkbox" defaultChecked />
                I hereby declare that all submitted details and uploaded receipts match authentic transaction records.
              </label>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(5)}>Back</button>
              <button className="btn btn-primary" onClick={handleAppSubmit}>Submit Application</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
