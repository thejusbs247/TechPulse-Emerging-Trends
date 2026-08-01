import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { USER_PROFILE } from '../../data/mockData';

interface TopAppBarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onSearch?: (query: string) => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  activeView,
  onSelectView,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] h-16 backdrop-blur-lg border-b border-white/20 bg-white/70 dark:bg-white/70 z-50 flex justify-between items-center px-4 md:px-8 ml-auto shadow-sm">
      {/* Search and Navigation Links */}
      <div className="flex items-center gap-6 flex-1">
        <form 
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-xs lg:max-w-md hidden sm:block"
        >
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#424754] text-[20px] opacity-70">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Global Trends, papers, startups..."
            className="w-full bg-[#eef4ff] border-none rounded-full pl-10 pr-4 py-2 text-sm text-[#111c2a] focus:ring-2 focus:ring-[#0058be]/30 transition-all outline-none placeholder:text-[#424754]/60 font-medium"
          />
        </form>

        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => onSelectView('global-trends')}
            className={`text-xs font-bold font-['JetBrains_Mono',monospace] transition-colors pb-1 border-b-2 ${
              activeView === 'global-trends'
                ? 'text-[#0058be] border-[#0058be]'
                : 'text-[#424754] border-transparent hover:text-[#0058be]'
            }`}
          >
            Global Trends
          </button>
          <button
            onClick={() => onSelectView('analytics')}
            className={`text-xs font-bold font-['JetBrains_Mono',monospace] transition-colors pb-1 border-b-2 ${
              activeView === 'analytics'
                ? 'text-[#0058be] border-[#0058be]'
                : 'text-[#424754] border-transparent hover:text-[#0058be]'
            }`}
          >
            Network
          </button>
          <button
            onClick={() => onSelectView('predictions')}
            className={`text-xs font-bold font-['JetBrains_Mono',monospace] transition-colors pb-1 border-b-2 ${
              activeView === 'predictions'
                ? 'text-[#0058be] border-[#0058be]'
                : 'text-[#424754] border-transparent hover:text-[#0058be]'
            }`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Action Buttons & User Profile */}
      <div className="flex items-center gap-3">
        {/* Ask AI Button */}
        <button
          onClick={() => onSelectView('ai-assistant')}
          className="bg-[#0058be] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#2170e4] active:scale-95 transition-all text-xs font-extrabold uppercase tracking-wider font-['JetBrains_Mono',monospace] shadow-md shadow-[#0058be]/20"
        >
          <span className="material-symbols-outlined filled text-[18px]">auto_awesome</span>
          <span>Ask AI</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#424754] hover:bg-[#dde9fc] rounded-full transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-4 z-50 animate-in fade-in duration-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-sm text-[#111c2a]">Intelligence Alerts</h4>
                <span className="text-[10px] bg-[#d8e2ff] text-[#004395] px-2 py-0.5 rounded-full font-bold">3 NEW</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#eef4ff] rounded-xl hover:bg-[#e5eeff] transition-colors cursor-pointer">
                  <p className="font-bold text-[#0058be]">Agentic AI spike detected</p>
                  <p className="text-[#424754] mt-0.5">+42% query volume in last 24h</p>
                </div>
                <div className="p-2.5 bg-[#eef4ff] rounded-xl hover:bg-[#e5eeff] transition-colors cursor-pointer">
                  <p className="font-bold text-[#6b38d4]">New GraphRAG paper published</p>
                  <p className="text-[#424754] mt-0.5">Microsoft Research • 35.1k reads</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onSelectView('ai-assistant')}
          className="p-2 text-[#424754] hover:bg-[#dde9fc] rounded-full transition-colors"
          title="Activity History"
        >
          <span className="material-symbols-outlined text-[20px]">history</span>
        </button>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#0058be]/30 hover:border-[#0058be] transition-all shadow-sm active:scale-95"
          >
            <img
              src={USER_PROFILE.avatarUrl}
              alt={USER_PROFILE.name}
              className="w-full h-full object-cover"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-4 z-50 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 pb-3 mb-3 border-b border-[#c2c6d6]/30">
                <img src={USER_PROFILE.avatarUrl} alt={USER_PROFILE.name} className="w-10 h-10 rounded-full object-cover border" />
                <div>
                  <p className="font-bold text-sm text-[#111c2a]">{USER_PROFILE.name}</p>
                  <p className="text-xs text-[#424754]">{USER_PROFILE.title}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <button 
                  onClick={() => { setShowUserMenu(false); onSelectView('dashboard'); }}
                  className="w-full text-left px-3 py-2 hover:bg-[#eef4ff] rounded-lg font-medium text-[#111c2a] transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">dashboard</span>
                  Dashboard Overview
                </button>
                <button 
                  onClick={() => { setShowUserMenu(false); onSelectView('ai-assistant'); }}
                  className="w-full text-left px-3 py-2 hover:bg-[#eef4ff] rounded-lg font-medium text-[#111c2a] transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  AI Assistant Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
