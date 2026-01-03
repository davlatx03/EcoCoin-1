
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { currentUser, setCurrentUser, darkMode, setDarkMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  // Fix: Replaced scoped '.nav-link' CSS class with a Tailwind utility string to avoid 'jsx' prop error on style tag
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-1c.538-.1 1.074-.339 1.538-.718M12 16c-1.11 0-2.08-.402-2.599-1M12 16c-1.11 0-2.08-.402-2.599-1M12 16v1M12 16c-1.074 0-2.148.113-3.187.334" />
                </svg>
              </div>
              <span className="font-bold text-xl text-emerald-600 dark:text-emerald-400">EcoCoin</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={navLinkClasses}>Home</Link>
            <Link to="/sponsors" className={navLinkClasses}>Sponsors</Link>
            <Link to="/volunteers" className={navLinkClasses}>Volunteers</Link>
            
            {currentUser?.role === UserRole.USER && (
              <>
                <Link to="/upload" className={navLinkClasses}>Upload Proof</Link>
                <Link to="/dashboard" className={navLinkClasses}>Dashboard</Link>
                <Link to="/history" className={navLinkClasses}>History</Link>
              </>
            )}

            {currentUser?.role === UserRole.ADMIN && (
              <Link to="/admin" className={`${navLinkClasses} font-semibold text-emerald-600`}>Admin Panel</Link>
            )}

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-4 border-l pl-4 border-slate-200 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium leading-none">{currentUser.username}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.balance} Coins</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/admin-login" className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-medium">Admin</Link>
                {/* Simplified login since we're mocking - landing page handles it */}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300">Home</Link>
          <Link to="/sponsors" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300">Sponsors</Link>
          <Link to="/volunteers" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300">Volunteers</Link>
          {currentUser && (
            <>
              <Link to="/upload" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300">Upload Proof</Link>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
