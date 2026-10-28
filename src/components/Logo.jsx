import React from 'react';

/**
 * Reusable OCT Smart Fleet Logo component.
 * Can be wrapped with a clickable handler (e.g. to navigate Home).
 */
export default function Logo({ size = 'md', onClick, isClickable = true, showSubtitle = true }) {
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 56
  };

  const pixelSize = iconSizes[size] || 38;

  const content = (
    <div
      className="logo-container"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? '8px' : '12px',
        cursor: isClickable ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      onClick={isClickable && onClick ? onClick : undefined}
      title={isClickable ? 'Navigate to Home' : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* High-Tech Vector Mark */}
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 64 64"
        fill="none"
        className="logo-mark"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.4))' }}
      >
        <defs>
          <linearGradient id={`logoGrad-${size}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-primary, #06b6d4)" />
            <stop offset="50%" stopColor="var(--accent-secondary, #3b82f6)" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="16"
          fill="var(--bg-secondary, #0b132b)"
          stroke={`url(#logoGrad-${size})`}
          strokeWidth="2.5"
        />
        {/* Telemetry Radar Circles */}
        <circle cx="32" cy="32" r="20" stroke="var(--accent-primary, #38bdf8)" strokeOpacity="0.3" strokeDasharray="3 3" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="13" stroke="#818cf8" strokeOpacity="0.4" strokeWidth="1.2" />
        {/* Telematics Fleet Vector Chevron */}
        <path d="M32 15L45 43L32 37L19 43L32 15Z" fill={`url(#logoGrad-${size})`} />
        <circle cx="32" cy="35" r="2.8" fill="#ffffff" />
        {/* Signal indicator */}
        <circle cx="44" cy="19" r="3" fill="var(--status-active, #10b981)" />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            className="logo-title"
            style={{
              fontSize: size === 'sm' ? '1rem' : size === 'lg' ? '1.45rem' : size === 'xl' ? '1.75rem' : '1.2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'var(--accent-gradient, linear-gradient(135deg, #06b6d4, #3b82f6))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            OCT Smart
          </span>
          <span
            className="logo-badge"
            style={{
              fontSize: size === 'sm' ? '0.65rem' : '0.72rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--accent-primary, #06b6d4)',
              border: '1px solid var(--border-subtle)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap'
            }}
          >
            v2.6
          </span>
        </div>
        {showSubtitle && (
          <span
            className="logo-subtitle"
            style={{
              fontSize: size === 'sm' ? '0.65rem' : '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text-muted, #94a3b8)',
              textTransform: 'uppercase',
              marginTop: '2px',
              whiteSpace: 'nowrap'
            }}
          >
            Fleet & Telematics Suite
          </span>
        )}
      </div>
    </div>
  );

  return content;
}
