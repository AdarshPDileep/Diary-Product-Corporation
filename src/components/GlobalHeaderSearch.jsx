import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, User, FileText, Award, LayoutGrid, ArrowRight } from 'lucide-react';

const MENU_ITEMS = [
  { menu: 'Dashboard', labelEn: 'Dashboard', labelMl: 'ഡാഷ്‌ബോർഡ്', keywords: 'home' },
  { menu: 'Farmers', labelEn: 'Farmer Master', labelMl: 'കർഷക മാസ്റ്റർ', keywords: 'farmer master' },
  { menu: 'ApprovalQueue', labelEn: 'Approval Queue', labelMl: 'അംഗീകാര ക്യൂ', keywords: 'approval queue verify' },
  { menu: 'Tracking', labelEn: 'Track Application', labelMl: 'അപേക്ഷ ട്രാക്ക്', keywords: 'track application ref' },
  { menu: 'Schemes', labelEn: 'Scheme Configuration', labelMl: 'പദ്ധതി', keywords: 'scheme config' },
  { menu: 'Reports', labelEn: 'MIS Reports', labelMl: 'റിപ്പോർട്ട്', keywords: 'reports mis' },
  { menu: 'Helpdesk', labelEn: 'Helpdesk', labelMl: 'ഹെൽപ്‌ഡെസ്‌ക്', keywords: 'ticket support' },
  { menu: 'Audit', labelEn: 'Audit Trail', labelMl: 'ഓഡിറ്റ്', keywords: 'audit log' },
  { menu: 'SystemConfig', labelEn: 'System Config', labelMl: 'സിസ്റ്റം', keywords: 'settings config' }
];

export default function GlobalHeaderSearch({
  query,
  setQuery,
  applications,
  farmers,
  schemes,
  lang,
  placeholder,
  onNavigate
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const items = [];

    MENU_ITEMS.forEach((m) => {
      const label = lang === 'ml' ? m.labelMl : m.labelEn;
      if (label.toLowerCase().includes(q) || m.keywords.includes(q) || m.menu.toLowerCase().includes(q)) {
        items.push({ type: 'page', id: m.menu, title: label, subtitle: 'Portal section', menu: m.menu });
      }
    });

    applications.forEach((a) => {
      if (
        a.refNo.toLowerCase().includes(q)
        || a.farmerName.toLowerCase().includes(q)
        || a.schemeName.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'application',
          id: a.id,
          title: a.refNo,
          subtitle: `${a.farmerName} · ${a.schemeName}`,
          menu: 'Tracking',
          refNo: a.refNo
        });
      }
    });

    farmers.forEach((f) => {
      if (
        f.farmerId.toLowerCase().includes(q)
        || f.name.toLowerCase().includes(q)
        || (f.mobile && f.mobile.includes(q))
      ) {
        items.push({
          type: 'farmer',
          id: f.farmerId,
          title: f.name,
          subtitle: f.farmerId,
          menu: 'Farmers',
          farmerSearch: f.name
        });
      }
    });

    schemes.forEach((s) => {
      if (s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)) {
        items.push({
          type: 'scheme',
          id: s.code,
          title: s.name,
          subtitle: s.code,
          menu: 'Schemes'
        });
      }
    });

    return items.slice(0, 12);
  }, [query, applications, farmers, schemes, lang]);

  const showPanel = open && query.trim().length >= 2;

  const pick = (item) => {
    onNavigate(item);
    setOpen(false);
    setQuery('');
  };

  const iconFor = (type) => {
    if (type === 'farmer') return <User size={16} />;
    if (type === 'application') return <FileText size={16} />;
    if (type === 'scheme') return <Award size={16} />;
    return <LayoutGrid size={16} />;
  };

  return (
    <div className="global-search" ref={rootRef}>
      <Search size={15} style={{ color: 'var(--text-light)' }} />
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) pick(results[0]);
          if (e.key === 'Escape') setOpen(false);
        }}
        aria-label={placeholder}
        aria-expanded={showPanel}
        autoComplete="off"
      />
      {showPanel && (
        <div className="global-search-panel" role="listbox">
          {results.length === 0 ? (
            <p className="global-search-empty">{lang === 'ml' ? 'ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല' : 'No matches found'}</p>
          ) : (
            results.map((item) => (
              <button key={`${item.type}-${item.id}`} type="button" className="global-search-item" onClick={() => pick(item)}>
                <span className="global-search-item-icon">{iconFor(item.type)}</span>
                <span className="global-search-item-text">
                  <span className="global-search-item-title">{item.title}</span>
                  <span className="global-search-item-sub">{item.subtitle}</span>
                </span>
                <ArrowRight size={14} className="global-search-item-arrow" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
