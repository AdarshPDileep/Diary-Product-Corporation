import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Auth({
  authStep, setAuthStep, username, setUsername, password, setPassword,
  lang, setLang, handleLogin, handleForgotSend, handleResetPass,
  demoRoles, handleRoleLogin, t
}) {
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
            <p className="tagline">Farmer Scheme ERP · Trivandrum Region Co-operative Milk Producers Union. Pick a role below to explore the portal with sample data.</p>
          </div>

          <div className="role-quick">
            <div className="role-quick-title">Quick Demo Logins — click to enter</div>
            <div className="role-quick-grid">
              {demoRoles.map(r => (
                <button
                  key={r.name}
                  type="button"
                  className="role-quick-item"
                  onClick={() => handleRoleLogin(r)}
                  title={`Login as ${r.name}`}
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
                <h3>Welcome Back</h3>
                <p>Sign in with your credentials, or use a role on the left.</p>
              </div>
              <div className="form-group">
                <label>User ID</label>
                <input type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Language / ഭാഷ</label>
                <select className="form-select" value={lang} onChange={e => setLang(e.target.value)}>
                  <option value="en">English</option>
                  <option value="ml">മലയാളം</option>
                </select>
              </div>
              <div className="auth-row">
                <label style={{ display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" /> Remember Me
                </label>
                <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setAuthStep('forgot')}>Forgot Password?</span>
              </div>
              <button type="submit" className="btn btn-primary auth-submit">
                Sign In <ArrowRight size={16} />
              </button>
            </form>
          )}

          {authStep === 'forgot' && (
            <form onSubmit={handleForgotSend} className="auth-form">
              <div className="form-head">
                <h3>Forgot Password</h3>
                <p>Enter your registered User ID or mobile to reset.</p>
              </div>
              <div className="form-group">
                <label>User ID / Mobile</label>
                <input type="text" className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary auth-submit">Continue <ArrowRight size={16} /></button>
              <button type="button" className="btn btn-secondary" onClick={() => setAuthStep('login')}>Back to Login</button>
            </form>
          )}

          {authStep === 'reset' && (
            <form onSubmit={handleResetPass} className="auth-form">
              <div className="form-head">
                <h3>Reset Password</h3>
                <p>Choose a new password for your account.</p>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-input" required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary auth-submit">Save Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
