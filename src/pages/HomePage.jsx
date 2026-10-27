import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Activity,
  ShieldCheck,
  Zap,
  TrendingUp,
  Truck,
  Gauge,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Check,
  CheckCircle2,
  Users,
  Compass,
  FileText
} from 'lucide-react';

export default function HomePage({ onNavigate, onOpenAuth }) {
  // Live simulated telemetry stream for the hero teaser
  const [telemetryTick, setTelemetryTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick((prev) => (prev + 1) % 60);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Active Monitored Fleets', value: '14,800+', sub: 'Heavy & light commercial' },
    { label: 'Telemetry Ingestion Rate', value: '1.2M pings/min', sub: 'Sub-second latency' },
    { label: 'Fuel & Idle Savings', value: '23.4%', sub: 'Avg per customer fleet' },
    { label: 'Safety Compliance', value: '99.98%', sub: 'FMCSA & DOT ELD certified' }
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Precision Telematics GPS',
      desc: 'Sub-meter multi-constellation GNSS tracking with real-time heading, geo-fencing breach alarms, and automated corridor route replay.'
    },
    {
      icon: Cpu,
      title: 'Predictive OBD-II Diagnostics',
      desc: 'Continuous CAN-bus & J1939 ECU polling. Catch DTC fault codes, battery voltage drop, and cooling anomalies before roadside breakdowns.'
    },
    {
      icon: Activity,
      title: 'Driver Safety Scorecard',
      desc: 'Automated 3-axis accelerometer analytics detecting harsh acceleration, aggressive cornering, excessive idling, and speeding events.'
    },
    {
      icon: ShieldCheck,
      title: 'Digital DVIR & Compliance',
      desc: 'Paperless pre-trip and post-trip Driver Vehicle Inspection Reports with instant cloud signatures, defect flagging, and work order creation.'
    },
    {
      icon: FileText,
      title: 'Instant Multi-Format Exports',
      desc: 'One-click automated exports in CSV, styled PDF audit sheets, and REST JSON for accounting, logistics billing, and compliance archives.'
    },
    {
      icon: Users,
      title: 'Role-Based Client Portals',
      desc: 'Multi-tenant client access control. Give shippers and branch managers scoped read-only tracking while dispatchers optimize routes.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter Fleet',
      price: '$19',
      period: 'per vehicle / mo',
      desc: 'Ideal for local delivery vans and small service fleets up to 15 vehicles.',
      features: [
        'Live GPS tracking (30s ping)',
        'Basic speed & route history',
        'Geofence alerts (up to 10)',
        'Standard CSV export',
        'Mobile web access'
      ],
      popular: false
    },
    {
      name: 'Pro Telematics',
      price: '$39',
      period: 'per vehicle / mo',
      desc: 'Complete telematics intelligence for mid-market carriers and mixed fleets.',
      features: [
        'Real-time GPS (3s high-rate ping)',
        'CAN-Bus & OBD-II ECU telemetry',
        'Driver safety AI scoring',
        'Automated digital DVIR & work orders',
        'CSV, PDF & JSON Export Hub',
        'Unlimited geofence zones'
      ],
      popular: true
    },
    {
      name: 'Enterprise Fleet',
      price: '$69',
      period: 'per vehicle / mo',
      desc: 'Full-stack enterprise solution with multi-tenant client portals & API.',
      features: [
        'Continuous 10Hz sub-second telemetry',
        'Predictive maintenance AI engine',
        'Client Access Control & white-label portal',
        'Dedicated account engineer',
        'FMCSA ELD integration guarantee',
        'Custom ERP / TMS REST API sync'
      ],
      popular: false
    }
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '60px 24px 50px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid var(--border-glow)',
              color: 'var(--accent-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            <Sparkles size={14} />
            <span>Next-Generation Fleet Intelligence Platform</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
              lineHeight: 1.15,
              marginBottom: '20px',
              fontWeight: 800
            }}
          >
            Autonomous Telematics & High-Fidelity{' '}
            <span
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Fleet Management
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '560px'
            }}
          >
            Empower dispatchers, mechanics, and logistics executives with real-time GPS telemetry, predictive ECU diagnostics, automated DVIR inspections, and granular client access controls.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn-primary"
              style={{ padding: '13px 24px', fontSize: '0.98rem' }}
            >
              <Compass size={18} />
              <span>Launch Live Fleet Map</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="btn-secondary"
              style={{ padding: '13px 22px', fontSize: '0.98rem' }}
            >
              <span>Deploy Free Trial</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--status-active)" />
              <span>No hardware lock-in</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--status-active)" />
              <span>5-Minute OBD-II Setup</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Telematics Cockpit Preview */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--status-active)'
                }}
                className="radar-ping"
              />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Live Telematics Stream</span>
            </div>
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-mono)',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'var(--bg-surface)'
              }}
            >
              PORT 8089 // CAN-BUS 2.0B
            </span>
          </div>

          {/* Simulated Active Vehicle Ping Card */}
          <div
            style={{
              background: 'var(--bg-surface)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>STREAMING UNIT</span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  Freightliner Cascadia #FL-101
                </div>
              </div>
              <span className="badge badge-active">In Transit</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>GPS VELOCITY</span>
                <div className="mono-number" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {62 + (telemetryTick % 5)} <span style={{ fontSize: '0.75rem' }}>MPH</span>
                </div>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>COOLANT TEMP</span>
                <div className="mono-number" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {194 + (telemetryTick % 3)} <span style={{ fontSize: '0.75rem' }}>&deg;F</span>
                </div>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>FUEL LEVEL</span>
                <div className="mono-number" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--status-active)' }}>
                  78%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Route Corridor Mini Map SVG */}
          <div
            style={{
              background: 'var(--bg-primary)',
              borderRadius: '12px',
              padding: '14px',
              position: 'relative',
              overflow: 'hidden',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* SVG Grid Map */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border-subtle)" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />
              {/* Animated corridor path */}
              <path
                d="M 30 110 Q 120 40, 220 90 T 360 40"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <circle cx="220" cy="90" r="7" fill="var(--accent-primary)" />
              <circle cx="220" cy="90" r="14" fill="var(--accent-primary)" opacity="0.25" />
            </svg>
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                background: 'rgba(11, 19, 43, 0.85)',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-glow)',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Compass size={14} color="var(--accent-primary)" />
              <span>West Coast Corridor // Route Active</span>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Encrypted TLS 1.3 Telemetry Feed
            </span>
            <button
              onClick={() => onNavigate('telematics')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Inspect ECU Diagnostics →
            </button>
          </div>
        </div>
      </section>

      {/* KPI Stats Bar */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '36px 24px'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}
        >
          {stats.map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div
                className="mono-number"
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  marginBottom: '4px'
                }}
              >
                {item.value}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Modular Features Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '70px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '14px' }}>
            Engineered for Industrial Telematics Performance
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
            Built from the ground up for commercial trucking, delivery fleets, and equipment operators requiring zero-latency tracking and compliance automation.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '24px'
          }}
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700 }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Plans */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '70px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '12px' }}>
              Transparent SaaS Pricing for Fleets of Any Size
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Scale effortlessly from 5 vans to 5,000 intermodal commercial haulers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px'
            }}
          >
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '32px',
                  borderRadius: '18px',
                  position: 'relative',
                  border: tier.popular ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {tier.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-13px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent-gradient)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Most Popular Choice
                  </div>
                )}

                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{tier.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', minHeight: '40px' }}>
                  {tier.desc}
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <span className="mono-number" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginLeft: '6px' }}>
                    {tier.period}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '28px', flex: 1 }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        <Check size={16} color="var(--status-active)" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onOpenAuth('register')}
                  className={tier.popular ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', padding: '12px' }}
                >
                  Choose {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ maxWidth: '1200px', margin: '60px auto 0 auto', padding: '0 24px' }}>
        <div
          className="glass-panel"
          style={{
            padding: '48px 36px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.12) 100%)',
            border: '1px solid var(--border-glow)'
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: '14px' }}>
            Ready to Modernize Your Fleet Telematics?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto 28px auto' }}>
            Join over 14,000 active commercial transport vehicles utilizing OCT Smart Telematics for real-time safety, fuel savings, and automated client reporting.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn-primary"
              style={{ padding: '13px 28px', fontSize: '1rem' }}
            >
              Open Live Fleet Map
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="btn-secondary"
              style={{ padding: '13px 24px', fontSize: '1rem' }}
            >
              Client Login Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
