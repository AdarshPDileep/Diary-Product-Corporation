import React from 'react';
import { Download, Upload, FileSpreadsheet } from 'lucide-react';
import { downloadExcelTemplate } from '../utils/exporters';

const templateHeaders = [
  'Name', 'MemberNo', 'Mobile', 'AltMobile', 'DistrictCode', 'SocietyId',
  'KYCType', 'KYCNumber', 'BankName', 'BankAccount', 'BankIfsc', 'CattleCount', 'MilkSupplyAvg'
];
const sampleRows = [
  ['Sample Farmer', '3045', '9447551234', '', 'TVM', 'SOC101', 'Aadhaar', '1234-5678-9012', 'State Bank of India', '30245123987', 'SBIN0007890', 4, 22.5]
];

export default function BulkUpload({
  uploadFile, handleBulkUploadSimulate, handleSubmitBatch, bulkPreview, t
}) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('bulkUpload')}</h1>
          <p>Download standard templates and upload batches of farmer records.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => downloadExcelTemplate('farmer-bulk-upload-template', templateHeaders, sampleRows)}>
          <Download size={16}/> Download Template
        </button>
      </div>

      <div className="card-section" style={{padding: '30px', textAlign: 'center'}}>
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
          <div className="file-upload-box" style={{marginBottom: '20px'}}>
            <FileSpreadsheet size={40} style={{color: 'var(--primary-color)', marginBottom: '12px'}}/>
            <p style={{fontWeight: '600', marginBottom: '4px'}}>Drag & Drop Excel File</p>
            <p style={{fontSize: '12px', color: 'var(--text-light)'}}>Only .xlsx and .xls formats supported</p>
            <input type="file" accept=".xlsx,.xls" onChange={handleBulkUploadSimulate} style={{marginTop: '16px'}} />
          </div>
          
          {uploadFile && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <span style={{fontSize: '13px', fontWeight: '600'}}>{uploadFile.name} (4 records found)</span>
                <button className="btn btn-primary" onClick={handleSubmitBatch}>Process & Import</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {bulkPreview.length > 0 && (
        <div className="card-section">
          <div className="card-section-header">
            <span className="card-section-title">Upload Preview & Validation Errors</span>
          </div>
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Name</th>
                  <th>Member No</th>
                  <th>Mobile</th>
                  <th>Verification</th>
                  <th>Error Details</th>
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
                        {row.status}
                      </span>
                    </td>
                    <td style={{color: row.error ? '#ef4444' : '#10b981', fontSize: '12px'}}>{row.error || 'Passed checks'}</td>
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
