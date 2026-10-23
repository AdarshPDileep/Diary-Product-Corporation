import React from 'react';
import { Plus } from 'lucide-react';
import { statusText } from '../i18n';

export default function Helpdesk({ tickets, setIsNewTicketOpen, lang }) {
  const ui = lang === 'ml' ? {
    title: 'ഹെൽപ്പ്ഡെസ്ക് & പിന്തുണാ ടിക്കറ്റുകൾ',
    subtitle: 'ബഗ് രേഖകൾ, സിസ്റ്റം പ്രശ്നങ്ങൾ അല്ലെങ്കിൽ ലേഔട്ട് ചോദ്യങ്ങൾ രജിസ്റ്റർ ചെയ്യുക.',
    raiseTicket: 'ടിക്കറ്റ് രജിസ്റ്റർ ചെയ്യുക',
    ticketNo: 'ടിക്കറ്റ് നമ്പർ',
    module: 'മോഡ്യൂൾ',
    category: 'വിഭാഗം',
    subject: 'വിഷയം',
    status: 'നില',
    createdDate: 'സൃഷ്ടിച്ച തീയതി'
  } : {
    title: 'Helpdesk and support',
    subtitle: 'Log bugs, system issues, or access questions for the support team.',
    raiseTicket: 'Raise ticket',
    ticketNo: 'Ticket no.',
    module: 'Module',
    category: 'Category',
    subject: 'Subject',
    status: 'Status',
    createdDate: 'Created'
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{ui.title}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn btn-primary" onClick={() => setIsNewTicketOpen(true)}>
            <Plus size={16} /> {ui.raiseTicket}
          </button>
        </div>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.ticketNo}</th>
                <th>{ui.module}</th>
                <th>{ui.category}</th>
                <th>{ui.subject}</th>
                <th>{ui.status}</th>
                <th>{ui.createdDate}</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((tkt) => (
                <tr key={tkt.id}>
                  <td><span className="cell-mono">{tkt.ticketNo}</span></td>
                  <td>{tkt.module}</td>
                  <td>{tkt.category}</td>
                  <td>{tkt.subject}</td>
                  <td><span className="badge badge-pending">{statusText(lang, tkt.status)}</span></td>
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
