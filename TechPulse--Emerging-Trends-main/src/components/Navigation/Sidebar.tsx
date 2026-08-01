import React from 'react';
import { ActiveView } from '../../types';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onOpenSettings?: () => void;
  onOpenSupport?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  onOpenSettings,
  onOpenSupport,
}) => {
  const navItems: Array<{
    id: ActiveView;
    label: string;
    icon: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'news-feed', label: 'News Feed', icon: 'newspaper' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'smart_toy' },
    { id: 'predictions', label: 'Predictions', icon: 'query_stats' },
  ];

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex h-screen w-72 fixed left-0 top-0 backdrop-blur-xl border-r border-white/20 shadow-sm bg-white/70 dark:bg-white/70 z-[60] flex-col p-4 space-y-2">
        {/* Brand Header */}
        <div 
          onClick={() => onSelectView('global-trends')}
          className="flex items-center gap-3 px-2 py-3 mb-4 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0058be] flex items-center justify-center text-white shadow-md shadow-[#0058be]/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined filled text-[24px]">switch_account</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0058be] tracking-tight group-hover:text-[#2170e4] transition-colors">TechPulse</h1>
            <p className="text-[11px] font-semibold text-[#424754] uppercase tracking-wider font-['JetBrains_Mono',monospace]">Intelligence Platform</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {/* Landing / Global Trends Link */}
          <button
            onClick={() => onSelectView('global-trends')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'global-trends'
                ? 'bg-[#d8e2ff] text-[#004395] shadow-sm'
                : 'text-[#424754] hover:bg-[#dde9fc] hover:text-[#0058be]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span>Global Trends</span>
          </button>

          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#2170e4] text-white shadow-sm shadow-[#2170e4]/30'
                    : 'text-[#424754] hover:bg-[#dde9fc] hover:text-[#0058be]'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'filled' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Upgrade to Pro Card */}
        <div className="mt-auto space-y-2">
          <div className="p-4 bg-gradient-to-br from-[#2170e4] to-[#8455ef] rounded-xl text-white shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 font-['JetBrains_Mono',monospace] mb-1">PRO FEATURES</p>
            <p className="text-base font-extrabold mb-3">Upgrade to Pro</p>
            <button 
              onClick={() => onSelectView('ai-assistant')}
              className="w-full py-2 bg-white text-[#0058be] rounded-lg text-xs font-bold hover:bg-[#f8f9ff] active:scale-95 transition-all shadow-md"
            >
              GET STARTED
            </button>
          </div>

          <button 
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-4 py-2 text-[#424754] hover:bg-[#dde9fc] hover:text-[#0058be] transition-all rounded-lg text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </button>

          <button 
            onClick={onOpenSupport}
            className="w-full flex items-center gap-3 px-4 py-2 text-[#424754] hover:bg-[#dde9fc] hover:text-[#0058be] transition-all rounded-lg text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Support</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-t border-white/30 flex justify-around items-center px-2 z-[60] shadow-lg">
        <button 
          onClick={() => onSelectView('global-trends')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${activeView === 'global-trends' ? 'text-[#0058be]' : 'text-[#424754]'}`}
        >
          <span className="material-symbols-outlined text-[20px]">public</span>
          <span className="text-[10px] font-bold font-['JetBrains_Mono',monospace]">TRENDS</span>
        </button>
        <button 
          onClick={() => onSelectView('dashboard')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${activeView === 'dashboard' ? 'text-[#0058be]' : 'text-[#424754]'}`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeView === 'dashboard' ? 'filled' : ''}`}>dashboard</span>
          <span className="text-[10px] font-bold font-['JetBrains_Mono',monospace]">DASHBOARD</span>
        </button>
        <button 
          onClick={() => onSelectView('news-feed')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${activeView === 'news-feed' ? 'text-[#0058be]' : 'text-[#424754]'}`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeView === 'news-feed' ? 'filled' : ''}`}>newspaper</span>
          <span className="text-[10px] font-bold font-['JetBrains_Mono',monospace]">NEWS</span>
        </button>
        <button 
          onClick={() => onSelectView('ai-assistant')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${activeView === 'ai-assistant' ? 'text-[#0058be]' : 'text-[#424754]'}`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeView === 'ai-assistant' ? 'filled' : ''}`}>smart_toy</span>
          <span className="text-[10px] font-bold font-['JetBrains_Mono',monospace]">AI</span>
        </button>
      </nav>
    </>
  );
};
