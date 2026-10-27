import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText,
  DollarSign,
  X,
  Filter
} from 'lucide-react';
import { WORK_ORDERS } from '../data/mockData';

export default function MaintenancePage({ vehicles }) {
  const [workOrders, setWorkOrders] = useState(WORK_ORDERS);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('work-orders'); // 'work-orders' | 'dvir' | 'schedule'

  // New Work Order Form State
  const [newVehicleId, setNewVehicleId] = useState('FL-101');
  const [newServiceType, setNewServiceType] = useState('Brake Pad Replacement & Rotor Turn');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newAssignedTo, setNewAssignedTo] = useState('Fleet Garage North');
  const [newDueDate, setNewDueDate] = useState('2026-11-05');
  const [newCost, setNewCost] = useState('$580');
  const [newDescription, setNewDescription] = useState('Routine brake maintenance as indicated by telematics wear sensor.');

  // DVIR checklist state
  const [dvirItems, setDvirItems] = useState([
    { id: 'brakes', label: 'Air Brake System & Pressure Leakdown Test', status: 'Passed' },
    { id: 'steering', label: 'Steering Mechanism & Free Play (< 2 inches)', status: 'Passed' },
    { id: 'tires', label: 'Tires, Wheels & Rims (Tread Depth > 4/32")', status: 'Warning' },
    { id: 'lights', label: 'Headlamps, Turn Signals, Clearance & Hazard Lights', status: 'Passed' },
    { id: 'couplings', label: 'Fifth Wheel Locking Jaws & Kingpin Connection', status: 'Passed' },
    { id: 'emergency', label: 'Fire Extinguisher & Reflective Warning Triangles', status: 'Passed' }
  ]);

  const handleStatusToggle = (orderId) => {
    setWorkOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const nextStatus =
          order.status === 'Pending'
            ? 'In Progress'
            : order.status === 'In Progress'
            ? 'Completed'
            : 'Pending';
        return { ...order, status: nextStatus };
      })
    );
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const vehicleObj = vehicles.find((v) => v.id === newVehicleId);
    const newOrder = {
      id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleId: newVehicleId,
      vehicleName: vehicleObj ? vehicleObj.name : 'Commercial Fleet Unit',
      priority: newPriority,
      status: 'Pending',
      serviceType: newServiceType,
      assignedTo: newAssignedTo,
      dueDate: newDueDate,
      cost: newCost,
      description: newDescription
    };

    setWorkOrders([newOrder, ...workOrders]);
    setIsModalOpen(false);
  };

  const filteredOrders = workOrders.filter((order) => {
    if (filterStatus === 'All') return true;
    return order.status === filterStatus;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px 20px' }}>
      {/* Top Header */}
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Maintenance & DVIR Compliance</h1>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--status-active)',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              FMCSA Part 396
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Automated work orders, telematics wear telemetry, digital inspections, and DOT audit trails.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
          style={{ fontSize: '0.88rem', padding: '9px 18px' }}
        >
          <Plus size={16} />
          <span>Create Work Order</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
            Active Work Orders
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
            {workOrders.filter((w) => w.status !== 'Completed').length} Orders
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            2 marked High Priority
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-active)', textTransform: 'uppercase', fontWeight: 600 }}>
            Fleet DVIR Pass Rate
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-active)', marginTop: '4px' }}>
            99.4%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Zero unresolved safety defects
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Avg Repair Turnaround
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px' }}>
            18.2 hrs
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            -34% downtime via predictive alerts
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Service Ledger YTD
          </span>
          <div className="mono-number" style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
            $28,450
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            100% logged & accounted
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px'
        }}
      >
        <button
          onClick={() => setActiveTab('work-orders')}
          className={activeTab === 'work-orders' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Wrench size={16} />
          <span>Work Orders Manager ({workOrders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('dvir')}
          className={activeTab === 'dvir' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <ShieldCheck size={16} />
          <span>Digital DVIR Inspection Check</span>
        </button>
      </div>

      {/* TAB 1: Work Orders */}
      {activeTab === 'work-orders' && (
        <div>
          {/* Filter Sub-header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Click on any order status to cycle: <strong>Pending &rarr; In Progress &rarr; Completed</strong>
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Pending', 'In Progress', 'Completed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: filterStatus === s ? 'var(--accent-gradient)' : 'var(--bg-surface)',
                    color: filterStatus === s ? '#ffffff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order ID</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vehicle</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Service Type</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Tech</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Due Date</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Cost</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((wo) => (
                  <tr key={wo.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {wo.id}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600 }}>{wo.vehicleName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{wo.vehicleId}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 500 }}>{wo.serviceType}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '280px' }}>{wo.description}</div>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      {wo.assignedTo}
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      {wo.dueDate}
                    </td>
                    <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {wo.cost}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <button
                        onClick={() => handleStatusToggle(wo.id)}
                        className={`badge badge-${
                          wo.status === 'Completed'
                            ? 'active'
                            : wo.status === 'In Progress'
                            ? 'idle'
                            : 'warning'
                        }`}
                        style={{ cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                        title="Click to cycle status"
                      >
                        {wo.status} ↻
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DVIR Pre-Trip Inspection */}
      {activeTab === 'dvir' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Electronic DVIR Pre-Trip Inspection Manifest</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Vehicle #FL-101 (Freightliner Cascadia) • Inspected by Marcus Vance • Timestamp: Today 06:45 AM
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-active">Signed & Stamped</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dvirItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.status === 'Passed' ? (
                    <CheckCircle2 size={18} color="var(--status-active)" />
                  ) : (
                    <AlertTriangle size={18} color="var(--status-warning)" />
                  )}
                  <span style={{ fontWeight: 500, fontSize: '0.92rem' }}>{item.label}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setDvirItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? { ...i, status: i.status === 'Passed' ? 'Warning' : 'Passed' }
                            : i
                        )
                      );
                    }}
                    className={`badge badge-${item.status === 'Passed' ? 'active' : 'warning'}`}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.status} (Toggle)
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => alert('Digital DVIR verified and synced to cloud compliance registry.')}
              className="btn-primary"
            >
              <ShieldCheck size={16} />
              <span>Verify & Lock DVIR Certification</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal for Creating Work Order */}
      {isModalOpen && (
        <div className="auth-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="auth-card-container" style={{ maxWidth: '520px' }}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn-icon"
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <X size={16} />
            </button>

            <h2 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Create Fleet Work Order</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Schedule maintenance, assign certified technicians, and log estimated repair cost.
            </p>

            <form onSubmit={handleCreateOrder}>
              <div className="form-group">
                <label className="form-label">Target Vehicle</label>
                <select
                  value={newVehicleId}
                  onChange={(e) => setNewVehicleId(e.target.value)}
                  className="form-select"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.id} - {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Service Type / Operation</label>
                <input
                  type="text"
                  required
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="form-select"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Cost</label>
                  <input
                    type="text"
                    required
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Assigned Facility / Tech</label>
                  <input
                    type="text"
                    required
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Repair Notes & Diagnostic Symptoms</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Submit Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
