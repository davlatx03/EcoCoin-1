
import React from 'react';
import { useApp } from '../context/AppContext';

const HistoryPage: React.FC = () => {
  const { currentUser, transactions } = useApp();
  
  const userTransactions = transactions
    .filter(t => t.userId === currentUser?.id)
    .sort((a, b) => b.date - a.date);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold">Transaction History</h1>
          <p className="text-slate-500 dark:text-slate-400">All your earned EcoCoins in one place.</p>
        </div>
        <div className="px-6 py-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-800">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">Total Earned</p>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{currentUser?.balance} <span className="text-sm font-medium">Coins</span></p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {userTransactions.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4 opacity-20">🪙</div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No transactions yet. Start by uploading proof of your environmental impact!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Admin</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {userTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-8 py-5 text-sm whitespace-nowrap text-slate-600 dark:text-slate-400">
                      {new Date(tx.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{tx.reason}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                        Verified
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-xl font-bold text-emerald-500">+{tx.amount}</span>
                        <span className="text-xs font-bold text-emerald-500/60 uppercase">Coins</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        All transactions are final and verified by our ecological review team.
      </div>
    </div>
  );
};

export default HistoryPage;
