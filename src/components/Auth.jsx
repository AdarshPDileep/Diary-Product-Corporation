import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Auth({
  authStep, setAuthStep, username, setUsername, password, setPassword,
  lang, setLang, handleLogin, handleForgotSend, handleResetPass,
  demoRoles, handleRoleLogin, t
}) {
  const ui = lang === 'ml' ? {
    tagline: 'കർഷക പദ്ധതി ERP · തിരുവനന്തപുരം റീജിയൺ കോ-ഓപ്പറേറ്റീവ് മിൽക്ക് പ്രൊഡ്യൂസേഴ്സ് യൂണിയൻ. സാമ്പിൾ ഡാറ്റയ്ക്കൊപ്പം പോർട്ടൽ പരിശോധിക്കാൻ താഴെ ഒരു റോൾ തിരഞ്ഞെടുക്കുക.',
    quickDemo: 'ദ്രുത ഡെമോ ലോഗിനുകൾ — പ്രവേശിക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    loginAs: (name) => `${name} ആയി ലോഗിൻ ചെയ്യുക`,
    welcomeBack: 'സ്വാഗതം',
    signInSub: 'നിങ്ങളുടെ ക്രെഡൻഷ്യലുകൾ ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക, അല്ലെങ്കിൽ ഇടതുവശത്തുള്ള റോൾ ഉപയോഗിക്കുക.',
    userId: 'ഉപയോക്തൃ ഐഡി',
    password: 'പാസ്വേഡ്',
    language: 'Language / ഭാഷ',
    rememberMe: 'എന്നെ ഓർക്കുക',
    forgotPasswordQ: 'പാസ്വേഡ് മറന്നോ?',
    signIn: 'സൈൻ ഇൻ',
    forgotHeading: 'പാസ്വേഡ് മറന്നോ',
    forgotSub: 'പുനഃസജ്ജമാക്കാൻ നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത ഉപയോക്തൃ ഐഡി അല്ലെങ്കിൽ മൊബൈൽ നൽകുക.',
    userIdMobile: 'ഉപയോക്തൃ ഐഡി / മൊബൈൽ',
    continueBtn: 'തുടരുക',
    backToLogin: 'ലോഗിനിലേക്ക് മടങ്ങുക',
    resetHeading: 'പാസ്വേഡ് പുനഃസജ്ജമാക്കുക',
    resetSub: 'നിങ്ങളുടെ അക്കൗണ്ടിനായി പുതിയ പാസ്വേഡ് തിരഞ്ഞെടുക്കുക.',
    newPassword: 'പുതിയ പാസ്വേഡ്',
    confirmPassword: 'പാസ്വേഡ് ഉറപ്പാക്കുക',
    savePassword: 'പാസ്വേഡ് സേവ് ചെയ്യുക',
  } : {
    tagline: 'Farmer Scheme ERP · Trivandrum Region Co-operative Milk Producers Union. Pick a role below to explore the portal with sample data.',
    quickDemo: 'Quick Demo Logins — click to enter',
    loginAs: (name) => `Login as ${name}`,
    welcomeBack: 'Welcome Back',
    signInSub: 'Sign in with your credentials, or use a role on the left.',
    userId: 'User ID',
    password: 'Password',
    language: 'Language / ഭാഷ',
    rememberMe: 'Remember Me',
    forgotPasswordQ: 'Forgot Password?',
    signIn: 'Sign In',
    forgotHeading: 'Forgot Password',
    forgotSub: 'Enter your registered User ID or mobile to reset.',
    userIdMobile: 'User ID / Mobile',
    continueBtn: 'Continue',
    backToLogin: 'Back to Login',
    resetHeading: 'Reset Password',
    resetSub: 'Choose a new password for your account.',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    savePassword: 'Save Password',
  };

  return (
    <div className="auth-container">
      {/* decorative blurred color blobs for the glass effect */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />
      <div className="auth-blob auth-blob-3" />

      <div className="auth-shell">
        {/* LEFT — brand + role quick-login */}
        <div className="auth-brand">
          <div className="brand-head">
            <div className="brand-logo">M</div>
            <h1>TRCMPU</h1>
            <p className="tagline">{ui.tagline}</p>
          </div>

          <div className="role-quick">
            <div className="role-quick-title">{ui.quickDemo}</div>
            <div className="role-quick-grid">
              {demoRoles.map(r => (
                <button
                  key={r.name}
                  type="button"
                  className="role-quick-item"
                  onClick={() => handleRoleLogin(r)}
                  title={ui.loginAs(r.name)}
                >
                  <span className="rq-name">{r.name}</span>
                  <span className="rq-cred">{r.username}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — auth form */}
        <div className="auth-form-panel">
          {authStep === 'login' && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-head">
                <h3>{ui.welcomeBack}</h3>
                <p>{ui.signInSub}</p>
              </div>
              <div className="form-group">
                <label>{ui.userId}</label>
                <input type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{ui.password}</label>
                <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{ui.language}</label>
                <select className="form-select" value={lang} onChange={e => setLang(e.target.value)}>
                  <option value="en">English</option>
                  <option value="ml">മലയാളം</option>
                </select>
              </div>
              <div className="auth-row">
                <label style={{ display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" /> {ui.rememberMe}
                </label>
                <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setAuthStep('forgot')}>{ui.forgotPasswordQ}</span>
              </div>
              <button type="submit" className="btn btn-primary auth-submit">
                {ui.signIn} <ArrowRight size={16} />
              </button>
            </form>
          )}

          {authStep === 'forgot' && (
            <form onSubmit={handleForgotSend} className="auth-form">
              <div className="form-head">
                <h3>{ui.forgotHeading}</h3>
                <p>{ui.forgotSub}</p>
              </div>
              <div className="form-group">
                <label>{ui.userIdMobile}</label>
                <input type="text" className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary auth-submit">{ui.continueBtn} <ArrowRight size={16} /></button>
              <button type="button" className="btn btn-secondary" onClick={() => setAuthStep('login')}>{ui.backToLogin}</button>
            </form>
          )}

          {authStep === 'reset' && (
            <form onSubmit={handleResetPass} className="auth-form">
              <div className="form-head">
                <h3>{ui.resetHeading}</h3>
                <p>{ui.resetSub}</p>
              </div>
              <div className="form-group">
                <label>{ui.newPassword}</label>
                <input type="password" className="form-input" required />
              </div>
              <div className="form-group">
                <label>{ui.confirmPassword}</label>
                <input type="password" className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary auth-submit">{ui.savePassword}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
