import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  FileCode,
  ShieldCheck,
  UserPlus,
  Users,
  Search,
  Filter,
  Check,
  X,
  Lock,
  Eye,
  Key,
  Building
} from 'lucide-react';
import { AUDIT_REPORTS, CLIENT_USERS } from '../data/mockData';

export default function ReportsPage({ currentUser, onSwitchRole, vehicles }) {
  const [reports, setReports] = useState(AUDIT_REPORTS);
  const [clientUsers, setClientUsers] = useState(CLIENT_USERS);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState(null);

  // Invite form state
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Client Viewer');
  const [inviteOrg, setInviteOrg] = useState('');

  // 1. Export as Real Downloadable CSV
  const handleExportCSV = (reportTitle = 'Fleet_Telematics_Master_Audit') => {
    const csvHeaders = 'Vehicle_ID,Vehicle_Name,Driver,Status,Speed_MPH,Fuel_Percent,Engine_Temp_F,Safety_Score,Geofence\n';
    const csvRows = vehicles
      .map(
        (v) =>
          `"${v.id}","${v.name}","${v.driver}","${v.status}",${v.speed},${v.fuel},${v.engineTemp},${v.safetyScore},"${v.geofence}"`
      )
      .join('\n');

    const blob = new Blob([csvHeaders + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${reportTitle}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Successfully exported ${reportTitle}.csv! Download initiated.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  // 2. Export as Downloadable JSON
  const handleExportJSON = (reportTitle = 'Telematics_Sensor_Ingestion') => {
    const jsonBlob = new Blob([JSON.stringify(vehicles, null, 2)], {
      type: 'application/json;charset=utf-8;'
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${reportTitle}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Successfully generated and downloaded ${reportTitle}.json!`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  // 3. Print / Formatted PDF Export
  const handlePrintPDF = () => {
    window.print();
  };

  // Invite user submission
  const handleInviteUser = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newUser = {
      id: `USR-0${clientUsers.length + 1}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      organization: inviteOrg || 'External Logistics Partner',
      permissions:
        inviteRole === 'Client Viewer'
          ? 'Read-Only Live Map, Shipment ETAs, Export Delivery Proofs'
          : 'Standard Operator Dispatch Access',
      status: 'Active'
    };

    setClientUsers([...clientUsers, newUser]);
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteOrg('');
    setExportNotice(`Client invitation dispatched to ${inviteEmail}!`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  const filteredReports = reports.filter((r) => {
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Telematics & Fuel', 'Diagnostics', 'Safety & Compliance', 'DOT Compliance'];

  return (
    <div className="reports-page-wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px 20px' }}>
      {/* Header */}
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Export Tools & Client Access Control</h1>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(59, 130, 246, 0.15)',
                color: 'var(--accent-secondary)',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              Multi-Tenant SaaS
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Instant CSV, PDF, and JSON telemetry export tools alongside role-based client authorization.
          </p>
        </div>

        {/* Global Quick Export Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={() => handleExportCSV('Fleet_Telematics_Master_Audit')}
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '9px 16px' }}
            title="Download full fleet data as CSV"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '9px 16px' }}
            title="Print or Save Formatted PDF Audit"
          >
            <Printer size={16} />
            <span>Print PDF Report</span>
          </button>

          <button
            onClick={() => handleExportJSON('Fleet_Telemetry_Raw_Ingestion')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '9px 16px' }}
            title="Download raw telematics JSON"
          >
            <FileCode size={16} />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Export Feedback Banner */}
      {exportNotice && (
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: 'var(--status-active)',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          <Check size={18} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Client Access Control Role Simulator Card */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(16, 28, 61, 0.8) 0%, rgba(11, 19, 43, 0.95) 100%)',
          border: '1px solid var(--border-glow)'
        }}
      >
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.25rem' }}>Role-Based Client Access Control Matrix</h2>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Current User Session: <strong>{currentUser?.name || 'David Sterling'}</strong> ({currentUser?.role || 'Super Admin'})
            </p>
          </div>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <UserPlus size={15} />
            <span>Invite Client Organization</span>
          </button>
        </div>

        {/* Quick Role Switcher Buttons to test Access Control */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Test As Role:
          </span>
          {['Super Admin', 'Fleet Manager', 'Dispatcher', 'Client Viewer'].map((roleName) => (
            <button
              key={roleName}
              onClick={() => onSwitchRole(roleName)}
              className="btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '6px 12px',
                borderColor: currentUser?.role === roleName ? 'var(--accent-primary)' : 'var(--border-subtle)',
                background: currentUser?.role === roleName ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-primary)'
              }}
            >
              {roleName} {currentUser?.role === roleName ? '✓ (Active)' : ''}
            </button>
          ))}
        </div>

        {/* Permissions Table Matrix */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px' }}>ROLE IDENTITY</th>
                <th style={{ padding: '10px 14px' }}>GPS LIVE MAP</th>
                <th style={{ padding: '10px 14px' }}>ECU DIAGNOSTICS</th>
                <th style={{ padding: '10px 14px' }}>WORK ORDERS</th>
                <th style={{ padding: '10px 14px' }}>EXPORT HUB</th>
                <th style={{ padding: '10px 14px' }}>CLIENT BILLING</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>Super Admin</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Full Access</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Full Access</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Create/Edit/Close</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Unlimited</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Manage Pricing</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>Fleet Manager</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Full Access</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Clear Codes</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Create/Edit</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ CSV / PDF</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— Read-Only</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>Dispatcher</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Live Tracking</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— View Only</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— View Only</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Trip Proofs</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— Restricted</td>
              </tr>
              <tr style={{ fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>Client Viewer</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-idle)' }}>✓ Scoped Shipment</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— Restricted</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— Restricted</td>
                <td style={{ padding: '12px 14px', color: 'var(--status-active)' }}>✓ Delivery Proofs</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>— Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Reports Directory Table */}
      <div>
        <div
          className="reports-section-header"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            marginBottom: '18px'
          }}
        >
          <h2 style={{ fontSize: '1.25rem' }}>Telematics Compliance & Activity Reports</h2>

          <div className="reports-filters-wrapper">
            <div className="reports-search-box">
              <input
                type="text"
                placeholder="Search audit log..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input reports-search-input"
              />
              <Search size={14} color="var(--text-dim)" className="reports-search-icon" />
            </div>

            <div className="reports-category-pills" role="tablist" aria-label="Report Categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={categoryFilter === cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`reports-category-btn ${categoryFilter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '820px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Report ID</th>
                <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Document Title</th>
                <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category</th>
                <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Telemetry Records</th>
                <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Export Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((rep) => (
                <tr key={rep.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {rep.id}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600 }}>{rep.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Units: {rep.vehicle}</div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {rep.date}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className="badge badge-idle" style={{ fontSize: '0.7rem' }}>
                      {rep.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)' }}>
                    {rep.records.toLocaleString()} rows
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleExportCSV(rep.title.replace(/\s+/g, '_'))}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        title="Download CSV"
                      >
                        CSV
                      </button>
                      <button
                        onClick={handlePrintPDF}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        title="Print / Save PDF"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExportJSON(rep.title.replace(/\s+/g, '_'))}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        title="Export JSON"
                      >
                        JSON
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Users Directory */}
      <div style={{ marginTop: '36px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Active Authorized Client Users</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {clientUsers.map((u) => (
            <div key={u.id} className="glass-panel" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{u.name}</span>
                <span className="badge badge-active" style={{ fontSize: '0.68rem' }}>{u.role}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>
                {u.email}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Organization: <strong>{u.organization}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', background: 'var(--bg-primary)', padding: '8px', borderRadius: '6px' }}>
                Permissions: {u.permissions}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Client Modal */}
      {isInviteModalOpen && (
        <div className="auth-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsInviteModalOpen(false); }}>
          <div className="auth-card-container">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="btn-icon"
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <X size={16} />
            </button>

            <h2 style={{ fontSize: '1.35rem', marginBottom: '6px' }}>Invite Client Organization</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Grant scoped telematics dashboard and delivery tracking access to external clients.
            </p>

            <form onSubmit={handleInviteUser}>
              <div className="form-group">
                <label className="form-label">Client Contact Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Harmon"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Client Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jessica@apexretail.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Client Organization / Shipper Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Retail Distribution"
                  value={inviteOrg}
                  onChange={(e) => setInviteOrg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role / Access Level</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="form-select"
                >
                  <option value="Client Viewer">Client Viewer (Read-Only Live Map & ETAs)</option>
                  <option value="Dispatcher">Dispatcher (Route Optimization & Driver Comms)</option>
                  <option value="Fleet Manager">Fleet Manager (Full Operations)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '22px' }}>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Send Access Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Responsive Filter Bar & Mobile Layout CSS */}
      <style>{`
        .reports-filters-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .reports-search-box {
          position: relative;
          width: 220px;
        }
        .reports-search-input {
          padding-left: 34px !important;
          height: 36px !important;
          font-size: 0.85rem !important;
          width: 100% !important;
        }
        .reports-search-icon {
          position: absolute;
          left: 11px;
          top: 11px;
          pointer-events: none;
        }
        .reports-category-pills {
          display: flex;
          gap: 4px;
          background: var(--bg-surface);
          padding: 3px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .reports-category-pills::-webkit-scrollbar {
          display: none;
        }
        .reports-category-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .reports-category-btn.active {
          background: var(--accent-gradient);
          color: #ffffff;
        }

        /* Mobile Layout Optimizations (< 680px and <= 360px) */
        @media (max-width: 680px) {
          .reports-section-header {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .reports-filters-wrapper {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .reports-search-box {
            width: 100% !important;
          }
          .reports-category-pills {
            width: 100% !important;
            padding: 4px !important;
            gap: 6px !important;
          }
          .reports-category-btn {
            padding: 7px 13px !important;
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          .reports-page-wrapper {
            padding: 16px 12px 40px 12px !important;
          }
        }

        @media (max-width: 360px) {
          .reports-page-wrapper {
            padding: 12px 8px 36px 8px !important;
          }
          .reports-category-pills {
            gap: 4px !important;
            padding: 3px !important;
          }
          .reports-category-btn {
            padding: 6px 10px !important;
            font-size: 0.76rem !important;
          }
        }
      `}</style>
    </div>
  );
}
