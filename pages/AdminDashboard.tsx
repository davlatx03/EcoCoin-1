
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubmissionStatus, UserRole } from '../types';

const AdminDashboard: React.FC = () => {
  const { 
    submissions, approveSubmission, rejectSubmission, 
    users, assignCoins, 
    sponsors, addSponsor, removeSponsor,
    volunteers, transactions
  } = useApp();

  const [activeTab, setActiveTab] = useState<'submissions' | 'users' | 'sponsors' | 'volunteers'>('submissions');
  const [selectedUserForCoins, setSelectedUserForCoins] = useState<string | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const [coinReason, setCoinReason] = useState<string>('');

  const [newSponsor, setNewSponsor] = useState({ name: '', logo: '', description: '', website: '' });

  const pendingSubmissions = submissions.filter(s => s.status === SubmissionStatus.PENDING);
  const normalUsers = users.filter(u => u.role === UserRole.USER);

  const handleManualCoinAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserForCoins && coinAmount > 0) {
      assignCoins(selectedUserForCoins, coinAmount, coinReason || 'Admin Manual Grant');
      setSelectedUserForCoins(null);
      setCoinAmount(0);
      setCoinReason('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-black mb-2">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-2 mt-6">
          {(['submissions', 'users', 'sponsors', 'volunteers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                activeTab === tab 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 border border-slate-100 dark:border-slate-700'
              }`}
            >
              {tab}
              {tab === 'submissions' && pendingSubmissions.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white text-emerald-600 rounded-full text-[10px]">{pendingSubmissions.length}</span>
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden min-h-[500px]">
        {/* SUBMISSIONS TAB */}
        {activeTab === 'submissions' && (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">Pending Verifications</h2>
            {pendingSubmissions.length === 0 ? (
              <div className="py-20 text-center text-slate-400">All caught up! No pending submissions.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingSubmissions.map(sub => (
                  <div key={sub.id} className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={sub.imageUrl} className="w-full aspect-video object-cover" alt="Proof" />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white">👤</div>
                        <span className="text-sm font-bold">{sub.username}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 h-12 overflow-hidden">{sub.description}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const coins = prompt("How many coins to award?", "10");
                            if (coins) approveSubmission(sub.id, parseInt(coins));
                          }}
                          className="flex-grow py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => rejectSubmission(sub.id)}
                          className="flex-grow py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">User Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-slate-50 dark:bg-slate-700/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Username</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Email</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Balance</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {normalUsers.map(u => (
                    <tr key={u.id}>
                      <td className="px-6 py-4 font-bold">{u.username}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
                          {u.balance} Coins
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedUserForCoins(u.id)}
                          className="text-emerald-600 hover:underline text-sm font-bold"
                        >
                          Assign Coins
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedUserForCoins && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                  <h3 className="text-xl font-bold mb-6">Manual Coin Assignment</h3>
                  <form onSubmit={handleManualCoinAssign} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Amount</label>
                      <input 
                        type="number" 
                        required
                        value={coinAmount}
                        onChange={e => setCoinAmount(parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reason</label>
                      <input 
                        type="text" 
                        required
                        value={coinReason}
                        onChange={e => setCoinReason(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900"
                        placeholder="Manual grant"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <button 
                        type="button"
                        onClick={() => setSelectedUserForCoins(null)}
                        className="flex-grow py-3 bg-slate-100 rounded-xl font-bold"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-grow py-3 bg-emerald-600 text-white rounded-xl font-bold"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SPONSORS TAB */}
        {activeTab === 'sponsors' && (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">Manage Sponsors</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 h-fit">
                <h3 className="font-bold mb-4">Add New Sponsor</h3>
                <div className="space-y-3">
                  <input placeholder="Name" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" value={newSponsor.name} onChange={e => setNewSponsor({...newSponsor, name: e.target.value})} />
                  <input placeholder="Logo URL" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" value={newSponsor.logo} onChange={e => setNewSponsor({...newSponsor, logo: e.target.value})} />
                  <textarea placeholder="Description" rows={3} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" value={newSponsor.description} onChange={e => setNewSponsor({...newSponsor, description: e.target.value})} />
                  <input placeholder="Website URL" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" value={newSponsor.website} onChange={e => setNewSponsor({...newSponsor, website: e.target.value})} />
                  <button 
                    onClick={() => {
                      addSponsor(newSponsor);
                      setNewSponsor({ name: '', logo: '', description: '', website: '' });
                    }}
                    className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl"
                  >
                    Save Sponsor
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                {sponsors.map(s => (
                  <div key={s.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={s.logo} className="w-10 h-10 object-contain rounded-lg" alt="" />
                      <div>
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-xs text-slate-500 truncate w-32">{s.website}</p>
                      </div>
                    </div>
                    <button onClick={() => removeSponsor(s.id)} className="text-red-500 hover:text-red-600 p-2">🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VOLUNTEERS TAB */}
        {activeTab === 'volunteers' && (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">Volunteer Applications</h2>
            {volunteers.length === 0 ? (
              <div className="py-20 text-center text-slate-400">No applications received yet.</div>
            ) : (
              <div className="space-y-4">
                {volunteers.map(v => (
                  <div key={v.id} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold">{v.fullName}</h4>
                        <p className="text-sm text-slate-500">{v.email} • {v.country}</p>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(v.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
                      {v.motivation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
