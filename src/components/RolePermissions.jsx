import React, { useMemo, useState } from 'react';
import { KeyRound, Plus, Search, Shield, UserCog } from 'lucide-react';
import { PERMISSION_MODULES } from '../mockData';

const SECTION_LABELS = {
  en: {
    main: 'Main Portal',
    farmer: 'Farmer Activities',
    verification: 'Verification Workflow',
    finance: 'Finance',
    admin: 'Administration',
    ops: 'Reports & Operations'
  },
  ml: {
    main: 'പ്രധാന പോർട്ടൽ',
    farmer: 'കർഷക പ്രവർത്തനങ്ങൾ',
    verification: 'പരിശോധന വർക്ക്ഫ്ലോ',
    finance: 'ധനകാര്യം',
    admin: 'ഭരണം',
    ops: 'റിപ്പോർട്ടുകളും പ്രവർത്തനങ്ങളും'
  }
};

const emptyNewUser = {
  userId: '',
  displayName: '',
  email: '',
  unit: 'Trivandrum',
  society: '',
  role: '',
  status: 'Active'
};

export default function RolePermissions({
  portalUsers,
  portalRoles,
  onSaveUser,
  onAddUser,
  onAddRole,
  getDefaultPermissionsForRole,
  lang,
  t
}) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [savedNotice, setSavedNotice] = useState('');

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState(emptyNewUser);
  const [addUserError, setAddUserError] = useState('');

  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState(['dashboard', 'reports', 'helpdesk']);
  const [addRoleError, setAddRoleError] = useState('');

  const ui = lang === 'ml' ? {
    subtitle: 'പോർട്ടൽ ഉപയോക്താക്കൾക്ക് റോൾ നൽകുകയും മോഡ്യൂൾ-തല അനുമതികൾ നിയന്ത്രിക്കുകയും ചെയ്യുക.',
    addUser: 'ഉപയോക്താവ് ചേർക്കുക',
    addRole: 'റോൾ ചേർക്കുക',
    totalUsers: 'ആകെ ഉപയോക്താക്കൾ',
    activeUsers: 'സജീവം',
    rolesDefined: 'നിർവചിച്ച റോളുകൾ',
    searchPlaceholder: 'ഉപയോക്തൃ ഐഡി, പേര്, ഇമെയിൽ…',
    allRoles: 'എല്ലാ റോളുകളും',
    thUserId: 'ഉപയോക്തൃ ഐഡി',
    thName: 'പേര്',
    thUnit: 'യൂണിറ്റ്',
    thRole: 'റോൾ',
    thStatus: 'നില',
    thActions: 'നടപടി',
    configure: 'അനുമതികൾ',
    panelTitle: 'റോൾ & അനുമതി നിയോഗം',
    selectUser: 'അനുമതികൾ എഡിറ്റ് ചെയ്യാൻ പട്ടികയിൽ നിന്ന് ഒരു ഉപയോക്താവ് തിരഞ്ഞെടുക്കുക.',
    account: 'അക്കൗണ്ട്',
    assignRole: 'റോൾ നിയോഗിക്കുക',
    applyRoleDefaults: 'റോൾ ഡിഫോൾട്ടുകൾ പ്രയോഗിക്കുക',
    moduleAccess: 'മോഡ്യുൾ പ്രവേശനം',
    save: 'മാറ്റങ്ങൾ സേവ് ചെയ്യുക',
    cancel: 'റദ്ദാക്കുക',
    saved: 'ഉപയോക്തൃ റോളും അനുമതികളും അപ്‌ഡേറ്റ് ചെയ്തു.',
    active: 'സജീവം',
    inactive: 'നിഷ്ക്രിയം',
    modalAddUser: 'പുതിയ പോർട്ടൽ ഉപയോക്താവ്',
    modalAddUserDesc: 'ലോഗിൻ ഐഡി, വിവരങ്ങൾ, നിയോഗിക്കേണ്ട റോൾ നൽകുക.',
    modalAddRole: 'പുതിയ പോർട്ടൽ റോൾ',
    modalAddRoleDesc: 'റോൾ പേര് നൽകി ഡിഫോൾട്ട് മോഡ്യുൾ അനുമതികൾ തിരഞ്ഞെടുക്കുക.',
    userId: 'ഉപയോക്തൃ ഐഡി',
    displayName: 'പ്രദർശന പേര്',
    email: 'ഇമെയിൽ',
    unit: 'യൂണിറ്റ്',
    society: 'സഹകരണ സംഘം (ഓപ്ഷണൽ)',
    status: 'നില',
    roleName: 'റോൾ പേര്',
    defaultPermissions: 'ഡിഫോൾട്ട് അനുമതികൾ',
    createUser: 'ഉപയോക്താവ് സൃഷ്ടിക്കുക',
    createRole: 'റോൾ സൃഷ്ടിക്കുക',
    selectRole: 'റോൾ തിരഞ്ഞെടുക്കുക',
    errUserId: 'ഉപയോക്തൃ ഐഡി ആവശ്യമാണ്.',
    errDuplicateUser: 'ഈ ഉപയോക്തൃ ഐഡി ഇതിനകം നിലവിലുണ്ട്.',
    errRoleRequired: 'ഒരു റോൾ തിരഞ്ഞെടുക്കുക.',
    errRoleName: 'റോൾ പേര് ആവശ്യമാണ്.',
    errDuplicateRole: 'ഈ റോൾ പേര് ഇതിനകം നിലവിലുണ്ട്.',
    userCreated: 'ഉപയോക്താവ് സൃഷ്ടിച്ചു. അനുമതികൾ എഡിറ്റ് ചെയ്യാം.',
    roleCreated: 'റോൾ സൃഷ്ടിച്ചു. പുതിയ ഉപയോക്താക്കൾക്ക് നിയോഗിക്കാം.',
    usersPanelTitle: 'പോർട്ടൽ ഉപയോക്താക്കൾ',
    usersPanelSub: (n) => `${n} അക്കൗണ്ട്(കൾ)`
  } : {
    subtitle: 'Assign portal roles and control module-level access for each user account.',
    addUser: 'Add User',
    addRole: 'Add Role',
    totalUsers: 'Total users',
    activeUsers: 'Active',
    rolesDefined: 'Roles defined',
    searchPlaceholder: 'Search user ID, name, email…',
    allRoles: 'All roles',
    thUserId: 'User ID',
    thName: 'Name',
    thUnit: 'Unit',
    thRole: 'Role',
    thStatus: 'Status',
    thActions: 'Actions',
    configure: 'Permissions',
    panelTitle: 'Role & permission assignment',
    selectUser: 'Select a user from the list to edit their role and module access.',
    account: 'Account',
    assignRole: 'Assign role',
    applyRoleDefaults: 'Apply role defaults',
    moduleAccess: 'Module access',
    save: 'Save changes',
    cancel: 'Cancel',
    saved: 'User role and permissions updated.',
    active: 'Active',
    inactive: 'Inactive',
    modalAddUser: 'New portal user',
    modalAddUserDesc: 'Enter login ID, profile details, and assign a role.',
    modalAddRole: 'New portal role',
    modalAddRoleDesc: 'Name the role and choose default module permissions.',
    userId: 'User ID',
    displayName: 'Display name',
    email: 'Email',
    unit: 'Unit',
    society: 'Society (optional)',
    status: 'Status',
    roleName: 'Role name',
    defaultPermissions: 'Default permissions',
    createUser: 'Create user',
    createRole: 'Create role',
    selectRole: 'Select role',
    errUserId: 'User ID is required.',
    errDuplicateUser: 'This user ID already exists.',
    errRoleRequired: 'Please select a role.',
    errRoleName: 'Role name is required.',
    errDuplicateRole: 'This role name already exists.',
    userCreated: 'User created. You can fine-tune permissions on the right.',
    roleCreated: 'Role created. Assign it when adding users.',
    usersPanelTitle: 'Portal users',
    usersPanelSub: (n) => `${n} account${n === 1 ? '' : 's'} in directory`
  };

  const roleNames = useMemo(() => portalRoles.map((r) => r.name), [portalRoles]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return portalUsers.filter((u) => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (!q) return true;
      return (
        u.userId.toLowerCase().includes(q)
        || u.displayName.toLowerCase().includes(q)
        || u.email.toLowerCase().includes(q)
      );
    });
  }, [portalUsers, search, roleFilter]);

  const stats = useMemo(() => ({
    total: portalUsers.length,
    active: portalUsers.filter((u) => u.status === 'Active').length,
    roles: portalRoles.length
  }), [portalUsers, portalRoles]);

  const sections = useMemo(() => {
    const labels = SECTION_LABELS[lang] || SECTION_LABELS.en;
    const order = ['main', 'farmer', 'verification', 'finance', 'admin', 'ops'];
    return order.map((id) => ({
      id,
      title: labels[id],
      modules: PERMISSION_MODULES.filter((m) => m.section === id)
    })).filter((s) => s.modules.length);
  }, [lang]);

  const permLabel = (mod) => (lang === 'ml' ? mod.labelMl : mod.labelEn);

  const openEditor = (user) => {
    setSelectedId(user.id);
    setDraft({
      ...user,
      permissions: [...user.permissions]
    });
    setSavedNotice('');
  };

  const closeEditor = () => {
    setSelectedId(null);
    setDraft(null);
  };

  const togglePermission = (key) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const has = prev.permissions.includes(key);
      const permissions = has
        ? prev.permissions.filter((p) => p !== key)
        : [...prev.permissions, key];
      return { ...prev, permissions };
    });
  };

  const handleRoleChange = (role) => {
    setDraft((prev) => (prev ? { ...prev, role } : prev));
  };

  const applyRoleDefaults = () => {
    if (!draft) return;
    setDraft({
      ...draft,
      permissions: getDefaultPermissionsForRole(draft.role)
    });
  };

  const handleSave = () => {
    if (!draft) return;
    onSaveUser(draft);
    setSavedNotice(ui.saved);
    setTimeout(() => setSavedNotice(''), 3200);
  };

  const openAddUser = () => {
    setNewUser({
      ...emptyNewUser,
      role: roleNames[0] || ''
    });
    setAddUserError('');
    setAddUserOpen(true);
  };

  const submitAddUser = (e) => {
    e.preventDefault();
    const userId = newUser.userId.trim();
    if (!userId) {
      setAddUserError(ui.errUserId);
      return;
    }
    if (portalUsers.some((u) => u.userId.toLowerCase() === userId.toLowerCase())) {
      setAddUserError(ui.errDuplicateUser);
      return;
    }
    if (!newUser.role) {
      setAddUserError(ui.errRoleRequired);
      return;
    }

    const created = {
      id: `PU${Date.now()}`,
      userId,
      displayName: newUser.displayName.trim() || userId,
      email: newUser.email.trim() || `${userId.toLowerCase()}@trcmpu.demo`,
      unit: newUser.unit.trim() || 'Trivandrum',
      society: newUser.society.trim() || '—',
      role: newUser.role,
      status: newUser.status,
      permissions: getDefaultPermissionsForRole(newUser.role)
    };

    onAddUser(created);
    setAddUserOpen(false);
    openEditor(created);
    setSavedNotice(ui.userCreated);
    setTimeout(() => setSavedNotice(''), 3200);
  };

  const openAddRole = () => {
    setNewRoleName('');
    setNewRolePermissions(['dashboard', 'reports', 'tracking', 'helpdesk', 'audit']);
    setAddRoleError('');
    setAddRoleOpen(true);
  };

  const toggleNewRolePermission = (key) => {
    setNewRolePermissions((prev) => (
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    ));
  };

  const submitAddRole = (e) => {
    e.preventDefault();
    const name = newRoleName.trim();
    if (!name) {
      setAddRoleError(ui.errRoleName);
      return;
    }
    if (portalRoles.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
      setAddRoleError(ui.errDuplicateRole);
      return;
    }

    const created = {
      id: `ROLE_${Date.now()}`,
      name,
      isSystem: false,
      permissions: [...newRolePermissions]
    };

    onAddRole(created);
    setAddRoleOpen(false);
    setSavedNotice(ui.roleCreated);
    setTimeout(() => setSavedNotice(''), 3200);
  };

  const renderPermissionGrid = (selected, onToggle) => (
    sections.map((section) => (
      <div key={section.id} className="role-perm-section">
        <div className="role-perm-section-title">{section.title}</div>
        <div className="role-perm-checkgrid">
          {section.modules.map((mod) => (
            <label key={mod.key} className="checklist-item role-perm-check">
              <input
                type="checkbox"
                checked={selected.includes(mod.key)}
                onChange={() => onToggle(mod.key)}
              />
              <span>{permLabel(mod)}</span>
            </label>
          ))}
        </div>
      </div>
    ))
  );

  return (
    <div className="role-perm-page">
      <div className="page-header role-perm-page-header">
        <div className="page-title">
          <h1>{t('rolePermissions')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <div className="role-perm-header-actions">
          <button type="button" className="btn btn-secondary" onClick={openAddRole}>
            <Plus size={16} /> {ui.addRole}
          </button>
          <button type="button" className="btn btn-primary" onClick={openAddUser}>
            <Plus size={16} /> {ui.addUser}
          </button>
        </div>
      </div>

      <div className="role-perm-stats">
        <div className="role-perm-stat-card">
          <span className="role-perm-stat-icon" aria-hidden="true"><UserCog size={18} /></span>
          <div className="role-perm-stat-text">
            <span className="role-perm-stat-val">{stats.total}</span>
            <span className="role-perm-stat-label">{ui.totalUsers}</span>
          </div>
        </div>
        <div className="role-perm-stat-card">
          <span className="role-perm-stat-icon" aria-hidden="true"><Shield size={18} /></span>
          <div className="role-perm-stat-text">
            <span className="role-perm-stat-val">{stats.active}</span>
            <span className="role-perm-stat-label">{ui.activeUsers}</span>
          </div>
        </div>
        <div className="role-perm-stat-card">
          <span className="role-perm-stat-icon" aria-hidden="true"><KeyRound size={18} /></span>
          <div className="role-perm-stat-text">
            <span className="role-perm-stat-val">{stats.roles}</span>
            <span className="role-perm-stat-label">{ui.rolesDefined}</span>
          </div>
        </div>
      </div>

      <div className="role-perm-layout">
        <div className="card-section role-perm-list">
          <div className="card-section-header role-perm-list-header">
            <div>
              <div className="card-section-title">{ui.usersPanelTitle}</div>
              <div className="card-subtitle">{ui.usersPanelSub(portalUsers.length)}</div>
            </div>
          </div>
          <div className="role-perm-toolbar">
            <div className="role-perm-search">
              <Search size={16} strokeWidth={2} />
              <input
                type="search"
                className="role-perm-search-input"
                placeholder={ui.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="form-input role-perm-filter" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">{ui.allRoles}</option>
              {roleNames.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="table-responsive role-perm-table-wrap">
            <table className="app-table">
              <thead>
                <tr>
                  <th>{ui.thUserId}</th>
                  <th>{ui.thName}</th>
                  <th>{ui.thUnit}</th>
                  <th>{ui.thRole}</th>
                  <th>{ui.thStatus}</th>
                  <th>{ui.thActions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className={selectedId === u.id ? 'role-perm-row-active' : ''}>
                    <td><span className="role-perm-mono">{u.userId}</span></td>
                    <td>
                      <div className="role-perm-user-name">{u.displayName}</div>
                      <div className="role-perm-user-email">{u.email}</div>
                    </td>
                    <td className="role-perm-unit">{u.unit}</td>
                    <td><span className="badge badge-returned role-perm-role-badge">{u.role}</span></td>
                    <td>
                      <span className={`badge badge-${u.status === 'Active' ? 'approved' : 'draft'}`}>
                        {u.status === 'Active' ? ui.active : ui.inactive}
                      </span>
                    </td>
                    <td className="role-perm-actions-cell">
                      <button type="button" className="btn btn-secondary role-perm-action-btn" onClick={() => openEditor(u)}>
                        {ui.configure}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`card-section role-perm-editor${!draft ? ' role-perm-editor--idle' : ''}`}>
          <div className="card-section-header">
            <div className="card-section-title">{ui.panelTitle}</div>
          </div>
          <div className="role-perm-editor-body">
          {savedNotice && <div className="role-perm-notice">{savedNotice}</div>}

          {!draft ? (
            <div className="role-perm-empty-wrap">
              <div className="role-perm-empty">
                <Shield size={28} strokeWidth={1.75} className="role-perm-empty-icon" />
                <p>{ui.selectUser}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="role-perm-account">
                <div className="role-perm-account-label">{ui.account}</div>
                <div className="role-perm-account-name">{draft.displayName}</div>
                <div className="role-perm-account-meta">{draft.userId} · {draft.email}</div>
              </div>

              <div className="form-group">
                <label>{ui.assignRole}</label>
                <select
                  className="form-input"
                  value={draft.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                >
                  {roleNames.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn btn-secondary role-perm-defaults-btn" onClick={applyRoleDefaults}>
                {ui.applyRoleDefaults}
              </button>

              <div className="role-perm-modules">
                <div className="role-perm-modules-head">{ui.moduleAccess}</div>
                {renderPermissionGrid(draft.permissions, togglePermission)}
              </div>

              <div className="role-perm-editor-actions">
                <button type="button" className="btn btn-secondary" onClick={closeEditor}>{ui.cancel}</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>{ui.save}</button>
              </div>
            </>
          )}
          </div>
        </div>
      </div>

      {addUserOpen && (
        <div className="modal-overlay" onClick={() => setAddUserOpen(false)}>
          <div className="modal-content role-perm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: '700', fontSize: '16px' }}>{ui.modalAddUser}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{ui.modalAddUserDesc}</p>
              </div>
              <button type="button" onClick={() => setAddUserOpen(false)} className="doc-preview-close" aria-label={ui.cancel}>×</button>
            </div>
            <form onSubmit={submitAddUser}>
              <div className="modal-body">
                {addUserError && <div className="role-perm-form-error">{addUserError}</div>}
                <div className="form-grid" style={{ padding: 0 }}>
                  <div className="form-group">
                    <label>{ui.userId}</label>
                    <input
                      className="form-input"
                      value={newUser.userId}
                      onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
                      placeholder="TVM_USER_01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{ui.displayName}</label>
                    <input
                      className="form-input"
                      value={newUser.displayName}
                      onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{ui.email}</label>
                    <input
                      type="email"
                      className="form-input"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{ui.assignRole}</label>
                    <select
                      className="form-input"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      required
                    >
                      <option value="">{ui.selectRole}</option>
                      {roleNames.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{ui.unit}</label>
                    <input
                      className="form-input"
                      value={newUser.unit}
                      onChange={(e) => setNewUser({ ...newUser, unit: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{ui.society}</label>
                    <input
                      className="form-input"
                      value={newUser.society}
                      onChange={(e) => setNewUser({ ...newUser, society: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{ui.status}</label>
                    <select
                      className="form-input"
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    >
                      <option value="Active">{ui.active}</option>
                      <option value="Inactive">{ui.inactive}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddUserOpen(false)}>{ui.cancel}</button>
                <button type="submit" className="btn btn-primary">{ui.createUser}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addRoleOpen && (
        <div className="modal-overlay" onClick={() => setAddRoleOpen(false)}>
          <div className="modal-content role-perm-modal role-perm-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: '700', fontSize: '16px' }}>{ui.modalAddRole}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{ui.modalAddRoleDesc}</p>
              </div>
              <button type="button" onClick={() => setAddRoleOpen(false)} className="doc-preview-close" aria-label={ui.cancel}>×</button>
            </div>
            <form onSubmit={submitAddRole}>
              <div className="modal-body">
                {addRoleError && <div className="role-perm-form-error">{addRoleError}</div>}
                <div className="form-group">
                  <label>{ui.roleName}</label>
                  <input
                    className="form-input"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="e.g. District Review Officer"
                    required
                  />
                </div>
                <div className="role-perm-modules" style={{ marginTop: '16px' }}>
                  <div className="role-perm-modules-head">{ui.defaultPermissions}</div>
                  {renderPermissionGrid(newRolePermissions, toggleNewRolePermission)}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddRoleOpen(false)}>{ui.cancel}</button>
                <button type="submit" className="btn btn-primary">{ui.createRole}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
