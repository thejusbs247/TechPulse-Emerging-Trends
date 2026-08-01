import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [aiModel, setAiModel] = useState('gemini-3.6-flash');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-[#c2c6d6]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0058be]">settings</span>
            <h2 className="text-xl font-extrabold text-[#111c2a]">Platform Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#424754] hover:bg-[#eef4ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* AI Model Selection */}
          <div>
            <label className="block font-bold text-[#111c2a] mb-1 font-['JetBrains_Mono',monospace] uppercase">
              AI Reasoning Engine
            </label>
            <select
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full bg-[#eef4ff] border-none rounded-xl px-3 py-2.5 text-xs text-[#111c2a] font-semibold focus:ring-2 focus:ring-[#0058be] outline-none"
            >
              <option value="gemini-3.6-flash">Gemini 3.6 Flash (Server Side - High Speed)</option>
              <option value="gemini-3.1-pro">Gemini 3.1 Pro (Deep Reasoning)</option>
            </select>
          </div>

          {/* Notifications toggles */}
          <div className="space-y-3 pt-2">
            <p className="font-bold text-[#111c2a] font-['JetBrains_Mono',monospace] uppercase">Alert Preferences</p>
            <label className="flex items-center justify-between p-3 bg-[#eef4ff] rounded-xl cursor-pointer">
              <span className="font-medium text-[#111c2a]">Daily AI Intelligence Briefing Email</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0058be] rounded focus:ring-0"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-[#eef4ff] rounded-xl cursor-pointer">
              <span className="font-medium text-[#111c2a]">Real-Time Tech Anomaly Browser Alerts</span>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0058be] rounded focus:ring-0"
              />
            </label>
          </div>

          {/* Status info */}
          <div className="p-3 bg-[#10B981]/10 rounded-xl text-[#10B981] font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Gemini Server-Side API Connection Active</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#c2c6d6]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#2170e4] transition-all shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
