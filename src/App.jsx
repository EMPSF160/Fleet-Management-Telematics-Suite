import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TelematicsPage from './pages/TelematicsPage';
import MaintenancePage from './pages/MaintenancePage';
import ReportsPage from './pages/ReportsPage';
import { INITIAL_VEHICLES, MOCK_ALERTS } from './data/mockData';

export default function App() {
  // 5 primary pages: 'home', 'dashboard', 'telematics', 'maintenance', 'reports'
  const [currentPage, setCurrentPage] = useState('home');

  // Theme state: 'cyber-blue' | 'emerald-eco' | 'solar-amber' | 'daylight-light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('oct_fleet_theme') || 'cyber-blue';
  });

  // Auth state & User Session
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('oct_fleet_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'David Sterling',
          email: 'admin@octfleet.io',
          role: 'Super Admin',
          organization: 'OCT Telematics Global'
        };
  });

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'

  // Shared Fleet & Telematics State
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  // Sync theme changes to html data-theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('oct_fleet_theme', theme);
  }, [theme]);

  // Sync user state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('oct_fleet_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('oct_fleet_user');
    }
  }, [currentUser]);

  // Scroll to top on page transition
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    // If on home, direct to dashboard on login
    if (currentPage === 'home') {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSwitchRole = (newRole) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: newRole
      });
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentTheme={theme}
        onThemeChange={setTheme}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main 5-Page Content Router */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenAuth={handleOpenAuth} />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            vehicles={vehicles}
            setVehicles={setVehicles}
            alerts={alerts}
          />
        )}

        {currentPage === 'telematics' && (
          <TelematicsPage vehicles={vehicles} />
        )}

        {currentPage === 'maintenance' && (
          <MaintenancePage vehicles={vehicles} />
        )}

        {currentPage === 'reports' && (
          <ReportsPage
            currentUser={currentUser}
            onSwitchRole={handleSwitchRole}
            vehicles={vehicles}
          />
        )}
      </main>

      {/* Responsive Footer with Strict Social Icons Requirement */}
      <Footer onNavigate={handleNavigate} />

      {/* Authentication Modal with Centered Clickable Logo */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onNavigateHome={() => handleNavigate('home')}
      />
    </div>
  );
}
