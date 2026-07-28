import React from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import { initialDistricts } from '../mockData';

export default function Farmers({
  farmers, farmerSearch, setFarmerSearch, farmerDistrictFilter, setFarmerDistrictFilter,
  setSelectedFarmer, handleRequestModifyFarmer, setIsNewFarmerOpen, t
}) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('farmers')}</h1>
          <p>View, modify and register unique milk producer records.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsNewFarmerOpen(true)}>
          <Plus size={16}/> Register Farmer
        </button>
      </div>

      <div className="card-section" style={{padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: '200px'}} className="nav-search">
          <Search size={16}/>
          <input type="text" placeholder="Search by name, ID or mobile..." value={farmerSearch} onChange={e => setFarmerSearch(e.target.value)} />
        </div>
        <select className="form-select" value={farmerDistrictFilter} onChange={e => setFarmerDistrictFilter(e.target.value)}>
          <option value="">All Districts</option>
          {initialDistricts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
        </select>
      </div>

      <div className="card-section">
        <div className="table-responsive">
          <table className="app-table">
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Cattle Count</th>
                <th>Society</th>
                <th>KYC Status</th>
                <th>Record Status</th>
                <th>Actions</th>
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
                    <td><span className={`badge badge-${farmer.kycStatus === 'Verified' ? 'approved' : 'pending'}`}>{farmer.kycStatus}</span></td>
                    <td><span className={`badge badge-${farmer.status === 'Approved' ? 'approved' : farmer.status.includes('Pending') ? 'pending' : 'returned'}`}>{farmer.status}</span></td>
                    <td>
                      <div style={{display: 'flex', gap: '6px'}}>
                        <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => setSelectedFarmer(farmer)}>
                          <Eye size={12}/> View
                        </button>
                        <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => {
                          const newCattle = prompt('Enter revised cattle count:', farmer.cattleCount);
                          if(newCattle) handleRequestModifyFarmer(farmer.id, 'cattleCount', parseInt(newCattle));
                        }}>
                          Edit
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
