
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const UploadPage: React.FC = () => {
  const { addSubmission } = useApp();
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview || !description) return;

    setIsUploading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addSubmission(preview, description);
    setIsUploading(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold mb-4">Share Your Progress</h1>
        <p className="text-slate-500 dark:text-slate-400">Upload a clear photo of your eco-friendly activity to earn EcoCoins.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Image Upload Area */}
          <div className="relative">
            {preview ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-emerald-500/30">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer group">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">📸</div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
            <textarea 
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-all"
              placeholder="What eco-friendly action did you take today? (e.g., 'Planted 3 oak trees in the local park')"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isUploading || !preview || !description}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                isUploading || !preview || !description 
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 dark:shadow-none'
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>Submit for Review</>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 flex gap-4">
        <span className="text-2xl">💡</span>
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-bold mb-1">Tips for faster approval:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Ensure the photo is bright and clear.</li>
            <li>Capture the specific action being performed.</li>
            <li>Provide a detailed description of the impact.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
