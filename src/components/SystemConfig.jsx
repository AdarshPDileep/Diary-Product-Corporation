import React, { useState } from 'react';
import { Save, Server, Shield, Mail, Clock, Upload } from 'lucide-react';

function ConfigToggle({ checked, onChange, label, description }) {
  return (
    <label className="config-option">
      <span className="config-option-text">
        <span className="config-option-label">{label}</span>
        {description ? <span className="config-option-desc">{description}</span> : null}
      </span>
      <input type="checkbox" className="config-option-check" checked={checked} onChange={onChange} />
    </label>
  );
}

export default function SystemConfig({ settings, onSave, t, lang }) {
  const [draft, setDraft] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const ui = lang === 'ml' ? {
    subtitle: 'പോർട്ടൽ, സുരക്ഷ, അറിയിപ്പുകൾ, ഫയൽ അപ്‌ലോഡ് പരിധികൾ എന്നിവയുടെ ഡെമോ കോൺഫിഗറേഷൻ.',
    general: 'പൊതു',
    generalHint: 'പോർട്ടൽ ഐഡന്റിറ്റിയും പ്രദേശം',
    security: 'സുരക്ഷ',
    securityHint: 'സെഷനും ഓഡിറ്റും',
    notifications: 'അറിയിപ്പുകൾ',
    notificationsHint: 'ചാനലുകളും അപ്‌ലോഡ് പരിധി',
    portalName: 'പോർട്ടൽ പേര്',
    supportEmail: 'സപ്പോർട്ട് ഇമെയിൽ',
    defaultLang: 'ഡിഫോൾട്ട് ഭാഷ',
    sessionTimeout: 'സെഷൻ ടൈംഔട്ട് (മിനിറ്റ്)',
    maxUpload: 'പരമാവധി അപ്‌ലോഡ് (MB)',
    auditRetention: 'ഓഡിറ്റ് നിലനിർത്തൽ (ദിവസം)',
    maintenanceMode: 'പരിപാലന മോഡ്',
    maintenanceDesc: 'അഡ്മിൻ അല്ലാത്ത ഉപയോക്താക്കൾക്ക് ലോഗിൻ താൽക്കാലികമായി തടയുക',
    otpLogin: 'OTP ലോഗിൻ',
    otpDesc: 'മൊബൈൽ OTP ഉപയോഗിച്ച് സൈൻ-ഇൻ',
    emailAlerts: 'ഇമെയിൽ അലേർട്ടുകൾ',
    emailDesc: 'അംഗീകാരവും സിസ്റ്റവും ഇമെയിൽ',
    smsAlerts: 'SMS അലേർട്ടുകൾ',
    smsDesc: 'അപേക്ഷാ നില അപ്‌ഡേറ്റുകൾ SMS വഴി',
    districts: 'സജീവ ജില്ലകൾ',
    districtsHint: 'ഈ ജില്ലകളിൽ പദ്ധതികൾ പ്രകാശനം ചെയ്യാം',
    save: 'കോൺഫിഗറേഷൻ സേവ് ചെയ്യുക',
    saved: 'സിസ്റ്റം കോൺഫിഗറേഷൻ (ഡെമോ) അപ്‌ഡേറ്റ് ചെയ്തു.',
    demoNote: 'ഡെമോ മാത്രം — മാറ്റങ്ങൾ ഈ ബ്രൗസർ സെഷനിൽ മാത്രം നിലനിൽക്കും.'
  } : {
    subtitle: 'Demo configuration for portal, security, notifications, and upload limits.',
    general: 'General',
    generalHint: 'Portal identity & region',
    security: 'Security',
    securityHint: 'Session & audit policy',
    notifications: 'Notifications',
    notificationsHint: 'Channels & file limits',
    portalName: 'Portal name',
    supportEmail: 'Support email',
    defaultLang: 'Default language',
    sessionTimeout: 'Session timeout (minutes)',
    maxUpload: 'Max upload size (MB)',
    auditRetention: 'Audit retention (days)',
    maintenanceMode: 'Maintenance mode',
    maintenanceDesc: 'Temporarily block non-admin sign-in',
    otpLogin: 'OTP login',
    otpDesc: 'Allow mobile OTP authentication',
    emailAlerts: 'Email alerts',
    emailDesc: 'Approvals and system events by email',
    smsAlerts: 'SMS alerts',
    smsDesc: 'Application status updates via SMS',
    districts: 'Active districts',
    districtsHint: 'Schemes can be published in selected districts',
    save: 'Save configuration',
    saved: 'System configuration updated (demo).',
    demoNote: 'Demo only — changes persist for this browser session.'
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleDistrict = (code) => {
    setDraft((d) => ({
      ...d,
      districtsEnabled: d.districtsEnabled.includes(code)
        ? d.districtsEnabled.filter((c) => c !== code)
        : [...d.districtsEnabled, code]
    }));
  };

  return (
    <div className="config-page">
      <div className="page-header config-page-header">
        <div className="page-title">
          <h1>{t('settings')}</h1>
          <p>{ui.subtitle}</p>
        </div>
      </div>

      {saved && <div className="role-perm-notice config-saved-banner">{ui.saved}</div>}

      <form className="config-form" onSubmit={handleSave}>
        <div className="config-grid">
          <section className="card-section config-card">
            <div className="card-section-header">
              <div>
                <div className="card-section-title">
                  <Server size={18} strokeWidth={2.25} />
                  {ui.general}
                </div>
                <p className="card-subtitle config-section-sub">{ui.generalHint}</p>
              </div>
            </div>
            <div className="config-card-body">
              <div className="form-group">
                <label htmlFor="cfg-portal-name">{ui.portalName}</label>
                <input
                  id="cfg-portal-name"
                  className="form-input"
                  value={draft.portalName}
                  onChange={(e) => setDraft({ ...draft, portalName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cfg-support-email">{ui.supportEmail}</label>
                <input
                  id="cfg-support-email"
                  type="email"
                  className="form-input"
                  value={draft.supportEmail}
                  onChange={(e) => setDraft({ ...draft, supportEmail: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cfg-default-lang">{ui.defaultLang}</label>
                <select
                  id="cfg-default-lang"
                  className="form-input form-select"
                  value={draft.defaultLanguage}
                  onChange={(e) => setDraft({ ...draft, defaultLanguage: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="ml">Malayalam</option>
                </select>
              </div>
              <div className="form-group config-districts">
                <div className="config-districts-head">
                  <label>{ui.districts}</label>
                  <span className="config-districts-hint">{ui.districtsHint}</span>
                </div>
                <div className="config-district-box">
                  <div className="config-chip-row">
                    {draft.allDistricts.map((d) => (
                      <button
                        key={d.code}
                        type="button"
                        className={`config-chip${draft.districtsEnabled.includes(d.code) ? ' active' : ''}`}
                        onClick={() => toggleDistrict(d.code)}
                      >
                        {lang === 'ml' ? d.nameMl : d.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card-section config-card">
            <div className="card-section-header">
              <div>
                <div className="card-section-title">
                  <Shield size={18} strokeWidth={2.25} />
                  {ui.security}
                </div>
                <p className="card-subtitle config-section-sub">{ui.securityHint}</p>
              </div>
            </div>
            <div className="config-card-body">
              <div className="config-field-row">
                <div className="form-group">
                  <label htmlFor="cfg-session">{ui.sessionTimeout}</label>
                  <input
                    id="cfg-session"
                    type="number"
                    className="form-input"
                    min={5}
                    max={120}
                    value={draft.sessionTimeoutMins}
                    onChange={(e) => setDraft({ ...draft, sessionTimeoutMins: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cfg-audit">{ui.auditRetention}</label>
                  <input
                    id="cfg-audit"
                    type="number"
                    className="form-input"
                    min={30}
                    value={draft.auditRetentionDays}
                    onChange={(e) => setDraft({ ...draft, auditRetentionDays: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="config-option-list">
                <ConfigToggle
                  label={ui.maintenanceMode}
                  description={ui.maintenanceDesc}
                  checked={draft.maintenanceMode}
                  onChange={(e) => setDraft({ ...draft, maintenanceMode: e.target.checked })}
                />
                <ConfigToggle
                  label={ui.otpLogin}
                  description={ui.otpDesc}
                  checked={draft.otpLoginEnabled}
                  onChange={(e) => setDraft({ ...draft, otpLoginEnabled: e.target.checked })}
                />
              </div>
            </div>
          </section>

          <section className="card-section config-card">
            <div className="card-section-header">
              <div>
                <div className="card-section-title">
                  <Mail size={18} strokeWidth={2.25} />
                  {ui.notifications}
                </div>
                <p className="card-subtitle config-section-sub">{ui.notificationsHint}</p>
              </div>
            </div>
            <div className="config-card-body">
              <div className="config-option-list">
                <ConfigToggle
                  label={ui.emailAlerts}
                  description={ui.emailDesc}
                  checked={draft.notificationEmailEnabled}
                  onChange={(e) => setDraft({ ...draft, notificationEmailEnabled: e.target.checked })}
                />
                <ConfigToggle
                  label={ui.smsAlerts}
                  description={ui.smsDesc}
                  checked={draft.notificationSmsEnabled}
                  onChange={(e) => setDraft({ ...draft, notificationSmsEnabled: e.target.checked })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cfg-upload">
                  <Upload size={14} aria-hidden />
                  {ui.maxUpload}
                </label>
                <input
                  id="cfg-upload"
                  type="number"
                  className="form-input config-input-narrow"
                  min={1}
                  max={50}
                  value={draft.maxUploadMb}
                  onChange={(e) => setDraft({ ...draft, maxUploadMb: Number(e.target.value) })}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="config-form-footer">
          <p className="config-footer-note">
            <Clock size={15} aria-hidden />
            {ui.demoNote}
          </p>
          <button type="submit" className="btn btn-primary config-save-btn">
            <Save size={16} />
            {ui.save}
          </button>
        </div>
      </form>
    </div>
  );
}
