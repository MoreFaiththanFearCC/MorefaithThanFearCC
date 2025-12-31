
import React, { useState, useEffect } from 'react';
import { getMarketIntelligence } from '../services/geminiService';
import { ICONS } from '../constants';

const Intelligence: React.FC = () => {
  const [location, setLocation] = useState('San Francisco, CA');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<{ text: string; sources: any[] } | null>(null);

  const fetchIntelligence = async () => {
    setLoading(true);
    try {
      const data = await getMarketIntelligence(location);
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntelligence();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <ICONS.Intelligence />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Market Intelligence</h2>
          <p className="text-slate-500 mb-8 max-w-xl">
            Leverage Google Search AI to identify new referral opportunities, local competitor shifts, and demographic trends in your service area.
          </p>

          <div className="flex gap-4 mb-8">
            <input 
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter service region (e.g. Dallas, TX)..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all shadow-sm"
            />
            <button 
              onClick={fetchIntelligence}
              disabled={loading}
              className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg flex items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                <ICONS.Intelligence />
              )}
              {loading ? 'Analyzing...' : 'Generate Intelligence'}
            </button>
          </div>

          {report ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
                  {report.text}
                </div>
              </div>

              {report.sources.length > 0 && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Grounding Sources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {report.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-sky-500 hover:shadow-md transition-all group"
                      >
                        <div className="p-2 bg-slate-100 rounded text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        </div>
                        <span className="text-sm font-semibold text-slate-700 truncate">{source.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl">
              <div className="p-4 bg-slate-50 rounded-full mb-4">
                <ICONS.Dashboard />
              </div>
              <p className="font-medium">Enter a location to begin regional analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Partners Card */}
      {report && (
         <div className="bg-sky-500 rounded-2xl p-8 text-white shadow-xl shadow-sky-500/20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1 text-center md:text-left">
               <h3 className="text-2xl font-bold mb-2">Identify Target Facilities</h3>
               <p className="opacity-90">Based on this data, we suggest reaching out to discharge planners at regional level-1 trauma centers first.</p>
             </div>
             <button className="bg-white text-sky-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg shadow-sky-900/10">
               Auto-Populate Prospects
             </button>
          </div>
         </div>
      )}
    </div>
  );
};

export default Intelligence;
