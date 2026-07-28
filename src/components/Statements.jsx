import React from 'react';
import { Eye } from 'lucide-react';

export default function Statements({ statements, currentRole, handleCreateStatement, setSelectedStatement }) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Consolidated Statement Processing</h1>
          <p>Generate, batch, and submit groups of verified applications to Head Office for final sanctioning.</p>
        </div>
        {currentRole === 'P&I Officer' && (
          <button className="btn btn-primary" onClick={handleCreateStatement}>
            Generate Statement
          </button>
        )}
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Statement No</th>
                <th>Scheme Name</th>
                <th>District</th>
                <th>Co-op Society</th>
                <th>Applications</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {statements.map(stmt => (
                <tr key={stmt.id}>
                  <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{stmt.stmtNo}</span></td>
                  <td>{stmt.schemeName}</td>
                  <td>{stmt.district}</td>
                  <td>{stmt.societyName}</td>
                  <td>{stmt.totalApplications} Applicants</td>
                  <td>₹{stmt.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${stmt.status === 'Approved' ? 'approved' : 'pending'}`}>
                      {stmt.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => setSelectedStatement(stmt)}>
                      <Eye size={12}/> View Statement
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
