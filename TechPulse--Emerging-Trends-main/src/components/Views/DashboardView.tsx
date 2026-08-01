import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { KPI_CARDS, INNOVATION_CLUSTERS, TREND_PREDICTIONS, TOP_PAPERS } from '../../data/mockData';
import { ActiveView, InnovationCluster, ResearchPaper } from '../../types';

interface DashboardViewProps {
  onSelectView: (view: ActiveView) => void;
  onOpenPaperDetail?: (paper: ResearchPaper) => void;
}

const INTEREST_DATA = [
  { month: 'Jan', agenticAi: 25, quantum: 45, graphRag: 15, tinyMl: 30 },
  { month: 'Feb', agenticAi: 32, quantum: 48, graphRag: 22, tinyMl: 35 },
  { month: 'Mar', agenticAi: 45, quantum: 50, graphRag: 35, tinyMl: 40 },
  { month: 'Apr', agenticAi: 58, quantum: 52, graphRag: 48, tinyMl: 42 },
  { month: 'May', agenticAi: 72, quantum: 55, graphRag: 62, tinyMl: 55 },
  { month: 'Jun', agenticAi: 89, quantum: 58, graphRag: 78, tinyMl: 65 },
  { month: 'Jul', agenticAi: 98, quantum: 60, graphRag: 91, tinyMl: 72 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectView, onOpenPaperDetail }) => {
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | '2y' | 'all'>('6m');
  const [isLive, setIsLive] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState<InnovationCluster>(INNOVATION_CLUSTERS[0]);

  return (
    <div className="pt-20 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#0058be] text-[24px]">dashboard</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111c2a] tracking-tight">Market Overview</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#424754]">
            Real-time tech trends, innovation clusters, and research paper analytics.
          </p>
        </div>

        {/* Live / Historical Toggle */}
        <div className="flex items-center gap-2 bg-[#eef4ff] p-1 rounded-full border border-white/60 self-start sm:self-auto">
          <button
            onClick={() => setIsLive(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              isLive
                ? 'bg-[#0058be] text-white shadow-md'
                : 'text-[#424754] hover:text-[#0058be]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>LIVE</span>
          </button>
          <button
            onClick={() => setIsLive(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isLive
                ? 'bg-[#0058be] text-white shadow-md'
                : 'text-[#424754] hover:text-[#0058be]'
            }`}
          >
            HISTORICAL
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi) => (
          <div
            key={kpi.id}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer border border-white/60"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#424754] font-['JetBrains_Mono',monospace]">
                {kpi.title}
              </span>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-['JetBrains_Mono',monospace] uppercase ${
                  kpi.badgeType === 'growth'
                    ? 'bg-[#10B981]/15 text-[#10B981]'
                    : kpi.badgeType === 'new'
                    ? 'bg-[#6b38d4]/15 text-[#6b38d4]'
                    : kpi.badgeType === 'weekly'
                    ? 'bg-[#0058be]/15 text-[#0058be]'
                    : 'bg-[#111c2a]/10 text-[#111c2a]'
                }`}
              >
                {kpi.badgeText}
              </span>
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className={`w-11 h-11 rounded-xl ${kpi.iconBg} flex items-center justify-center ${kpi.iconColor}`}>
                <span className="material-symbols-outlined text-[24px]">{kpi.icon}</span>
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#111c2a]">{kpi.subtitle}</p>
                {kpi.changeText && (
                  <p className="text-xs text-[#10B981] font-semibold mt-0.5">{kpi.changeText}</p>
                )}
              </div>
            </div>

            {kpi.progressPercentage && (
              <div className="w-full bg-[#0058be]/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#0058be] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${kpi.progressPercentage}%` }}
                ></div>
              </div>
            )}

            {kpi.avatars && (
              <div className="flex -space-x-2 mt-3 overflow-hidden">
                {kpi.avatars.map((bg, idx) => (
                  <div
                    key={idx}
                    className={`inline-block h-6 w-6 rounded-full ring-2 ring-white ${bg}`}
                  ></div>
                ))}
              </div>
            )}

            {kpi.bars && (
              <div className="flex items-end gap-1 h-6 mt-3">
                {kpi.bars.map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#0058be]/40 hover:bg-[#0058be] rounded-t transition-all"
                    style={{ height: `${bar}%` }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Analytics + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Chart & World Map (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Chart Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#111c2a] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0058be]">show_chart</span>
                  Technology Interest Over Time
                </h3>
                <p className="text-xs text-[#424754]">Aggregated research & industry query volume index</p>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center gap-1 bg-[#eef4ff] p-1 rounded-xl">
                {(['6m', '1y', '2y', 'all'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase font-['JetBrains_Mono',monospace] transition-all ${
                      timeRange === r
                        ? 'bg-white text-[#0058be] shadow-sm'
                        : 'text-[#424754] hover:text-[#0058be]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={INTEREST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAgentic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0058be" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0058be" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGraphRag" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6b38d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6b38d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c2c6d6" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#727785" fontSize={11} tickLine={false} />
                  <YAxis stroke="#727785" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '12px', 
                      border: '1px solid #c2c6d6',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                    }} 
                  />
                  <Area type="monotone" dataKey="agenticAi" stroke="#0058be" strokeWidth={3} fillOpacity={1} fill="url(#colorAgentic)" name="Agentic AI" />
                  <Area type="monotone" dataKey="graphRag" stroke="#6b38d4" strokeWidth={2} fillOpacity={1} fill="url(#colorGraphRag)" name="GraphRAG" />
                  <Area type="monotone" dataKey="quantum" stroke="#00687a" strokeWidth={2} fill="none" name="Quantum Computing" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-[#c2c6d6]/20 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0058be]"></span>
                <span className="text-[#111c2a]">Agentic AI (+42%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6b38d4]"></span>
                <span className="text-[#111c2a]">GraphRAG (+38%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00687a]"></span>
                <span className="text-[#111c2a]">Quantum Computing (+12%)</span>
              </div>
            </div>
          </div>

          {/* Innovation Clusters Map Section */}
          <div className="glass-card rounded-3xl p-6 border border-white/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#111c2a] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0058be]">public</span>
                  Global Innovation Clusters
                </h3>
                <p className="text-xs text-[#424754]">Active startup hubs and research density mapping</p>
              </div>
              <span className="text-[10px] bg-[#d8e2ff] text-[#004395] px-3 py-1 rounded-full font-bold font-['JetBrains_Mono',monospace]">
                4 CLUSTERS MONITORED
              </span>
            </div>

            {/* Map Graphic Box */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/50 bg-[#111c2a] group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq4iyIk9_LzMQcgi8tZbMtq_O8xHVN6xdwK67sOrpgHxVevixSMZGZ5wHgLP_rdxl3gAw5E9r3-TZnP9DJteSFnFckUkF1vqj8wxGlxUsl3-hdn3uW9wbc73AjVLa2wB2PXD80v827xvmBQQBdgiw-Ii2xFF0t4EBH9Uvgwy2wCISzGo3X4do6WgfByE2SsAqd68_ZtHqeqYoxOtqyDpxUp95aSrfiA8naqgvZln4QiZ2tLRvFLOze"
                alt="Global Innovation Map"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Hotspot Markers */}
              {INNOVATION_CLUSTERS.map((cluster) => {
                const isSelected = selectedCluster.id === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedCluster(cluster)}
                    style={{
                      top: `${cluster.id === 'cluster-1' ? '35%' : cluster.id === 'cluster-2' ? '28%' : cluster.id === 'cluster-3' ? '40%' : '52%'}`,
                      left: `${cluster.id === 'cluster-1' ? '20%' : cluster.id === 'cluster-2' ? '48%' : cluster.id === 'cluster-3' ? '82%' : '68%'}`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all group/marker z-20 ${
                      isSelected ? 'scale-125 ring-4 ring-[#0058be]/50 bg-[#0058be]' : 'bg-white/80 hover:bg-white'
                    }`}
                  >
                    <span className={`block w-3 h-3 rounded-full ${isSelected ? 'bg-white' : 'bg-[#0058be]'} animate-ping`}></span>
                    <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-lg transition-all ${
                      isSelected ? 'bg-[#0058be] text-white' : 'bg-white text-[#111c2a] opacity-0 group-hover/marker:opacity-100'
                    }`}>
                      {cluster.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Cluster Details Card */}
            <div className="mt-4 p-4 bg-[#eef4ff] rounded-2xl border border-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-extrabold text-base text-[#111c2a]">{selectedCluster.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-['JetBrains_Mono',monospace] ${selectedCluster.statusColor}`}>
                    {selectedCluster.status}
                  </span>
                </div>
                <p className="text-xs text-[#424754] mb-2">{selectedCluster.details}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold text-[#424754] uppercase font-['JetBrains_Mono',monospace]">KEY STARTUPS:</span>
                  {selectedCluster.topStartups.map((st) => (
                    <span key={st} className="text-[11px] bg-white px-2 py-0.5 rounded-md font-semibold text-[#0058be]">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectView('analytics')}
                className="px-4 py-2 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#2170e4] transition-all whitespace-nowrap self-start sm:self-center"
              >
                Deep Dive Cluster
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Predictions & Research Papers (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Trend Predictions Box */}
          <div className="glass-card rounded-3xl p-6 border border-white/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#111c2a] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6b38d4]">auto_awesome</span>
                Trend Predictions
              </h3>
              <button
                onClick={() => onSelectView('predictions')}
                className="text-xs font-bold text-[#0058be] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {TREND_PREDICTIONS.map((pred) => (
                <div
                  key={pred.id}
                  className={`p-3.5 rounded-2xl border transition-all hover:scale-[1.01] ${pred.bgClass}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-[#111c2a]">{pred.title}</span>
                    <span className={`text-[10px] font-bold uppercase font-['JetBrains_Mono',monospace] ${pred.textClass}`}>
                      {pred.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#424754] mb-2">{pred.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-bold font-['JetBrains_Mono',monospace] text-[#727785]">
                    <span>{pred.confidence}</span>
                    <span className="text-[#0058be]">Impact Score: {pred.impactScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Research Papers Box */}
          <div className="glass-card rounded-3xl p-6 border border-white/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#111c2a] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0058be]">menu_book</span>
                Top Research Papers
              </h3>
              <span className="text-[10px] bg-[#d8e2ff] text-[#004395] px-2 py-0.5 rounded-full font-bold">
                850 INDEXED
              </span>
            </div>

            <div className="space-y-4">
              {TOP_PAPERS.map((paper) => (
                <div
                  key={paper.id}
                  onClick={() => onOpenPaperDetail && onOpenPaperDetail(paper)}
                  className="p-4 bg-white/60 hover:bg-white rounded-2xl border border-white/80 shadow-sm transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-[#6b38d4] font-['JetBrains_Mono',monospace] uppercase block mb-1">
                    {paper.category} • {paper.institution}
                  </span>
                  <h4 className="font-bold text-sm text-[#111c2a] group-hover:text-[#0058be] transition-colors mb-1 line-clamp-2">
                    {paper.title}
                  </h4>
                  <p className="text-xs text-[#424754] line-clamp-2 mb-2 opacity-80">
                    {paper.abstract}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-[#727785] font-['JetBrains_Mono',monospace]">
                    <span>{paper.authors}</span>
                    <span className="text-[#0058be] font-bold">{paper.downloads.toLocaleString()} reads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
