import React from 'react';
import { Search, ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { statusText } from '../i18n';

export default function SubmitApp({
  appStep, setAppStep, schemes, newApp, handleSelectScheme, handleSelectFarmerForApp,
  farmers, farmerSearch, setFarmerSearch, handleRunEligibilityCheck, handleSaveAppDetails,
  handleDocUploadForApp, handleAppSubmit, t, lang
}) {
  const ui = lang === 'ml' ? {
    newAppDesc: 'പുതിയ കർഷക അപേക്ഷ സൃഷ്ടിക്കുക',
    step: 'ഘട്ടം',
    selectScheme: 'സജീവമായ പദ്ധതി തിരഞ്ഞെടുക്കുക',
    max: 'പരമാവധി',
    chooseFarmer: 'രജിസ്റ്റർ ചെയ്ത കർഷകനെ തിരഞ്ഞെടുക്കുക',
    searchFarmerPlaceholder: 'കർഷകന്റെ പേര് അല്ലെങ്കിൽ ID ടൈപ്പ് ചെയ്യുക...',
    cattle: 'കന്നുകാലി',
    supply: 'വിതരണം',
    day: 'ദിവസം',
    verificationPrecheck: 'പരിശോധനയും നിയമങ്ങളും മുൻപരിശോധന',
    farmerMasterStatus: 'കർഷക മാസ്റ്റർ രേഖ നില:',
    panchayatVerification: 'പഞ്ചായത്ത് ഭൂരേഖ പരിശോധന:',
    match: 'പൊരുത്തം',
    back: 'തിരികെ',
    checkEligibility: 'യോഗ്യത പരിശോധിക്കുക',
    customDetails: 'പദ്ധതിയുടെ ഇഷ്ടാനുസൃത വിശദാംശങ്ങൾ നൽകുക',
    purchasedQty: 'വാങ്ങിയ അളവ് (സഞ്ചികൾ)',
    egQty: 'ഉദാ. 10',
    purchaseBillNo: 'വാങ്ങൽ ബിൽ നമ്പർ',
    egBill: 'ഉദാ. B-8877/26',
    nextStep: 'അടുത്ത ഘട്ടം',
    uploadDocs: 'പദ്ധതി പരിശോധന രേഖകൾ അപ്ലോഡ് ചെയ്യുക',
    milkSupplyCert: 'പാൽ വിതരണ സർട്ടിഫിക്കറ്റ് (PDF)',
    required: 'ആവശ്യമാണ്',
    chooseFile: 'ഫയൽ തിരഞ്ഞെടുക്കുക',
    feedBill: 'തീറ്റ വാങ്ങൽ ബിൽ (JPG/PNG/PDF)',
    confirmDocs: 'രേഖകൾ ഉറപ്പാക്കുക',
    previewDeclaration: 'പ്രിവ്യൂവും പ്രഖ്യാപനവും',
    applicant: 'അപേക്ഷകൻ',
    scheme: 'പദ്ധതി',
    estimateBenefit: 'ഏകദേശ നേട്ടം',
    declarationText: 'സമർപ്പിച്ച എല്ലാ വിശദാംശങ്ങളും അപ്ലോഡ് ചെയ്ത രസീതുകളും യഥാർത്ഥ ഇടപാട് രേഖകളുമായി പൊരുത്തപ്പെടുന്നു എന്ന് ഞാൻ ഇതിനാൽ പ്രഖ്യാപിക്കുന്നു.',
    submitApp: 'അപേക്ഷ സമർപ്പിക്കുക'
  } : {
    newAppDesc: 'Create a new farmer application',
    step: 'Step',
    selectScheme: 'Select Active Scheme',
    max: 'Max',
    chooseFarmer: 'Choose Registered Farmer',
    searchFarmerPlaceholder: 'Type farmer name or ID...',
    cattle: 'Cattle',
    supply: 'Supply',
    day: 'day',
    verificationPrecheck: 'Verification & Rules Pre-Check',
    farmerMasterStatus: 'Farmer Master Record status:',
    panchayatVerification: 'Panchayat Land Records verification:',
    match: 'Match',
    back: 'Back',
    checkEligibility: 'Check Eligibility',
    customDetails: 'Enter Scheme Custom Details',
    purchasedQty: 'Purchased Quantity (Bags)',
    egQty: 'e.g. 10',
    purchaseBillNo: 'Purchase Bill No',
    egBill: 'e.g. B-8877/26',
    nextStep: 'Next Step',
    uploadDocs: 'Upload Scheme Verification Documents',
    milkSupplyCert: 'Milk Supply Certificate (PDF)',
    required: 'Required',
    chooseFile: 'Choose file',
    feedBill: 'Feed Purchase Bill (JPG/PNG/PDF)',
    confirmDocs: 'Confirm Docs',
    previewDeclaration: 'Preview and Declaration',
    applicant: 'Applicant',
    scheme: 'Scheme',
    estimateBenefit: 'Estimate Benefit',
    declarationText: 'I hereby declare that all submitted details and uploaded receipts match authentic transaction records.',
    submitApp: 'Submit Application'
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('submitApp')}</h1>
          <p>{ui.newAppDesc} ({ui.step} {appStep} / 6).</p>
        </div>
      </div>

      <div className="card-section" style={{padding: '24px'}}>

        {/* Step 1: Scheme Selector */}
        {appStep === 1 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>{ui.step} 1: {ui.selectScheme}</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {schemes.map(sch => (
                <div key={sch.code} className="list-item" style={{cursor: 'pointer'}} onClick={() => handleSelectScheme(sch.code)}>
                  <div>
                    <div style={{fontWeight: '600'}}>{sch.name}</div>
                    <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>{sch.description}</div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <span style={{fontSize: '13px', fontWeight: '700'}}>{ui.max}: ₹{sch.maxBenefitAmount}</span>
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
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>{ui.step} 2: {ui.chooseFarmer}</h3>
            <div style={{marginBottom: '20px'}} className="nav-search">
              <Search size={16}/>
              <input type="text" placeholder={ui.searchFarmerPlaceholder} value={farmerSearch} onChange={e => setFarmerSearch(e.target.value)} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {farmers
                .filter(f => f.name.toLowerCase().includes(farmerSearch.toLowerCase()) || f.farmerId.includes(farmerSearch))
                .map(f => (
                  <div key={f.id} className="list-item" style={{cursor: 'pointer'}} onClick={() => handleSelectFarmerForApp(f.farmerId)}>
                    <div>
                      <div style={{fontWeight: '600'}}>{f.name} ({f.farmerId})</div>
                      <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>{ui.cattle}: {f.cattleCount} | {ui.supply}: {f.milkSupplyAvg}L/{ui.day}</div>
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
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>{ui.step} 3: {ui.verificationPrecheck}</h3>
            <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px'}}>
              <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px'}}>
                <CheckCircle size={16} style={{color: '#10b981'}}/>
                <span style={{fontSize: '13px'}}>{ui.farmerMasterStatus} {statusText(lang, 'Active')}</span>
              </div>
              <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                <CheckCircle size={16} style={{color: '#10b981'}}/>
                <span style={{fontSize: '13px'}}>{ui.panchayatVerification} {ui.match}</span>
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(2)}>{ui.back}</button>
              <button className="btn btn-primary" onClick={handleRunEligibilityCheck}>{ui.checkEligibility}</button>
            </div>
          </div>
        )}

        {/* Step 4: Custom Fields Entry */}
        {appStep === 4 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>{ui.step} 4: {ui.customDetails}</h3>
            <div className="form-grid" style={{padding: '0 0 20px 0'}}>
              <div className="form-group">
                <label>{ui.purchasedQty}</label>
                <input type="number" className="form-input" placeholder={ui.egQty} defaultValue={10} />
              </div>
              <div className="form-group">
                <label>{ui.purchaseBillNo}</label>
                <input type="text" className="form-input" placeholder={ui.egBill} />
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(3)}>{ui.back}</button>
              <button className="btn btn-primary" onClick={() => handleSaveAppDetails({ feedQty: '10', billNo: 'B-8877/26' })}>{ui.nextStep}</button>
            </div>
          </div>
        )}

        {/* Step 5: Document Uploads */}
        {appStep === 5 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>{ui.step} 5: {ui.uploadDocs}</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: '8px'}}>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px'}}>{ui.milkSupplyCert}</div>
                  <div style={{fontSize: '11px', color: 'var(--text-light)'}}>{ui.required}</div>
                </div>
                <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>{ui.chooseFile}</button>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: '8px'}}>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px'}}>{ui.feedBill}</div>
                  <div style={{fontSize: '11px', color: 'var(--text-light)'}}>{ui.required}</div>
                </div>
                <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>{ui.chooseFile}</button>
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(4)}>{ui.back}</button>
              <button className="btn btn-primary" onClick={() => handleDocUploadForApp({ uploaded: true })}>{ui.confirmDocs}</button>
            </div>
          </div>
        )}

        {/* Step 6: Submit */}
        {appStep === 6 && (
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>{ui.step} 6: {ui.previewDeclaration}</h3>
            <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px', fontSize: '13px'}}>
              <p style={{marginBottom: '8px'}}><strong>{ui.applicant}:</strong> Radhakrishnan Nair</p>
              <p style={{marginBottom: '8px'}}><strong>{ui.scheme}:</strong> Cattle Feed Subsidy Scheme 2026</p>
              <p style={{marginBottom: '12px'}}><strong>{ui.estimateBenefit}:</strong> ₹7,500</p>
              <label style={{display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: '500'}}>
                <input type="checkbox" defaultChecked />
                {ui.declarationText}
              </label>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" onClick={() => setAppStep(5)}>{ui.back}</button>
              <button className="btn btn-primary" onClick={handleAppSubmit}>{ui.submitApp}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
