import React from 'react';
import { ResearchPaper } from '../../types';

interface PaperDetailModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
  onAskAi: (query: string) => void;
}

export const PaperDetailModal: React.FC<PaperDetailModalProps> = ({
  paper,
  onClose,
  onAskAi,
}) => {
  if (!paper) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start gap-4 pb-4 border-b border-[#c2c6d6]/20">
          <div>
            <span className="text-[10px] font-extrabold text-[#6b38d4] font-['JetBrains_Mono',monospace] uppercase block mb-1">
              {paper.category} • {paper.institution} • {paper.date}
            </span>
            <h2 className="text-xl font-extrabold text-[#111c2a] leading-tight">{paper.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#424754] hover:bg-[#eef4ff] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <p className="font-bold text-[#727785] font-['JetBrains_Mono',monospace] uppercase mb-1">Authors:</p>
            <p className="font-semibold text-[#111c2a] text-sm">{paper.authors}</p>
          </div>

          <div>
            <p className="font-bold text-[#727785] font-['JetBrains_Mono',monospace] uppercase mb-1">Abstract:</p>
            <div className="p-4 bg-[#eef4ff] rounded-2xl border border-white/80 text-sm text-[#424754] leading-relaxed font-normal">
              {paper.abstract}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/80 rounded-xl border border-[#c2c6d6]/30 text-xs">
            <span className="font-bold text-[#0058be]">{paper.downloads.toLocaleString()} Citations & Downloads</span>
            <span className="text-[#10B981] font-bold">Peer Reviewed Index</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#c2c6d6]/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAi(`Explain the key breakthroughs in the paper: "${paper.title}"`);
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#6b38d4] text-white rounded-xl text-xs font-bold hover:bg-[#8455ef] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Ask AI to Summarize Paper</span>
          </button>

          <button
            onClick={() => {
              alert(`Downloading PDF for ${paper.title}`);
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#2170e4] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
