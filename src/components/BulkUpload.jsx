import React from 'react';
import { Download, Upload, FileSpreadsheet } from 'lucide-react';
import { downloadExcelTemplate } from '../utils/exporters';
import { statusText } from '../i18n';

const templateHeaders = [
  'Name', 'MemberNo', 'Mobile', 'AltMobile', 'DistrictCode', 'SocietyId',
  'KYCType', 'KYCNumber', 'BankName', 'BankAccount', 'BankIfsc', 'CattleCount', 'MilkSupplyAvg'
];
const sampleRows = [
  ['Sample Farmer', '3045', '9447551234', '', 'TVM', 'SOC101', 'Aadhaar', '1234-5678-9012', 'State Bank of India', '30245123987', 'SBIN0007890', 4, 22.5]
];

export default function BulkUpload({
  uploadFile, handleBulkUploadSimulate, handleSubmitBatch, bulkPreview, t, lang
}) {
  const ui = lang === 'ml' ? {
    subtitle: 'സ്റ്റാൻഡേർഡ് ടെംപ്ലേറ്റുകൾ ഡൗൺലോഡ് ചെയ്ത് കർഷക രേഖകളുടെ ബാച്ചുകൾ അപ്ലോഡ് ചെയ്യുക.',
    downloadTemplate: 'ടെംപ്ലേറ്റ് ഡൗൺലോഡ് ചെയ്യുക',
    dragDrop: 'എക്സൽ ഫയൽ വലിച്ചിടുക',
    formatsSupported: '.xlsx, .xls ഫോർമാറ്റുകൾ മാത്രം പിന്തുണയ്ക്കുന്നു',
    recordsFound: 'രേഖകൾ കണ്ടെത്തി',
    processImport: 'പ്രോസസ്സ് ചെയ്ത് ഇറക്കുമതി ചെയ്യുക',
    uploadPreview: 'അപ്ലോഡ് പ്രിവ്യൂവും പരിശോധന പിഴവുകളും',
    row: 'വരി',
    name: 'പേര്',
    memberNo: 'അംഗ നമ്പർ',
    mobile: 'മൊബൈൽ',
    verification: 'പരിശോധന',
    errorDetails: 'പിഴവ് വിവരങ്ങൾ',
    passedChecks: 'പരിശോധന കടന്നു',
  } : {
    subtitle: 'Download standard templates and upload batches of farmer records.',
    downloadTemplate: 'Download Template',
    dragDrop: 'Drag & Drop Excel File',
    formatsSupported: 'Only .xlsx and .xls formats supported',
    recordsFound: 'records found',
    processImport: 'Process & Import',
    uploadPreview: 'Upload Preview & Validation Errors',
    row: 'Row',
    name: 'Name',
    memberNo: 'Member No',
    mobile: 'Mobile',
    verification: 'Verification',
    errorDetails: 'Error Details',
    passedChecks: 'Passed checks',
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('bulkUpload')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <button className="btn btn-secondary" onClick={() => downloadExcelTemplate('farmer-bulk-upload-template', templateHeaders, sampleRows)}>
          <Download size={16}/> {ui.downloadTemplate}
        </button>
      </div>

      <div className="card-section" style={{padding: '30px', textAlign: 'center'}}>
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
          <div className="file-upload-box" style={{marginBottom: '20px'}}>
            <FileSpreadsheet size={40} style={{color: 'var(--primary-color)', marginBottom: '12px'}}/>
            <p style={{fontWeight: '600', marginBottom: '4px'}}>{ui.dragDrop}</p>
            <p style={{fontSize: '12px', color: 'var(--text-light)'}}>{ui.formatsSupported}</p>
            <input type="file" accept=".xlsx,.xls" onChange={handleBulkUploadSimulate} style={{marginTop: '16px'}} />
          </div>

          {uploadFile && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <span style={{fontSize: '13px', fontWeight: '600'}}>{uploadFile.name} (4 {ui.recordsFound})</span>
                <button className="btn btn-primary" onClick={handleSubmitBatch}>{ui.processImport}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {bulkPreview.length > 0 && (
        <div className="card-section">
          <div className="card-section-header">
            <span className="card-section-title">{ui.uploadPreview}</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr>
                  <th>{ui.row}</th>
                  <th>{ui.name}</th>
                  <th>{ui.memberNo}</th>
                  <th>{ui.mobile}</th>
                  <th>{ui.verification}</th>
                  <th>{ui.errorDetails}</th>
                </tr>
              </thead>
              <tbody>
                {bulkPreview.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.row}</td>
                    <td>{row.name}</td>
                    <td>{row.memberNo}</td>
                    <td>{row.mobile}</td>
                    <td>
                      <span className={`badge badge-${row.status === 'Valid' ? 'approved' : row.status === 'Duplicate' ? 'pending' : 'rejected'}`}>
                        {statusText(lang, row.status)}
                      </span>
                    </td>
                    <td style={{color: row.error ? '#ef4444' : '#10b981', fontSize: '12px'}}>{row.error || ui.passedChecks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
