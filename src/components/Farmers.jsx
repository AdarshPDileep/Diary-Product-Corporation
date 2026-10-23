import React from 'react';
import { Plus, Search, Eye, Pencil } from 'lucide-react';
import { initialDistricts } from '../mockData';
import { statusText } from '../i18n';

export default function Farmers({
  farmers, farmerSearch, setFarmerSearch, farmerDistrictFilter, setFarmerDistrictFilter,
  setSelectedFarmer, handleRequestModifyFarmer, setIsNewFarmerOpen, t, lang
}) {
  const ui = lang === 'ml' ? {
    subtitle: 'അദ്വിതീയമായ പാൽ ഉത്പാദക രേഖകൾ കാണുക, തിരുത്തുക, രജിസ്റ്റർ ചെയ്യുക.',
    registerFarmer: 'കർഷകനെ രജിസ്റ്റർ ചെയ്യുക',
    searchPlaceholder: 'പേര്, ഐഡി അല്ലെങ്കിൽ മൊബൈൽ വഴി തിരയുക...',
    allDistricts: 'എല്ലാ ജില്ലകളും',
    farmerId: 'കർഷക ഐഡി',
    name: 'പേര്',
    mobile: 'മൊബൈൽ',
    cattleCount: 'കന്നുകാലി എണ്ണം',
    society: 'സഹകരണ സംഘം',
    kycStatus: 'KYC നില',
    recordStatus: 'രേഖ നില',
    actions: 'നടപടികൾ',
    view: 'കാണുക',
    edit: 'തിരുത്തുക',
    enterCattleCount: 'പുതുക്കിയ കന്നുകാലി എണ്ണം നൽകുക:',
  } : {
    subtitle: 'View, modify, and register unique milk producer records.',
    registerFarmer: 'Register farmer',
    searchPlaceholder: 'Search by name, ID, or mobile...',
    allDistricts: 'All districts',
    farmerId: 'Farmer ID',
    name: 'Name',
    mobile: 'Mobile',
    cattleCount: 'Cattle count',
    society: 'Society',
    kycStatus: 'KYC status',
    recordStatus: 'Record status',
    actions: 'Actions',
    view: 'View',
    edit: 'Edit',
    enterCattleCount: 'Enter revised cattle count:',
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('farmers')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn btn-primary" onClick={() => setIsNewFarmerOpen(true)}>
            <Plus size={16} /> {ui.registerFarmer}
          </button>
        </div>
      </div>

      <div className="card-section">
        <div className="filter-bar">
          <div className="nav-search">
            <Search size={16} aria-hidden />
            <input
              type="search"
              placeholder={ui.searchPlaceholder}
              value={farmerSearch}
              onChange={(e) => setFarmerSearch(e.target.value)}
              aria-label={ui.searchPlaceholder}
            />
          </div>
          <select
            className="form-input form-select"
            value={farmerDistrictFilter}
            onChange={(e) => setFarmerDistrictFilter(e.target.value)}
            aria-label={ui.allDistricts}
          >
            <option value="">{ui.allDistricts}</option>
            {initialDistricts.map((d) => (
              <option key={d.code} value={d.code}>{lang === 'ml' ? d.nameMl : d.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>{ui.farmerId}</th>
                <th>{ui.name}</th>
                <th>{ui.mobile}</th>
                <th>{ui.cattleCount}</th>
                <th>{ui.society}</th>
                <th>{ui.kycStatus}</th>
                <th>{ui.recordStatus}</th>
                <th>{ui.actions}</th>
              </tr>
            </thead>
            <tbody>
              {farmers
                .filter((f) => f.name.toLowerCase().includes(farmerSearch.toLowerCase()) || f.farmerId.includes(farmerSearch))
                .filter((f) => !farmerDistrictFilter || f.district === farmerDistrictFilter)
                .map((farmer) => (
                  <tr key={farmer.id}>
                    <td><span className="cell-mono">{farmer.farmerId}</span></td>
                    <td>
                      <div>{farmer.name}</div>
                      <div className="cell-sub">{farmer.nameMl}</div>
                    </td>
                    <td>{farmer.mobile}</td>
                    <td>{farmer.cattleCount}</td>
                    <td>{farmer.societyId}</td>
                    <td><span className={`badge badge-${farmer.kycStatus === 'Verified' ? 'approved' : 'pending'}`}>{statusText(lang, farmer.kycStatus)}</span></td>
                    <td><span className={`badge badge-${farmer.status === 'Approved' ? 'approved' : farmer.status.includes('Pending') ? 'pending' : 'returned'}`}>{statusText(lang, farmer.status)}</span></td>
                    <td>
                      <div className="table-action-group">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelectedFarmer(farmer)}>
                          <Eye size={14} /> {ui.view}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            const newCattle = prompt(ui.enterCattleCount, farmer.cattleCount);
                            if (newCattle) handleRequestModifyFarmer(farmer.id, 'cattleCount', parseInt(newCattle, 10));
                          }}
                        >
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
    </div>
  );
}
