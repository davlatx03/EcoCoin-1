
import React from 'react';
import { useApp } from '../context/AppContext';

const SponsorsPage: React.FC = () => {
  const { sponsors } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Our Partners in Change</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          EcoCoin is made possible through the support of these visionary organizations committed to a sustainable future.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
              <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-2">{sponsor.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{sponsor.description}</p>
            <a 
              href={sponsor.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              Visit Website 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        ))}

        <div className="bg-emerald-50 dark:bg-slate-800/50 border-2 border-dashed border-emerald-200 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-2xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Become a Sponsor</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Support environmental initiatives and reach a global community of eco-warriors.</p>
          <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors">
            Contact Partnership Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;
