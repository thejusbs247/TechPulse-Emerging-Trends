import React from 'react';
import { TREND_PREDICTIONS } from '../../data/mockData';
import { ActiveView } from '../../types';

interface PredictionsViewProps {
  onSelectView: (view: ActiveView) => void;
}

export const PredictionsView: React.FC<PredictionsViewProps> = ({ onSelectView }) => {
  return (
    <div className="pt-20 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto space-y-8">
      {/* Header Bar */}
      <div className="border-b border-[#c2c6d6]/20 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#6b38d4] text-[28px]">query_stats</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111c2a] tracking-tight">18-Month Technology Radar</h1>
        </div>
        <p className="text-xs sm:text-sm text-[#424754]">
          Algorithmic predictions quantifying adoption timelines and market impact using PulseEngine™ models.
        </p>
      </div>

      {/* Grid of Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TREND_PREDICTIONS.map((pred) => (
          <div
            key={pred.id}
            className="glass-card rounded-3xl p-6 border border-white/60 space-y-4 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full font-['JetBrains_Mono',monospace] ${
                  pred.status === 'GROWING'
                    ? 'bg-[#10B981]/15 text-[#10B981]'
                    : pred.status === 'RISING'
                    ? 'bg-[#0058be]/15 text-[#0058be]'
                    : 'bg-[#6b38d4]/15 text-[#6b38d4]'
                }`}>
                  {pred.status}
                </span>
                <h3 className="text-xl font-extrabold text-[#111c2a] mt-2">{pred.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#0058be] font-['JetBrains_Mono',monospace]">
                  {pred.impactScore}
                </span>
                <span className="text-[10px] text-[#727785] block uppercase font-['JetBrains_Mono',monospace]">IMPACT SCORE</span>
              </div>
            </div>

            <p className="text-sm text-[#424754] leading-relaxed">{pred.description}</p>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold font-['JetBrains_Mono',monospace]">
                <span className="text-[#424754]">Algorithmic Confidence:</span>
                <span className="text-[#0058be]">{pred.confidence}</span>
              </div>
              <div className="w-full bg-[#0058be]/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0058be] h-full rounded-full"
                  style={{ width: `${pred.impactScore}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#c2c6d6]/20 flex justify-end">
              <button
                onClick={() => onSelectView('ai-assistant')}
                className="px-4 py-2 bg-[#eef4ff] hover:bg-[#0058be] hover:text-white rounded-xl text-xs font-bold text-[#0058be] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>Ask AI About {pred.title}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
