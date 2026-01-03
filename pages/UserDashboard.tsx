
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SubmissionStatus } from '../types';

const UserDashboard: React.FC = () => {
  const { currentUser, submissions, transactions } = useApp();
  
  const userSubmissions = submissions.filter(s => s.userId === currentUser?.id);
  const userTransactions = transactions.filter(t => t.userId === currentUser?.id).slice(0, 5);

  const stats = {
    pending: userSubmissions.filter(s => s.status === SubmissionStatus.PENDING).length,
    approved: userSubmissions.filter(s => s.status === SubmissionStatus.APPROVED).length,
    rejected: userSubmissions.filter(s => s.status === SubmissionStatus.REJECTED).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2">Welcome, {currentUser?.username}</h1>
        <p className="text-slate-500 dark:text-slate-400">Track your environmental impact and coin balance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="md:col-span-2 bg-emerald-600 rounded-3xl p-8 text-white shadow-lg shadow-emerald-200 dark:shadow-none relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-100 font-medium mb-1">Total Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{currentUser?.balance}</span>
              <span className="text-xl font-medium text-emerald-100">EcoCoins</span>
            </div>
            <div className="mt-8 flex gap-4">
              <Link to="/upload" className="px-6 py-2 bg-white text-emerald-600 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors">
                New Submission
              </Link>
              <Link to="/history" className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-xl text-sm hover:bg-emerald-400 transition-colors">
                View History
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 text-7xl opacity-20 transform translate-x-4 -translate-y-4">🪙</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-xl">⏳</div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pending Review</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xl">✅</div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Approved Proofs</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">Monthly Impact</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-emerald-500">12.4kg</span>
            <span className="text-xs text-slate-400">CO2 Saved</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full w-[65%]"></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Submissions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Proofs</h2>
            <Link to="/upload" className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:underline">See all</Link>
          </div>
          <div className="space-y-4">
            {userSubmissions.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-400 mb-4">No submissions yet.</p>
                <Link to="/upload" className="text-emerald-600 font-semibold underline">Upload your first eco-proof</Link>
              </div>
            ) : (
              userSubmissions.slice(0, 3).map(sub => (
                <div key={sub.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 flex gap-4 items-center">
                  <img src={sub.imageUrl} alt="Proof" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold text-sm truncate max-w-[200px]">{sub.description}</p>
                    <p className="text-xs text-slate-500">{new Date(sub.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    sub.status === SubmissionStatus.PENDING ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    sub.status === SubmissionStatus.APPROVED ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {sub.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Latest Activity */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Coin Transactions</h2>
            <Link to="/history" className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:underline">View History</Link>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            {userTransactions.length === 0 ? (
              <div className="p-10 text-center text-slate-400">No transactions recorded.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {userTransactions.map(tx => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{tx.reason}</p>
                        <p className="text-[10px] text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-500 font-bold">+{tx.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
