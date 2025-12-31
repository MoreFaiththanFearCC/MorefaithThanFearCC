
import React from 'react';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: ICONS.Dashboard },
    { id: 'patients', name: 'Patient Funnel', icon: ICONS.Patients },
    { id: 'partners', name: 'Referral Pipeline', icon: ICONS.Partners },
    { id: 'intelligence', name: 'Market Intelligence', icon: ICONS.Intelligence },
    { id: 'settings', name: 'Settings', icon: ICONS.Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-1 bg-sky-500 rounded text-white"><ICONS.Patients /></span>
            HealthPulse CRM
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Home Healthcare</p>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                activeTab === item.id 
                  ? 'bg-sky-500/10 text-sky-400 border-r-4 border-sky-400' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">JD</div>
            <div>
              <p className="text-sm font-medium text-white leading-none">Jane Doe</p>
              <p className="text-xs text-slate-500 mt-1">Intake Coordinator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search leads, partners, or medical IDs..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg focus:bg-white focus:border-sky-400 focus:ring-0 text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <ICONS.Bell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
              <ICONS.Plus /> New Lead
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
