import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Truck,
  Gauge,
  Battery,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Compass,
  Search,
  Filter,
  X,
  Radio,
  Maximize2,
  Play,
  Pause,
  RotateCcw,
  Zap
} from 'lucide-react';

export default function DashboardPage({ vehicles, setVehicles, alerts }) {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0] || null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(true);
  const [mapZoom, setMapZoom] = useState(1);

  // Live simulation: update vehicle positions and speeds smoothly
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status === 'Idle') return v;
          // small random speed variation
          const speedDelta = (Math.random() - 0.48) * 2;
          const newSpeed = Math.max(25, Math.min(79, Math.round(v.speed + speedDelta)));
          // slight position drift along heading
          const latDelta = (Math.random() - 0.5) * 0.0015;
          const lngDelta = (Math.random() - 0.5) * 0.0015;

          return {
            ...v,
            speed: newSpeed,
            lat: +(v.lat + latDelta).toFixed(4),
            lng: +(v.lng + lngDelta).toFixed(4),
            lastPing: 'Just now'
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulating, setVehicles]);

  // Keep selectedVehicle in sync
  useEffect(() => {
    if (selectedVehicle) {
      const updated = vehicles.find((v) => v.id === selectedVehicle.id);
      if (updated) setSelectedVehicle(updated);
    }
  }, [vehicles]);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    const matchesSearch =
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = vehicles.filter((v) => v.status === 'Active').length;
  const warningCount = vehicles.filter((v) => v.status === 'Warning').length;
  const idleCount = vehicles.filter((v) => v.status === 'Idle').length;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px 60px 20px' }}>
      {/* Top Header & Simulation Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Live Fleet Telematics Radar</h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: isSimulating ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                color: isSimulating ? 'var(--status-active)' : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isSimulating ? 'var(--status-active)' : 'var(--text-dim)'
                }}
                className={isSimulating ? 'radar-ping' : ''}
              />
              {isSimulating ? 'Live GNSS Stream (3s)' : 'Telemetry Stream Paused'}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Multi-constellation GPS tracking, CAN-Bus vehicle sensors & geofence monitor.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            {isSimulating ? <Pause size={15} /> : <Play size={15} />}
            <span>{isSimulating ? 'Pause Stream' : 'Resume Live Pings'}</span>
          </button>
        </div>
      </div>

      {/* KPI Status Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Monitored Units
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
            {vehicles.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            100% OBD-II Connected
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-active)', textTransform: 'uppercase', fontWeight: 600 }}>
            En Route / Active
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-active)', marginTop: '4px' }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Avg Velocity: 59.4 MPH
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-warning)', textTransform: 'uppercase', fontWeight: 600 }}>
            Active DTC & Warnings
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-warning)', marginTop: '4px' }}>
            {warningCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Speed & Diagnostic Alerts
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-idle)', textTransform: 'uppercase', fontWeight: 600 }}>
            Idle & Loading
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-idle)', marginTop: '4px' }}>
            {idleCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Staged at Logistic Depots
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Vehicle Drawer Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedVehicle ? 'minmax(340px, 1fr) 380px' : '1fr',
          gap: '24px',
          alignItems: 'start'
        }}
        className="dashboard-main-grid"
      >
        {/* Interactive Vector Map Radar Canvas */}
        <div className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
          {/* Map Controls Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="var(--accent-primary)" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Pacific Gateway Corridor Map</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setMapZoom(Math.max(0.8, mapZoom - 0.2))}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                title="Zoom Out"
              >
                -
              </button>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {Math.round(mapZoom * 100)}%
              </span>
              <button
                onClick={() => setMapZoom(Math.min(1.6, mapZoom + 0.2))}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                title="Zoom In"
              >
                +
              </button>
            </div>
          </div>

          {/* Map Surface Viewport */}
          <div
            style={{
              height: '460px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              cursor: 'crosshair'
            }}
          >
            {/* SVG Cartographic Grid & Highways */}
            <svg
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                inset: 0,
                transform: `scale(${mapZoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.3s ease'
              }}
            >
              <defs>
                <pattern id="telematicsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" strokeWidth="0.6" opacity="0.6" />
                </pattern>
                {/* Coastal Line Contour */}
              </defs>
              <rect width="100%" height="100%" fill="url(#telematicsGrid)" />

              {/* Major Highway Corridors */}
              <path
                d="M 50 420 Q 280 340 450 200 T 820 40"
                fill="none"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="12"
              />
              <path
                d="M 50 420 Q 280 340 450 200 T 820 40"
                fill="none"
                stroke="rgba(6, 182, 212, 0.6)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />
              {/* Secondary Highway Spur */}
              <path
                d="M 280 340 Q 380 400 680 360"
                fill="none"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="8"
              />

              {/* Geofence Circles */}
              <circle cx="450" cy="200" r="75" fill="rgba(6, 182, 212, 0.06)" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="4 4" />
              <text x="400" y="140" fill="var(--accent-primary)" fontSize="10" fontWeight="600">GEOFENCE: METRO HUB</text>

              <circle cx="240" cy="360" r="60" fill="rgba(16, 185, 129, 0.06)" stroke="var(--status-active)" strokeWidth="1" strokeDasharray="4 4" />
              <text x="200" y="315" fill="var(--status-active)" fontSize="10" fontWeight="600">PORT FACILITY TERMINAL</text>

              {/* Vehicle Markers */}
              {filteredVehicles.map((v, i) => {
                // Map coordinates conversion to canvas space
                const xCoord = 120 + ((v.lng + 122.45) * 2200) + (i * 35);
                const yCoord = 400 - ((v.lat - 37.60) * 1200) - (i * 15);
                const isSelected = selectedVehicle?.id === v.id;
                const statusColor =
                  v.status === 'Active'
                    ? 'var(--status-active)'
                    : v.status === 'Warning'
                    ? 'var(--status-warning)'
                    : 'var(--status-idle)';

                return (
                  <g
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    style={{ cursor: 'pointer', transition: 'all 0.4s ease' }}
                  >
                    {/* Pulsing ring for selected or warning vehicles */}
                    {(isSelected || v.status === 'Warning') && (
                      <circle
                        cx={xCoord}
                        cy={yCoord}
                        r="18"
                        fill="none"
                        stroke={statusColor}
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="radar-ping"
                      />
                    )}

                    {/* Outer marker pin */}
                    <circle
                      cx={xCoord}
                      cy={yCoord}
                      r={isSelected ? "11" : "9"}
                      fill="var(--bg-secondary)"
                      stroke={statusColor}
                      strokeWidth={isSelected ? "3" : "2"}
                    />
                    {/* Inner core */}
                    <circle cx={xCoord} cy={yCoord} r="4" fill={statusColor} />

                    {/* Label Badge */}
                    <rect
                      x={xCoord + 12}
                      y={yCoord - 14}
                      width="68"
                      height="20"
                      rx="4"
                      fill="rgba(11, 19, 43, 0.85)"
                      stroke={isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}
                      strokeWidth="1"
                    />
                    <text
                      x={xCoord + 18}
                      y={yCoord}
                      fill="var(--text-main)"
                      fontSize="9.5"
                      fontFamily="var(--font-mono)"
                      fontWeight="600"
                    >
                      {v.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(11, 19, 43, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                display: 'flex',
                gap: '14px',
                color: 'var(--text-muted)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-active)' }} />
                Active ({activeCount})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-warning)' }} />
                Alert ({warningCount})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-idle)' }} />
                Idle ({idleCount})
              </span>
            </div>
          </div>

          {/* Quick Alert Ticker */}
          <div
            style={{
              marginTop: '16px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.82rem'
            }}
          >
            <AlertTriangle size={16} color="var(--status-warning)" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <strong>Latest Telematics Alert:</strong> {alerts[0]?.text || 'All systems normal.'}
            </div>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{alerts[0]?.time}</span>
          </div>
        </div>

        {/* Selected Vehicle Detail Drawer Panel */}
        {selectedVehicle && (
          <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                >
                  {selectedVehicle.id} • {selectedVehicle.type}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '2px' }}>{selectedVehicle.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Driver: <strong>{selectedVehicle.driver}</strong>
                </div>
              </div>
              <span
                className={`badge badge-${
                  selectedVehicle.status === 'Active'
                    ? 'active'
                    : selectedVehicle.status === 'Warning'
                    ? 'warning'
                    : 'idle'
                }`}
              >
                {selectedVehicle.status}
              </span>
            </div>

            {/* Gauge Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '20px'
              }}
            >
              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CURRENT SPEED</span>
                <div className="mono-number" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {selectedVehicle.speed} <span style={{ fontSize: '0.75rem' }}>MPH</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Limit: {selectedVehicle.speedLimit} MPH
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>FUEL / CHARGE</span>
                <div className="mono-number" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--status-active)' }}>
                  {selectedVehicle.fuel}%
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Efficiency: {selectedVehicle.fuelConsumption}
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ENGINE TEMP</span>
                <div className="mono-number" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {selectedVehicle.engineTemp}&deg;F
                </div>
                <div style={{ fontSize: '0.72rem', color: selectedVehicle.engineTemp > 215 ? 'var(--status-warning)' : 'var(--text-dim)' }}>
                  {selectedVehicle.engineTemp > 215 ? 'Warning: High Temp' : 'Nominal Range'}
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>BATTERY / ECU</span>
                <div className="mono-number" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {selectedVehicle.battery}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  CAN Ingestion OK
                </div>
              </div>
            </div>

            {/* Tire Pressure Sensor Diagram (TPMS) */}
            <div
              style={{
                background: 'var(--bg-primary)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem' }}>
                <span style={{ fontWeight: 600 }}>TPMS Tire Pressure Sensor Array</span>
                <span style={{ color: 'var(--text-dim)' }}>Target: 45 / 100 PSI</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center' }}>
                {selectedVehicle.tirePressures.map((psi, pIdx) => {
                  const isLow = psi < 40 || (psi > 60 && psi < 95);
                  return (
                    <div
                      key={pIdx}
                      style={{
                        padding: '6px 4px',
                        borderRadius: '6px',
                        background: isLow ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-surface)',
                        border: `1px solid ${isLow ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-subtle)'}`
                      }}
                    >
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block' }}>
                        T{pIdx + 1}
                      </span>
                      <span
                        className="mono-number"
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: isLow ? 'var(--status-danger)' : 'var(--text-main)'
                        }}
                      >
                        {psi} PSI
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination & Active Geofence */}
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Destination:</strong> {selectedVehicle.destination} (ETA: {selectedVehicle.eta})
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Corridor:</strong> {selectedVehicle.geofence}
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Payload:</strong> {selectedVehicle.cargo}
              </div>
            </div>

            {/* DTC Codes if any */}
            {selectedVehicle.dtcCodes.length > 0 ? (
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  marginBottom: '16px'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-warning)', marginBottom: '4px' }}>
                  ACTIVE OBD-II FAULT CODES:
                </div>
                {selectedVehicle.dtcCodes.map((dtc, dIdx) => (
                  <div key={dIdx} style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                    • {dtc}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  fontSize: '0.78rem',
                  color: 'var(--status-active)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '16px'
                }}
              >
                <CheckCircle2 size={14} />
                <span>Zero ECU diagnostic trouble codes active</span>
              </div>
            )}

            <button
              onClick={() => {
                alert(`Direct CAN-bus ping dispatched to ${selectedVehicle.name} (ECU Gateway #01)`);
              }}
              className="btn-primary"
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              <Radio size={15} />
              <span>Dispatch Sensor Diagnostics Ping</span>
            </button>
          </div>
        )}
      </div>

      {/* Filterable Vehicle Card Grid */}
      <div style={{ marginTop: '36px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            marginBottom: '18px'
          }}
        >
          <h2 style={{ fontSize: '1.3rem' }}>Vehicle Telematics Fleet Directory</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            {/* Search Box */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search unit, driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '34px', paddingRight: '12px', width: '220px', height: '36px', fontSize: '0.85rem' }}
              />
              <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: '11px', top: '11px' }} />
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              {['All', 'Active', 'Warning', 'Idle'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: statusFilter === status ? 'var(--accent-gradient)' : 'transparent',
                    color: statusFilter === status ? '#ffffff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '18px'
          }}
        >
          {filteredVehicles.map((v) => {
            const isSelected = selectedVehicle?.id === v.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className="glass-panel"
                style={{
                  padding: '18px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--bg-surface-hover)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {v.id}
                  </span>
                  <span className={`badge badge-${v.status === 'Active' ? 'active' : v.status === 'Warning' ? 'warning' : 'idle'}`}>
                    {v.status}
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>{v.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Driver: {v.driver}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', background: 'var(--bg-primary)', padding: '8px', borderRadius: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>SPEED</span>
                    <div className="mono-number" style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      {v.speed} mph
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>FUEL/BATT</span>
                    <div className="mono-number" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--status-active)' }}>
                      {v.fuel}%
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>SAFETY</span>
                    <div className="mono-number" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {v.safetyScore}/100
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Last ping: {v.lastPing}</span>
                  <span style={{ color: 'var(--accent-primary)' }}>View Telematics →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
