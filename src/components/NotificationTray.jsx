import React, { useEffect, useRef } from 'react';
import { Bell, CheckCheck } from 'lucide-react';

const CATEGORY_CLASS = {
  Scheme: 'notification-cat-scheme',
  Workflow: 'notification-cat-workflow',
  Finance: 'notification-cat-finance',
  'Farmer Master': 'notification-cat-farmer',
  Statements: 'notification-cat-statements',
  System: 'notification-cat-system',
  Helpdesk: 'notification-cat-helpdesk'
};

export default function NotificationTray({
  notifications,
  setNotifications,
  isOpen,
  setIsOpen,
  title,
  markAllReadLabel,
  noNotificationsLabel,
  unreadLabel,
  lang
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="notification-tray" ref={rootRef}>
      <button
        type="button"
        className={`icon-btn${isOpen ? ' notification-trigger-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={title}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="badge-dot" aria-hidden="true">
            {unreadCount > 9 ? '' : null}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel" role="dialog" aria-label={title}>
          <div className="notification-panel-header">
            <div>
              <h3>{title}</h3>
              {unreadCount > 0 && (
                <p className="notification-panel-sub">{unreadLabel(unreadCount)}</p>
              )}
            </div>
            {unreadCount > 0 && (
              <button type="button" className="notification-mark-all" onClick={markAllRead}>
                <CheckCheck size={14} />
                {markAllReadLabel}
              </button>
            )}
          </div>

          <div className="notification-panel-list">
            {notifications.length === 0 ? (
              <p className="notification-empty">{noNotificationsLabel}</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`notification-item${n.read ? '' : ' notification-item--unread'}`}
                  onClick={() => markRead(n.id)}
                >
                  <div className="notification-item-top">
                    <span className={`notification-cat ${CATEGORY_CLASS[n.category] || ''}`}>
                      {n.category}
                    </span>
                    <span className="notification-date">{n.date}</span>
                  </div>
                  <div className="notification-title">{lang === 'ml' && n.titleMl ? n.titleMl : n.title}</div>
                  <div className="notification-desc">{lang === 'ml' && n.descMl ? n.descMl : n.desc}</div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
