
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { UserRole } from './types';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import UploadPage from './pages/UploadPage';
import HistoryPage from './pages/HistoryPage';
import SponsorsPage from './pages/SponsorsPage';
import VolunteersPage from './pages/VolunteersPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode, role?: UserRole }> = ({ children, role }) => {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { darkMode } = useApp();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-900', 'text-white');
      document.body.classList.remove('bg-white', 'text-slate-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-white', 'text-slate-900');
      document.body.classList.remove('bg-slate-900', 'text-white');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute role={UserRole.USER}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute role={UserRole.USER}>
                <UploadPage />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute role={UserRole.USER}>
                <HistoryPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/*" element={
              <ProtectedRoute role={UserRole.ADMIN}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 dark:text-slate-400">
          <p>© {new Date().getFullYear()} EcoCoin Platform. Built for a greener future.</p>
        </footer>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
