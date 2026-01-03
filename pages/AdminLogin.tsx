
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setCurrentUser, users } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Initial Credentials: davlatbekdev / 12151215
    if (username === 'davlatbekdev' && password === '12151215') {
      const adminUser = users.find(u => u.username === username && u.role === UserRole.ADMIN);
      if (adminUser) {
        setCurrentUser(adminUser);
        navigate('/admin');
      } else {
        // Fallback in case storage was cleared but login is hardcoded
        const newAdmin = {
          id: 'admin_1',
          username: 'davlatbekdev',
          email: 'admin@ecocoin.com',
          role: UserRole.ADMIN,
          balance: 0
        };
        setCurrentUser(newAdmin);
        navigate('/admin');
      }
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 dark:bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔐</div>
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-sm text-slate-500">Access Restricted</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
