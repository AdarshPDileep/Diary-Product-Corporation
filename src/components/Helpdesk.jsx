import React from 'react';

export default function Helpdesk({ tickets, setIsNewTicketOpen }) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Helpdesk & Support Tickets</h1>
          <p>Submit bug logs, system issues, or layout queries.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsNewTicketOpen(true)}>
          Raise Ticket
        </button>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Ticket No</th>
                <th>Module</th>
                <th>Category</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(tkt => (
                <tr key={tkt.id}>
                  <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{tkt.ticketNo}</span></td>
                  <td>{tkt.module}</td>
                  <td>{tkt.category}</td>
                  <td>{tkt.subject}</td>
                  <td><span className="badge badge-pending">{tkt.status}</span></td>
                  <td>{tkt.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
