import React, { useEffect, useRef } from 'react';
import { LogOut, Building2, Shield } from 'lucide-react';

export default function UserProfileMenu({
  username,
  currentRole,
  portalUsers,
  isOpen,
  setIsOpen,
  onLogout,
  labels
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isOpen, setIsOpen]);

  const account = portalUsers.find(
    (u) => u.userId.toLowerCase() === username.toLowerCase()
  );

  const displayName = account?.displayName ?? username.replace(/_/g, ' ');
  const email = account?.email ?? `${username.toLowerCase()}@trcmpu.demo`;
  const unit = account?.unit ?? 'Trivandrum Region';
  const society = account?.society && account.society !== '—' ? account.society : labels.notApplicable;
  const status = account?.status ?? 'Active';
  const permissionCount = account?.permissions?.length ?? 0;

  return (
    <div className="user-profile-menu" ref={rootRef}>
      <button
        type="button"
        className={`user-profile${isOpen ? ' user-profile-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <div className="user-avatar">{username.substring(0, 2).toUpperCase()}</div>
        <div className="user-profile-text">
          <div className="user-profile-name">{username}</div>
          <div className="user-profile-role">{currentRole}</div>
        </div>
      </button>

      {isOpen && (
        <div className="user-profile-panel" role="dialog" aria-label={labels.myProfile}>
          <div className="user-profile-panel-head">
            <div className="user-profile-panel-avatar">{username.substring(0, 2).toUpperCase()}</div>
            <div>
              <h3>{displayName}</h3>
              <p>{currentRole}</p>
            </div>
          </div>

          <dl className="user-profile-details">
            <div>
              <dt>{labels.userId}</dt>
              <dd>{username}</dd>
            </div>
            <div>
              <dt>{labels.email}</dt>
              <dd>{email}</dd>
            </div>
            <div>
              <dt>{labels.unit}</dt>
              <dd>{unit}</dd>
            </div>
            <div>
              <dt>{labels.society}</dt>
              <dd>{society}</dd>
            </div>
            <div>
              <dt>{labels.status}</dt>
              <dd>
                <span className={`badge badge-${status === 'Active' ? 'approved' : 'draft'}`}>{status}</span>
              </dd>
            </div>
            {permissionCount > 0 && (
              <div>
                <dt>{labels.moduleAccess}</dt>
                <dd>{labels.modulesGranted(permissionCount)}</dd>
              </div>
            )}
          </dl>

          <div className="user-profile-panel-meta">
            <span><Shield size={14} /> TRCMPU Farmer Scheme ERP</span>
            <span><Building2 size={14} /> {labels.organization}</span>
          </div>

          <div className="user-profile-panel-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
              {labels.close}
            </button>
            <button
              type="button"
              className="btn btn-danger user-profile-logout"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
            >
              <LogOut size={15} />
              {labels.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
