
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const VolunteersPage: React.FC = () => {
  const { applyVolunteer } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyVolunteer(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
        <h1 className="text-3xl font-extrabold mb-4">Application Received!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you for your interest in volunteering with EcoCoin. Our team will review your application and get back to you via email within 5 business days.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl font-extrabold mb-6">Join Our Volunteer Network</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Volunteers are the heart of EcoCoin. Help us verify submissions, organize local cleanups, and spread awareness about environmental sustainability.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl">🔍</div>
              <div>
                <h4 className="font-bold mb-1">Impact Verifier</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Review community photo submissions and ensure they meet our quality guidelines.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-xl">📢</div>
              <div>
                <h4 className="font-bold mb-1">Social Ambassador</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Share EcoCoin stories and help recruit new eco-warriors in your city.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-xl">🌍</div>
              <div>
                <h4 className="font-bold mb-1">Local Coordinator</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Organize real-world meetups and environmental projects for EcoCoin members.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8">
          <h3 className="text-2xl font-bold mb-6">Application Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input 
                type="text" 
                required
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="United States"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Motivation Message</label>
              <textarea 
                required
                rows={4}
                value={formData.motivation}
                onChange={e => setFormData({...formData, motivation: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                placeholder="Tell us why you want to join our mission..."
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteersPage;
