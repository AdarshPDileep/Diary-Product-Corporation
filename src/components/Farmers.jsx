import React from 'react';
import { Plus, Search, Eye } from 'lucide-react';
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
    subtitle: 'View, modify and register unique milk producer records.',
    registerFarmer: 'Register Farmer',
    searchPlaceholder: 'Search by name, ID or mobile...',
    allDistricts: 'All Districts',
    farmerId: 'Farmer ID',
    name: 'Name',
    mobile: 'Mobile',
    cattleCount: 'Cattle Count',
    society: 'Society',
    kycStatus: 'KYC Status',
    recordStatus: 'Record Status',
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
        <button className="btn btn-primary" onClick={() => setIsNewFarmerOpen(true)}>
          <Plus size={16}/> {ui.registerFarmer}
        </button>
      </div>

      <div className="card-section" style={{padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: '200px'}} className="nav-search">
          <Search size={16}/>
          <input type="text" placeholder={ui.searchPlaceholder} value={farmerSearch} onChange={e => setFarmerSearch(e.target.value)} />
        </div>
        <select className="form-select" value={farmerDistrictFilter} onChange={e => setFarmerDistrictFilter(e.target.value)}>
          <option value="">{ui.allDistricts}</option>
          {initialDistricts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
        </select>
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
                .filter(f => f.name.toLowerCase().includes(farmerSearch.toLowerCase()) || f.farmerId.includes(farmerSearch))
                .filter(f => !farmerDistrictFilter || f.district === farmerDistrictFilter)
                .map(farmer => (
                  <tr key={farmer.id}>
                    <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{farmer.farmerId}</span></td>
                    <td>
                      <div>{farmer.name}</div>
                      <div style={{fontSize: '11px', color: 'var(--text-light)'}}>{farmer.nameMl}</div>
                    </td>
                    <td>{farmer.mobile}</td>
                    <td>{farmer.cattleCount}</td>
                    <td>{farmer.societyId}</td>
                    <td><span className={`badge badge-${farmer.kycStatus === 'Verified' ? 'approved' : 'pending'}`}>{statusText(lang, farmer.kycStatus)}</span></td>
                    <td><span className={`badge badge-${farmer.status === 'Approved' ? 'approved' : farmer.status.includes('Pending') ? 'pending' : 'returned'}`}>{statusText(lang, farmer.status)}</span></td>
                    <td>
                      <div style={{display: 'flex', gap: '6px'}}>
                        <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => setSelectedFarmer(farmer)}>
                          <Eye size={12}/> {ui.view}
                        </button>
                        <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => {
                          const newCattle = prompt(ui.enterCattleCount, farmer.cattleCount);
                          if(newCattle) handleRequestModifyFarmer(farmer.id, 'cattleCount', parseInt(newCattle));
                        }}>
                          {ui.edit}
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
