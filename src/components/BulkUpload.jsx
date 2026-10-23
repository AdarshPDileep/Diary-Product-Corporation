import React, { useId } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
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
  const inputId = useId();

  const ui = lang === 'ml' ? {
    subtitle: 'സ്റ്റാൻഡേർഡ് ടെംപ്ലേറ്റുകൾ ഡൗൺലോഡ് ചെയ്ത് കർഷക രേഖകളുടെ ബാച്ചുകൾ അപ്ലോഡ് ചെയ്യുക.',
    downloadTemplate: 'ടെംപ്ലേറ്റ് ഡൗൺലോഡ് ചെയ്യുക',
    dragDrop: 'എക്സൽ ഫയൽ അപ്ലോഡ് ചെയ്യുക',
    formatsSupported: '.xlsx, .xls ഫോർമാറ്റുകൾ മാത്രം പിന്തുണയ്ക്കുന്നു',
    browse: 'ഫയൽ തിരഞ്ഞെടുക്കുക',
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
    downloadTemplate: 'Download template',
    dragDrop: 'Upload Excel file',
    formatsSupported: 'Supported formats: .xlsx and .xls',
    browse: 'Choose file',
    recordsFound: 'records found',
    processImport: 'Process and import',
    uploadPreview: 'Upload preview and validation',
    row: 'Row',
    name: 'Name',
    memberNo: 'Member no.',
    mobile: 'Mobile',
    verification: 'Verification',
    errorDetails: 'Error details',
    passedChecks: 'Passed checks',
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('bulkUpload')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn btn-secondary" onClick={() => downloadExcelTemplate('farmer-bulk-upload-template', templateHeaders, sampleRows)}>
            <Download size={16} /> {ui.downloadTemplate}
          </button>
        </div>
      </div>

      <div className="card-section">
        <div className="card-section-body card-section-body--center">
          <label htmlFor={inputId} className="file-upload-zone">
            <FileSpreadsheet size={44} className="file-upload-zone-icon" strokeWidth={1.5} />
            <span className="file-upload-zone-title">{ui.dragDrop}</span>
            <span className="file-upload-zone-hint">{ui.formatsSupported}</span>
            <span className="file-upload-trigger">{ui.browse}</span>
            <input
              id={inputId}
              type="file"
              accept=".xlsx,.xls"
              className="file-upload-input"
              onChange={handleBulkUploadSimulate}
            />
          </label>

          {uploadFile && (
            <div className="upload-file-bar">
              <span className="upload-file-name">{uploadFile.name} · 4 {ui.recordsFound}</span>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmitBatch}>{ui.processImport}</button>
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
                    <td className={row.error ? 'cell-error' : 'cell-success'}>{row.error || ui.passedChecks}</td>
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
