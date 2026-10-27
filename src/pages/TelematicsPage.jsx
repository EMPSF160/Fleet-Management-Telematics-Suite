import React, { useState } from 'react';
import {
  Activity,
  Cpu,
  AlertOctagon,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Award,
  Clock,
  Gauge,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  CheckCircle,
  Truck
} from 'lucide-react';
import { DRIVER_LEADERBOARD } from '../data/mockData';

export default function TelematicsPage({ vehicles }) {
  const [activeTab, setActiveTab] = useState('diagnostics'); // 'diagnostics' | 'driver-safety' | 'fuel-analytics' | 'route-replay'
  const [replaySlider, setReplaySlider] = useState(45);
  const [selectedReplayVehicle, setSelectedReplayVehicle] = useState('FL-101');
  const [clearedDtc, setClearedDtc] = useState(false);

  // OBD-II Diagnostic Trouble Codes repository
  const [dtcList, setDtcList] = useState([
    {
      code: 'P0128',
      vehicleId: 'FL-104 (Volvo VNL 860)',
      subsystem: 'Powertrain - Engine Cooling',
      severity: 'Medium',
      description: 'Coolant Thermostat Temperature Below Regulating Level',
      remedy: 'Inspect thermostat spring valve and coolant level sensor.'
    },
    {
      code: 'P0299',
      vehicleId: 'FL-104 (Volvo VNL 860)',
      subsystem: 'Powertrain - Induction',
      severity: 'High',
      description: 'Turbocharger / Supercharger Underboost Condition',
      remedy: 'Check intercooler charge air piping clamps for boost pressure leak.'
    },
    {
      code: 'P0562',
      vehicleId: 'FL-208 (Mercedes Sprinter)',
      subsystem: 'Electrical System - CAN Battery',
      severity: 'High',
      description: 'System Voltage Low (11.9V measured)',
      remedy: 'Test alternator diode pack and test auxiliary start battery state of charge.'
    },
    {
      code: 'P0420',
      vehicleId: 'FL-622 (Isuzu NPR-HD)',
      subsystem: 'Emissions / Aftertreatment',
      severity: 'Low',
      description: 'Catalyst System Efficiency Below Threshold (Bank 1)',
      remedy: 'Inspect upstream O2 sensor and particulate filter soot load.'
    }
  ]);

  const handleClearDtc = () => {
    if (window.confirm('Dispatch OBD-II Mode $04 Clear Diagnostic Trouble Codes to vehicle ECU gateways?')) {
      setClearedDtc(true);
      setTimeout(() => {
        setDtcList([]);
      }, 1000);
    }
  };

  // Replay metrics based on slider (0 - 100%)
  const replayHours = Math.floor(8 + (replaySlider * 8.5) / 100);
  const replayMinutes = Math.floor(((replaySlider * 8.5 * 60) / 100) % 60);
  const replayTimeStr = `${replayHours.toString().padStart(2, '0')}:${replayMinutes.toString().padStart(2, '0')} PST`;
  const replaySpeed = Math.round(50 + Math.sin(replaySlider / 4) * 18);
  const replayFuelUsed = (12.4 + (replaySlider * 0.42)).toFixed(1);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Telematics & OBD-II Diagnostics</h1>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--accent-primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)'
            }}
          >
            SAE J1939 / CAN 2.0B
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Real-time ECU sensor telemetry, active fault codes, driver safety scoring, and trip scrubber.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px'
        }}
      >
        {[
          { id: 'diagnostics', label: 'OBD-II Fault Codes', icon: Cpu },
          { id: 'driver-safety', label: 'Driver Safety Scorecard', icon: ShieldCheck },
          { id: 'fuel-analytics', label: 'Fuel & EV Energy Analytics', icon: Zap },
          { id: 'route-replay', label: 'Trip Route Replay Scrubber', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={isActive ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OBD-II Fault Codes & DTC */}
      {activeTab === 'diagnostics' && (
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '18px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>Active Diagnostic Trouble Codes (DTC)</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Ingested directly from commercial ECU gateways via OBD-II Mode $03 & J1939 broadcast.
              </p>
            </div>
            {dtcList.length > 0 && (
              <button
                onClick={handleClearDtc}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 14px', color: 'var(--status-danger)' }}
              >
                <AlertOctagon size={15} />
                <span>Reset / Clear Diagnostic Codes</span>
              </button>
            )}
          </div>

          {dtcList.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                padding: '48px',
                textAlign: 'center',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}
            >
              <CheckCircle size={48} color="var(--status-active)" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Clean ECU Telemetry - No Fault Codes</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
                All 8 fleet vehicles report 0 active Check Engine Light or Powertrain DTC codes. Continuous sampling is active.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {dtcList.map((dtc, idx) => (
                <div
                  key={idx}
                  className="glass-panel dtc-card-grid"
                  style={{
                    padding: '20px',
                    display: 'grid',
                    gridTemplateColumns: '120px minmax(200px, 1fr) 1fr 140px',
                    gap: '16px',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        color: dtc.severity === 'High' ? 'var(--status-danger)' : 'var(--status-warning)'
                      }}
                    >
                      {dtc.code}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        marginTop: '2px'
                      }}
                    >
                      {dtc.subsystem}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dtc.description}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '2px' }}>
                      Vehicle: {dtc.vehicleId}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '10px', borderRadius: '8px' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                      Mechanic Action Required:
                    </strong>
                    {dtc.remedy}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      className={`badge badge-${
                        dtc.severity === 'High' ? 'danger' : 'warning'
                      }`}
                    >
                      {dtc.severity} Severity
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Driver Safety Scorecard */}
      {activeTab === 'driver-safety' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Driver Behavior & Safety Scoring</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Scores updated dynamically based on 3-axis telematics sensors (Harsh Braking &gt; 0.45g, Speeding &gt; 5mph over zone).
            </p>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rank</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Driver Name</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Unit</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Safety Score</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Miles Logged</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Harsh Brakes</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Speeding Events</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_LEADERBOARD.map((d) => (
                  <tr key={d.rank} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '14px 18px' }}>
                      {d.rank === 1 ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: 800 }}>
                          <Award size={16} /> #1
                        </div>
                      ) : (
                        <span style={{ fontWeight: 600, color: 'var(--text-dim)' }}>#{d.rank}</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>{d.name}</td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{d.vehicle}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        className="mono-number"
                        style={{
                          fontWeight: 800,
                          fontSize: '1rem',
                          color: d.score >= 90 ? 'var(--status-active)' : d.score >= 80 ? 'var(--status-warning)' : 'var(--status-danger)'
                        }}
                      >
                        {d.score} / 100
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{d.miles}</td>
                    <td style={{ padding: '14px 18px', color: d.harshBrakes > 4 ? 'var(--status-danger)' : 'var(--text-main)' }}>
                      {d.harshBrakes}
                    </td>
                    <td style={{ padding: '14px 18px', color: d.speedingEvents > 2 ? 'var(--status-danger)' : 'var(--text-main)' }}>
                      {d.speedingEvents}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Fuel & Energy Efficiency */}
      {activeTab === 'fuel-analytics' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div className="glass-panel" style={{ padding: '22px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                Avg Fleet Efficiency
              </span>
              <div className="mono-number" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-active)', marginTop: '4px' }}>
                7.4 MPG / 1.05 kWh
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                +14.2% improvement vs industry benchmark
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '22px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                Idle Time Reduction
              </span>
              <div className="mono-number" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px' }}>
                18.4 hrs saved
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Estimated $1,460 diesel saved this billing cycle
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '22px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                EV Fleet Charge Health
              </span>
              <div className="mono-number" style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                99.1%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Lithium iron phosphate packs in nominal balancing
              </div>
            </div>
          </div>

          {/* SVG Telematics Trend Chart */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
              7-Day Fleet Fuel Economy Trend (MPG vs Average Speed)
            </h3>
            <div style={{ height: '220px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 700 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal reference lines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="var(--border-subtle)" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="700" y2="90" stroke="var(--border-subtle)" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="700" y2="140" stroke="var(--border-subtle)" strokeDasharray="4 4" />

                {/* Area and Line for Fuel Economy */}
                <path
                  d="M 20 120 Q 120 70 240 90 T 460 50 T 680 40 L 680 180 L 20 180 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M 20 120 Q 120 70 240 90 T 460 50 T 680 40"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="3"
                />
                {/* Data points */}
                <circle cx="20" cy="120" r="5" fill="var(--accent-primary)" />
                <circle cx="240" cy="90" r="5" fill="var(--accent-primary)" />
                <circle cx="460" cy="50" r="5" fill="var(--accent-primary)" />
                <circle cx="680" cy="40" r="5" fill="var(--accent-primary)" />
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.78rem', marginTop: '8px' }}>
              <span>Mon (6.2 MPG)</span>
              <span>Wed (6.8 MPG)</span>
              <span>Fri (7.1 MPG)</span>
              <span>Sun (7.4 MPG)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Trip Route Replay Scrubber */}
      {activeTab === 'route-replay' && (
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Interactive Trip History Scrubber</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Reconstruct any historical corridor route down to the exact second.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={selectedReplayVehicle}
                onChange={(e) => setSelectedReplayVehicle(e.target.value)}
                className="form-select"
                style={{ width: '220px' }}
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id} - {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Scrubber Slider */}
          <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Replay Timestamp:</span>
                <span className="mono-number" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {replayTimeStr}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Timeline: 08:00 AM &rarr; 05:00 PM
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={replaySlider}
              onChange={(e) => setReplaySlider(+e.target.value)}
              style={{
                width: '100%',
                height: '8px',
                accentColor: 'var(--accent-primary)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Reconstructed Telemetry at Scrubber Position */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>RECORDED SPEED</span>
              <div className="mono-number" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '2px' }}>
                {replaySpeed} MPH
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Posted Limit: 65 MPH</div>
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CUMULATIVE FUEL</span>
              <div className="mono-number" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--status-active)', marginTop: '2px' }}>
                {replayFuelUsed} GAL
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Flow: 7.2 Gal/hr</div>
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>APPROX LOCATION</span>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '4px' }}>
                Milepost 184.2, I-5 North
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Heading 352&deg; (Northbound)</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .dtc-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
