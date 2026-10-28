import React, { useState } from 'react';
import Logo from './Logo';
import {
  X,
  Mail,
  Lock,
  User,
  Building,
  Truck,
  ArrowRight,
  CheckCircle,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';

/**
 * Pixel-perfect SVG brand icons for social login
 */
const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.24 5.41l4.04-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
    />
  </svg>
);

const MicrosoftIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 23 23" style={{ flexShrink: 0 }}>
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export default function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
  onNavigateHome
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [fleetSize, setFleetSize] = useState('10-50');
  const [role, setRole] = useState('Fleet Manager');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleSocialLogin = (provider) => {
    const demos = {
      Google: { name: 'Alex Henderson', email: 'alex.h@logistics.google.com', role: 'Fleet Manager', org: 'Google Cloud Logistics' },
      Microsoft: { name: 'Elena Rostova', email: 'elena.r@enterprise.msft.com', role: 'Super Admin', org: 'Microsoft Enterprise Fleet' },
      GitHub: { name: 'Jordan Chen', email: 'jordan.c@oct-devops.io', role: 'Dispatcher', org: 'GitHub Telematics Ops' }
    };
    const user = demos[provider] || demos.Google;
    setStatusMsg({
      type: 'success',
      text: `Authenticating with ${provider} SSO... Credentials verified!`
    });
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 700);
  };

  const handleLogoClick = () => {
    // STRICT REQUIREMENT: Logo inside authentication card is clickable -> Navigate to Home page
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleQuickDemo = (demoRole) => {
    const demos = {
      admin: { email: 'admin@octfleet.io', name: 'David Sterling', role: 'Super Admin', org: 'OCT Telematics Global' },
      manager: { email: 'manager@octfleet.io', name: 'Samantha Wright', role: 'Fleet Manager', org: 'Pacific Coast Logistics' },
      dispatcher: { email: 'dispatcher@octfleet.io', name: 'Carlos Mendez', role: 'Dispatcher', org: 'Metro Express Routing' },
      client: { email: 'client@logistics.com', name: 'Avery Sterling', role: 'Client Viewer', org: 'Apex Retail Partners' }
    };

    const target = demos[demoRole];
    if (target) {
      setEmail(target.email);
      setPassword('••••••••••••');
      setStatusMsg({ type: 'success', text: `Demo profile (${target.role}) pre-filled! Logging in...` });
      setTimeout(() => {
        onLoginSuccess({
          name: target.name,
          email: target.email,
          role: target.role,
          organization: target.org
        });
        onClose();
      }, 700);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'forgot') {
      if (!email) {
        setStatusMsg({ type: 'error', text: 'Please enter your registered email address.' });
        return;
      }
      setStatusMsg({
        type: 'success',
        text: `Reset instructions and telematics recovery link sent to ${email}!`
      });
      setTimeout(() => {
        setMode('login');
        setStatusMsg(null);
      }, 2500);
      return;
    }

    if (mode === 'register') {
      if (!email || !name) {
        setStatusMsg({ type: 'error', text: 'Please fill in your name and email.' });
        return;
      }
      const newUser = {
        name: name,
        email: email,
        role: role,
        organization: company || 'Fleet Operations Corp'
      };
      setStatusMsg({ type: 'success', text: `Account created successfully! Welcome ${name}.` });
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 800);
      return;
    }

    // Login mode
    if (!email) {
      setStatusMsg({ type: 'error', text: 'Please enter your account email.' });
      return;
    }
    const userRole = email.includes('admin')
      ? 'Super Admin'
      : email.includes('dispatcher')
      ? 'Dispatcher'
      : email.includes('client')
      ? 'Client Viewer'
      : 'Fleet Manager';

    const loggedUser = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: userRole,
      organization: 'West Coast Logistics Group'
    };

    setStatusMsg({ type: 'success', text: 'Authentication verified! Launching telematics cockpit...' });
    setTimeout(() => {
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  return (
    <div
      className="auth-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="auth-card-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '34px',
            height: '34px',
            borderRadius: '50%'
          }}
          aria-label="Close Authentication Dialog"
        >
          <X size={16} />
        </button>

        {/* STRICT REQUIREMENT: LOGO INSIDE AUTHENTICATION CARD / CONTAINER */}
        {/* MUST BE: CENTERED, CONSISTENT SIZING, PROPERLY SPACED, RESPONSIVE, NEVER OVERFLOW, CLICKABLE -> HOME */}
        <div className="auth-card-logo-wrapper">
          <div
            onClick={handleLogoClick}
            className="auth-card-logo-link"
            title="Return to Home Page"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogoClick();
              }
            }}
          >
            <Logo size="lg" isClickable={false} showSubtitle={true} />
          </div>
        </div>

        {/* Modal Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h2 id="auth-modal-title" style={{ fontSize: '1.4rem', marginBottom: '6px' }}>
            {mode === 'login' && 'Sign in to Telematics Suite'}
            {mode === 'register' && 'Deploy Fleet Management'}
            {mode === 'forgot' && 'Reset Telematics Credentials'}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {mode === 'login' && 'Enter your credentials or test with 1-click demo profiles'}
            {mode === 'register' && 'Setup your fleet workspace with automated compliance'}
            {mode === 'forgot' && 'Enter your verified email for encrypted recovery instructions'}
          </p>
        </div>

        {/* Feedback Message */}
        {statusMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              background:
                statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${
                statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'
              }`,
              color: statusMsg.type === 'success' ? 'var(--status-active)' : 'var(--status-danger)'
            }}
          >
            {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <ShieldAlert size={18} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Social Authentication Providers */}
        {mode !== 'forgot' && (
          <div style={{ marginBottom: '20px' }}>
            <div
              className="auth-social-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}
            >
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="btn-secondary"
                style={{
                  padding: '9px 8px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px'
                }}
                title="Continue with Google Workspace"
              >
                <GoogleIcon size={18} />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Microsoft')}
                className="btn-secondary"
                style={{
                  padding: '9px 8px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px'
                }}
                title="Continue with Microsoft 365 / Entra ID"
              >
                <MicrosoftIcon size={18} />
                <span>Microsoft</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="btn-secondary"
                style={{
                  padding: '9px 8px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px'
                }}
                title="Continue with GitHub Organization"
              >
                <GitHubIcon size={18} />
                <span>GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '18px 0 16px',
                gap: '12px'
              }}
            >
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600
                }}
              >
                Or continue with email
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Bradley"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                  <User
                    size={16}
                    color="var(--text-dim)"
                    style={{ position: 'absolute', left: '12px', top: '13px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company / Fleet Organization</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Logistics Freight Corp"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                  <Building
                    size={16}
                    color="var(--text-dim)"
                    style={{ position: 'absolute', left: '12px', top: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <label className="form-label">Fleet Size</label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className="form-select"
                  >
                    <option value="1-10">1 - 10 Vehicles</option>
                    <option value="10-50">10 - 50 Vehicles</option>
                    <option value="50-250">50 - 250 Commercial</option>
                    <option value="250+">250+ Enterprise Haul</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Initial Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Fleet Manager">Fleet Manager</option>
                    <option value="Dispatcher">Dispatcher</option>
                    <option value="Client Viewer">Client Viewer</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Work Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fleet.ops@octsmart.io"
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
              <Mail
                size={16}
                color="var(--text-dim)"
                style={{ position: 'absolute', left: '12px', top: '13px' }}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setStatusMsg(null); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-primary)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'Create secure password' : '••••••••••••'}
                  className="form-input"
                  style={{ paddingLeft: '38px', paddingRight: '42px' }}
                />
                <Lock
                  size={16}
                  color="var(--text-dim)"
                  style={{ position: 'absolute', left: '12px', top: '13px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px' }}
          >
            {mode === 'login' && 'Sign In to Cockpit'}
            {mode === 'register' && 'Deploy Free Telematics Trial'}
            {mode === 'forgot' && 'Send Recovery Instructions'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* 1-Click Fast Demo Switcher for Evaluation */}
        {mode === 'login' && (
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-dim)',
                marginBottom: '10px',
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              Instant 1-Click Access Demo Roles
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '7px 8px' }}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('manager')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '7px 8px' }}
              >
                Fleet Manager
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('dispatcher')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '7px 8px' }}
              >
                Dispatcher
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('client')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '7px 8px' }}
              >
                Client Viewer
              </button>
            </div>
          </div>
        )}

        {/* Card Footer Switchers */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {mode === 'login' && (
            <span>
              Don't have an enterprise account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setStatusMsg(null); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Sign Up Now
              </button>
            </span>
          )}

          {mode === 'register' && (
            <span>
              Already managing fleet units?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setStatusMsg(null); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Sign In
              </button>
            </span>
          )}

          {mode === 'forgot' && (
            <span>
              Remembered your password?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setStatusMsg(null); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Back to Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
