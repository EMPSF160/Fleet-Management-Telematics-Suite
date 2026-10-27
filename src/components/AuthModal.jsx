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
  ShieldAlert
} from 'lucide-react';

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
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [fleetSize, setFleetSize] = useState('10-50');
  const [role, setRole] = useState('Fleet Manager');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
                <Lock
                  size={16}
                  color="var(--text-dim)"
                  style={{ position: 'absolute', left: '12px', top: '13px' }}
                />
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
