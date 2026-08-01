import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { LIVE_STATS } from '../../data/mockData';

interface LandingViewProps {
  onSelectView: (view: ActiveView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onSelectView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <div className="relative pt-16 pb-12 w-full max-w-[1440px] mx-auto px-4 md:px-8">
      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-center text-center overflow-hidden py-12">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0058be]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#6b38d4]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0058be]/10 border border-[#0058be]/20 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0058be] animate-pulse"></span>
            <span className="text-xs font-bold font-['JetBrains_Mono',monospace] text-[#0058be] tracking-wider uppercase">
              2024 TRENDS LIVE ANALYTICS
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111c2a] mb-6 leading-tight tracking-tight text-glow">
            Stay Ahead of <span className="text-[#0058be] italic font-serif">Tomorrow's</span> Technology
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#424754] mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
            AI-powered insights into emerging technologies, research breakthroughs, startup innovation, and future trends.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <button
              onClick={() => onSelectView('dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-[#0058be] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2.5 hover:bg-[#2170e4] hover:shadow-[0_8px_30px_rgba(0,88,190,0.35)] hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-[#0058be]/20"
            >
              <span>Explore Trends</span>
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </button>

            <button
              onClick={() => onSelectView('ai-assistant')}
              className="w-full sm:w-auto px-8 py-4 glass-card text-[#0058be] rounded-xl font-bold text-base border-[#0058be]/20 hover:bg-[#0058be]/5 active:scale-95 transition-all shadow-sm"
            >
              Try AI Assistant
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 animate-bounce opacity-40">
          <span className="material-symbols-outlined text-[#424754]">expand_more</span>
        </div>
      </section>

      {/* Live Stats Strip */}
      <section className="relative z-20 -mt-6 mb-20">
        <div className="glass-card rounded-[2rem] p-3 md:p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 shadow-xl shadow-[#0058be]/5 border border-white/60">
          {LIVE_STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/50 hover:bg-white/80 transition-all group cursor-pointer"
              onClick={() => onSelectView('dashboard')}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider font-['JetBrains_Mono',monospace] text-[#424754] group-hover:text-[#0058be] transition-colors">
                {stat.label}
              </span>
              <span className="text-2xl font-extrabold text-[#111c2a] mt-1 tracking-tight">
                {stat.value}
              </span>

              {stat.type === 'growth' && (
                <div className="flex items-center gap-0.5 mt-1 text-[#10B981] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  {stat.change}
                </div>
              )}

              {stat.type === 'today' && (
                <span className="text-[10px] text-[#424754]/70 font-bold mt-1 tracking-wider uppercase font-['JetBrains_Mono',monospace]">
                  {stat.subtext}
                </span>
              )}

              {stat.type === 'progress' && (
                <div className="w-full h-1.5 bg-[#0058be]/10 rounded-full mt-2.5 overflow-hidden">
                  <div className="w-3/4 h-full bg-[#0058be] rounded-full"></div>
                </div>
              )}

              {stat.type === 'icon' && (
                <span className="material-symbols-outlined text-[#0058be] mt-1 text-[18px]">
                  {stat.iconName}
                </span>
              )}

              {stat.type === 'badge' && (
                <span className="text-[#10B981] text-xs font-bold mt-1">
                  {stat.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Platform Capabilities Bento Grid */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#111c2a] mb-2 tracking-tight">Platform Capabilities</h2>
            <p className="text-base text-[#424754] max-w-xl">
              Harnessing the power of high-density data modeling to deliver hyper-accurate technological forecasts.
            </p>
          </div>
          <button
            onClick={() => onSelectView('dashboard')}
            className="text-[#0058be] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm group"
          >
            <span>View Detailed Features</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Feature 1: Trend Detection */}
          <div className="md:col-span-8 glass-card rounded-3xl p-8 lg:p-10 flex flex-col justify-between group overflow-hidden relative border border-white/60">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#0058be]/10 rounded-2xl flex items-center justify-center mb-6 text-[#0058be]">
                <span className="material-symbols-outlined text-[32px]">insights</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111c2a] mb-4">Autonomous Trend Detection</h3>
              <p className="text-base text-[#424754] max-w-md leading-relaxed">
                Our neural networks scan millions of signals across academic journals, patent filings, and social commits to identify patterns 18 months before they hit mainstream.
              </p>
            </div>

            <div className="relative mt-8 h-48 lg:h-56 rounded-2xl border border-white/50 overflow-hidden bg-gradient-to-t from-[#0058be]/10 to-white/40 p-6 flex items-end justify-between gap-3">
              <div className="w-full bg-[#0058be]/20 rounded-t-xl h-24 animate-[pulse_3s_infinite]"></div>
              <div className="w-full bg-[#0058be]/40 rounded-t-xl h-40 animate-[pulse_4s_infinite]"></div>
              <div className="w-full bg-[#0058be]/30 rounded-t-xl h-32 animate-[pulse_2s_infinite]"></div>
              <div className="w-full bg-[#0058be]/70 rounded-t-xl h-48 animate-[pulse_5s_infinite]"></div>
              <div className="w-full bg-[#0058be]/20 rounded-t-xl h-16 animate-[pulse_3.5s_infinite]"></div>
            </div>
          </div>

          {/* Bento Feature 2: AI Summarization */}
          <div className="md:col-span-4 glass-card rounded-3xl p-8 lg:p-10 flex flex-col group bg-gradient-to-br from-[#0058be] to-[#2170e4] text-white shadow-xl shadow-[#0058be]/20">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white backdrop-blur-md">
              <span className="material-symbols-outlined text-[32px] filled">auto_awesome</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Precision Summarization</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-8">
              Distill 10,000+ words of technical documentation into executive briefings in seconds. Focus on the 'why' while we handle the 'what'.
            </p>
            <div className="mt-auto space-y-3">
              <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-white/80"></div>
                  <div className="w-12 h-2 rounded-full bg-white/30"></div>
                </div>
                <div className="h-2 w-full bg-white/50 rounded-full"></div>
              </div>
              <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
                <div className="h-2 w-3/4 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Bento Feature 3: Predictive Analytics */}
          <div className="md:col-span-4 glass-card rounded-3xl p-8 lg:p-10 flex flex-col group border border-white/60">
            <div className="w-14 h-14 bg-[#6b38d4]/10 rounded-2xl flex items-center justify-center mb-6 text-[#6b38d4]">
              <span className="material-symbols-outlined text-[32px]">query_stats</span>
            </div>
            <h3 className="text-xl font-bold text-[#111c2a] mb-4">Predictive Trajectory</h3>
            <p className="text-sm text-[#424754] leading-relaxed">
              Quantify the velocity and impact of innovation cycles. Forecast market penetration with 94% accuracy using our PulseEngine™.
            </p>
          </div>

          {/* Bento Feature 4: Network Visualizer */}
          <div className="md:col-span-8 glass-card rounded-3xl overflow-hidden relative min-h-[300px] border border-white/60 flex flex-col justify-end">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0VCx2kwpkA2vLCLeP7iRWIlUNIU0P7w6HXZtabVF_M4z9qkszC-LaIdH5QWnLBOphy_z5u4g4X46TZ0QXqC7rRZZiNxcZ-15-eCoVLVciNlNtZVSnPYC0TI_37tpce-i1pPH927z7zkZL2_nN77zArGy0g2c3q_eA46IMjK56aCh1n-9yBW1CwF7Pv0PSXUMGlZR9Yq7L_udE9Yz-l3fJpvQk-t6vHn3MN4iTLwNbg7E8ArCyVfLL"
                alt="Knowledge Graph Network"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 p-6 lg:p-8">
              <div className="p-6 glass-card rounded-2xl border-white/60 shadow-lg max-w-sm bg-white/85">
                <span className="text-[11px] font-bold text-[#0058be] block mb-1 font-['JetBrains_Mono',monospace] uppercase">
                  REAL-TIME MAPPING
                </span>
                <p className="text-base font-bold text-[#111c2a]">Global Innovation Clusters</p>
                <p className="text-xs text-[#424754] mt-2 leading-relaxed">
                  Currently tracking 45,000+ relational data points between startups and VCs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="mb-16">
        <div className="relative bg-[#111c2a] rounded-[2.5rem] p-10 md:p-16 overflow-hidden text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0058be]/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6b38d4]/20 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <h2 className="relative z-10 text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Ready to pioneer the future?
          </h2>
          <p className="relative z-10 text-base text-white/70 max-w-2xl mx-auto mb-8 font-normal">
            Join 150,000+ technology leaders receiving daily intelligence reports.
          </p>

          <form onSubmit={handleSubscribe} className="relative z-10 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              required
              className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#0058be] outline-none transition-all text-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0058be] text-white rounded-xl font-bold text-sm whitespace-nowrap hover:bg-[#2170e4] active:scale-95 transition-all shadow-lg shadow-[#0058be]/30"
            >
              Get Started
            </button>
          </form>

          {subscribed && (
            <p className="relative z-10 text-xs text-[#10B981] font-bold mt-4 animate-in fade-in">
              ✓ Intelligence report access link sent to your inbox!
            </p>
          )}

          <p className="relative z-10 text-[11px] text-white/40 mt-4 font-['JetBrains_Mono',monospace]">
            Free 14-day trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-8 border-t border-[#c2c6d6]/30 text-xs text-[#424754]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <span className="text-xl font-black text-[#0058be] tracking-tight block mb-3">TechPulse</span>
            <p className="text-xs text-[#424754] max-w-xs mb-6 leading-relaxed">
              The ultimate intelligence platform for those who live in tomorrow. Built on data, powered by humans, guided by AI.
            </p>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#424754] hover:text-[#0058be] shadow-sm cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#424754] hover:text-[#0058be] shadow-sm cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[18px]">hub</span>
              </span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#424754] hover:text-[#0058be] shadow-sm cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#111c2a] uppercase tracking-wider font-['JetBrains_Mono',monospace] mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onSelectView('dashboard')} className="hover:text-[#0058be]">Trend Engine</button></li>
              <li><button onClick={() => onSelectView('analytics')} className="hover:text-[#0058be]">Global Network</button></li>
              <li><button onClick={() => onSelectView('predictions')} className="hover:text-[#0058be]">API Access</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#111c2a] uppercase tracking-wider font-['JetBrains_Mono',monospace] mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-[#0058be]">About Us</a></li>
              <li><a href="#" className="hover:text-[#0058be]">Careers</a></li>
              <li><a href="#" className="hover:text-[#0058be]">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#111c2a] uppercase tracking-wider font-['JetBrains_Mono',monospace] mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-[#0058be]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#0058be]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#0058be]">System Status</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#c2c6d6]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#424754]/70">
          <span>© 2026 TechPulse Intelligence Platforms Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#0058be]">Terms of Service</a>
            <a href="#" className="hover:text-[#0058be]">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
