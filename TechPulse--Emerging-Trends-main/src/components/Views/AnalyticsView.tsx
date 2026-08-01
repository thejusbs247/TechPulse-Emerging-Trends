import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { ActiveView } from '../../types';

interface AnalyticsViewProps {
  onSelectView: (view: ActiveView) => void;
}

const DOMAIN_GROWTH = [
  { domain: 'Generative AI', growth: 142, capital: 8.4 },
  { domain: 'Quantum Computing', growth: 88, capital: 3.2 },
  { domain: 'Biotech & Synthetic Biology', growth: 76, capital: 5.1 },
  { domain: 'Clean Energy & Fusion', growth: 64, capital: 6.8 },
  { domain: 'Semiconductors & Edge', growth: 110, capital: 9.2 },
];

const FUNDING_DISTRIBUTION = [
  { name: 'Seed / Series A', value: 35, color: '#0058be' },
  { name: 'Series B & C', value: 40, color: '#2170e4' },
  { name: 'Growth / IPO', value: 25, color: '#8455ef' },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onSelectView }) => {
  const [selectedDomain, setSelectedDomain] = useState('Generative AI');

  return (
    <div className="pt-20 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c6d6]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#0058be] text-[28px]">monitoring</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111c2a] tracking-tight">Technology Domain Analytics</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#424754]">
            Quantitative assessment of patent filings, academic citations, and VC capital deployment.
          </p>
        </div>

        <button
          onClick={() => onSelectView('ai-assistant')}
          className="px-4 py-2 bg-[#0058be] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#2170e4] transition-all self-start sm:self-auto shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>Generate Executive Briefing</span>
        </button>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Domain Growth Velocity (8 Cols) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-white/60">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#111c2a]">Growth Velocity & Capital Deployment ($B)</h3>
              <p className="text-xs text-[#424754]">Year-over-year research activity index</p>
            </div>
            <span className="text-[10px] font-bold bg-[#d8e2ff] text-[#004395] px-2.5 py-1 rounded-full font-['JetBrains_Mono',monospace]">
              Q3 2024 BENCHMARK
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DOMAIN_GROWTH} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c2c6d6" opacity={0.3} />
                <XAxis dataKey="domain" stroke="#727785" fontSize={11} tickLine={false} />
                <YAxis stroke="#727785" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px', 
                    border: '1px solid #c2c6d6' 
                  }} 
                />
                <Bar dataKey="growth" fill="#0058be" radius={[8, 8, 0, 0]} name="YoY Growth %" />
                <Bar dataKey="capital" fill="#6b38d4" radius={[8, 8, 0, 0]} name="Capital ($B)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funding Stage Distribution (4 Cols) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-white/60 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#111c2a] mb-1">Venture Allocation Stage</h3>
            <p className="text-xs text-[#424754] mb-4">Capital deployment across investment maturity</p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={FUNDING_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {FUNDING_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#c2c6d6]/20">
            {FUNDING_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="font-medium text-[#111c2a]">{item.name}</span>
                </div>
                <span className="font-bold text-[#0058be] font-['JetBrains_Mono',monospace]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
