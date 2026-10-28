import React, { useState } from 'react';
import Logo from './Logo';
import {
  MapPin,
  Activity,
  Wrench,
  FileSpreadsheet,
  Home,
  Palette,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  currentTheme,
  onThemeChange,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'dashboard', label: 'Live Map', icon: MapPin },
    { id: 'telematics', label: 'Telematics', icon: Activity },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'reports', label: 'Reports & Access', icon: FileSpreadsheet }
  ];

  const themes = [
    { id: 'cyber-blue', name: 'Cyber Fleet', color: '#06b6d4' },
    { id: 'emerald-eco', name: 'Emerald Eco', color: '#10b981' },
    { id: 'solar-amber', name: 'Solar Amber', color: '#f59e0b' },
    { id: 'daylight-light', name: 'Daylight Light', color: '#0284c7' }
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div
        className="navbar-inner"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Logo - Clickable to Home */}
        <div style={{ flexShrink: 0, minWidth: 0 }}>
          <Logo size="md" onClick={() => handleNavClick('home')} />
        </div>

        {/* Desktop 5-Page Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-primary)',
            padding: '5px 8px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            flexShrink: 0
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? 'var(--accent-gradient)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(6, 182, 212, 0.3)' : 'none',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-main)';
                    e.currentTarget.style.background = 'var(--bg-surface)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Theme Switcher + Auth / User Controls */}
        <div
          className="navbar-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0
          }}
        >
          {/* Theme Color Change Icon Button */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="btn-icon theme-toggle-btn"
              title="Change Theme Color Palette"
              aria-label="Toggle Theme Menu"
              style={{
                position: 'relative'
              }}
            >
              <Palette size={18} />
              <div
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  border: '1.5px solid var(--bg-surface)'
                }}
              />
            </button>

            {/* Theme Dropdown Menu */}
            {themeDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  minWidth: '180px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: '12px',
                  padding: '8px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                  zIndex: 200,
                  animation: 'fadeIn 0.2s ease'
                }}
              >
                <div
                  style={{
                    padding: '6px 10px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-dim)',
                    fontWeight: 700
                  }}
                >
                  Theme Palette
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                      setThemeDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: currentTheme === t.id ? 'var(--bg-surface-hover)' : 'transparent',
                      color: currentTheme === t.id ? 'var(--accent-primary)' : 'var(--text-main)',
                      fontSize: '0.85rem',
                      fontWeight: currentTheme === t.id ? 600 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: t.color,
                          display: 'inline-block'
                        }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {currentTheme === t.id && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Section */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <div
                style={{
                  display: 'none',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  lineHeight: 1.2
                }}
                className="user-profile-badge"
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {currentUser.name}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="btn-secondary signout-btn"
                title="Log Out"
                style={{ padding: '8px 12px', fontSize: '0.825rem', flexShrink: 0 }}
              >
                <LogOut size={15} />
                <span className="hide-on-mobile">Sign Out</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn-secondary signin-btn"
                style={{ padding: '8px 14px', fontSize: '0.85rem', flexShrink: 0 }}
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn-primary trial-btn"
                style={{ padding: '8px 16px', fontSize: '0.85rem', flexShrink: 0 }}
              >
                <Sparkles size={15} />
                <span className="hide-on-mobile">Start Free Trial</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-toggle"
            aria-label="Toggle Mobile Navigation"
            title="Navigation Menu"
            style={{ flexShrink: 0 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            padding: '16px 20px 24px 20px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'var(--accent-gradient)' : 'var(--bg-surface)',
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Drawer Extra Actions: User Info or Free Trial button */}
          <div
            style={{
              marginTop: '12px',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {currentUser ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  background: 'var(--bg-surface)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      {currentUser.role} • {currentUser.organization}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
                >
                  <Sparkles size={16} />
                  <span>Start Free Trial</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Responsive Inline CSS overrides */}
      <style>{`
        /* Desktop Navigation visibility at >= 860px */
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .user-profile-badge {
            display: flex !important;
          }
        }

        /* 1024px and Mid-Range Tablet/Laptop Optimization (860px - 1180px) */
        @media (min-width: 860px) and (max-width: 1180px) {
          .navbar-inner {
            padding: 10px 14px !important;
            gap: 10px !important;
          }
          .logo-subtitle {
            display: none !important;
          }
          .desktop-nav {
            gap: 3px !important;
            padding: 4px 6px !important;
          }
          .desktop-nav .nav-link-btn {
            padding: 6px 9px !important;
            font-size: 0.81rem !important;
            gap: 5px !important;
          }
          .desktop-nav .nav-link-btn svg {
            width: 14px !important;
            height: 14px !important;
          }
          .user-profile-badge {
            max-width: 115px !important;
          }
          .user-profile-badge span:first-child {
            font-size: 0.8rem !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .user-profile-badge span:last-child {
            font-size: 0.65rem !important;
          }
          .signout-btn {
            padding: 6px 10px !important;
            font-size: 0.8rem !important;
          }
          .trial-btn {
            padding: 6px 12px !important;
            font-size: 0.82rem !important;
          }
          .signin-btn {
            padding: 6px 10px !important;
            font-size: 0.82rem !important;
          }
        }

        /* Mobile Responsive Breakpoints (< 860px) */
        @media (max-width: 859px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: inline-flex !important;
          }
        }

        /* Small Screen / Mobile Breakpoint (< 480px) */
        @media (max-width: 480px) {
          .navbar-inner {
            padding: 8px 12px !important;
            gap: 8px !important;
          }
          .logo-subtitle {
            display: none !important;
          }
          .logo-mark {
            width: 34px !important;
            height: 34px !important;
          }
          .logo-title {
            font-size: 1.05rem !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
          .trial-btn {
            display: none !important;
          }
          .signin-btn {
            padding: 6px 10px !important;
            font-size: 0.8rem !important;
          }
          .signout-btn {
            padding: 6px 8px !important;
            font-size: 0.8rem !important;
          }
          .theme-toggle-btn, .mobile-menu-toggle {
            width: 36px !important;
            height: 36px !important;
          }
        }

        /* Extra Compact for Mobile 360px & Under */
        @media (max-width: 360px) {
          .navbar-inner {
            padding: 6px 8px !important;
            gap: 6px !important;
          }
          .navbar-actions {
            gap: 6px !important;
          }
          .logo-title {
            font-size: 0.95rem !important;
          }
          .logo-badge {
            font-size: 0.6rem !important;
            padding: 1px 4px !important;
          }
          .logo-mark {
            width: 30px !important;
            height: 30px !important;
          }
          .signin-btn {
            padding: 5px 8px !important;
            font-size: 0.76rem !important;
          }
          .theme-toggle-btn, .mobile-menu-toggle {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>
    </header>
  );
}
