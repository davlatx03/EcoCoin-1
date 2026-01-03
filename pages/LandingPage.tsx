
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

const LandingPage: React.FC = () => {
  const { currentUser, setCurrentUser, setUsers, users } = useApp();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) return;

    // Simulate simple register/login
    const existing = users.find(u => u.username === username || u.email === email);
    if (existing) {
      setCurrentUser(existing);
    } else {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        role: UserRole.USER,
        balance: 0
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    }
    navigate('/dashboard');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-24 -left-24 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-emerald-600 uppercase bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
              Protecting our planet, together
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Turn your green acts into <span className="text-emerald-600 dark:text-emerald-400">EcoCoins</span>.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
              Every small action counts. Upload proof of your eco-friendly activities and earn digital coins that celebrate your impact.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-2xl">🌱</span>
                <span className="text-sm font-medium">Sustainable</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-2xl">📸</span>
                <span className="text-sm font-medium">Photo Proof</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-2xl">💰</span>
                <span className="text-sm font-medium">Earn Coins</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {currentUser ? (
              <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome Back, {currentUser.username}!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">You have {currentUser.balance} EcoCoins. Keep making a difference!</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-center">Join the Movement</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Username</label>
                    <input 
                      type="text" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
                  >
                    Get Started Free
                  </button>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
                    By joining, you agree to take part in our environmental mission.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Feature section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-2xl mb-4">🚶</div>
            <h4 className="text-xl font-bold mb-2">Sustainable Actions</h4>
            <p className="text-slate-600 dark:text-slate-400">Plant a tree, recycle waste, or bike to work. Your actions matter.</p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-2xl mb-4">📸</div>
            <h4 className="text-xl font-bold mb-2">Verified Proof</h4>
            <p className="text-slate-600 dark:text-slate-400">Upload a photo of your activity. Our team verifies every contribution.</p>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-2xl mb-4">🏆</div>
            <h4 className="text-xl font-bold mb-2">Exclusive Rewards</h4>
            <p className="text-slate-600 dark:text-slate-400">Earn coins and get recognized as a top contributor in your region.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
