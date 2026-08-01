import React, { useState } from 'react';
import { NEWS_ARTICLES, TRENDING_TAGS, RECOMMENDED_ARTICLES } from '../../data/mockData';
import { ActiveView, NewsArticle } from '../../types';

interface NewsFeedViewProps {
  onSelectView: (view: ActiveView) => void;
}

export const NewsFeedView: React.FC<NewsFeedViewProps> = ({ onSelectView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  const categories = ['ALL', 'QUANTUM COMPUTING', 'AI POLICY', 'SECURITY', 'SEMICONDUCTORS'];

  const toggleBookmark = (id: string) => {
    setArticles((prev) =>
      prev.map((art) =>
        art.id === id ? { ...art, isBookmarked: !art.isBookmarked } : art
      )
    );
  };

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'ALL' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.aiSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-20 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c2c6d6]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#0058be] text-[24px]">newspaper</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111c2a] tracking-tight">Real-Time Tech Feed</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#424754]">
            AI-aggregated intelligence from 4,200+ technology publications, research logs, and security feeds daily.
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#424754] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter real-time feed..."
            className="w-full bg-[#eef4ff] border-none rounded-xl pl-9 pr-4 py-2 text-xs text-[#111c2a] focus:ring-2 focus:ring-[#0058be] outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-['JetBrains_Mono',monospace] whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#0058be] text-white shadow-md shadow-[#0058be]/20'
                : 'bg-white/80 text-[#424754] hover:bg-[#eef4ff] hover:text-[#0058be] border border-white/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: News Cards (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center text-[#424754]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#0058be]">search_off</span>
              <p className="font-bold">No articles match your current filter.</p>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isExpanded = expandedArticleId === article.id;
              return (
                <article
                  key={article.id}
                  className="glass-card rounded-3xl overflow-hidden border border-white/60 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Article Image */}
                    <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden group">
                      <img
                        src={article.imageUrl}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md font-['JetBrains_Mono',monospace]">
                        {article.source}
                      </span>
                    </div>

                    {/* Article Body */}
                    <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[11px] font-extrabold uppercase font-['JetBrains_Mono',monospace] ${article.categoryColor}`}>
                            {article.category}
                          </span>
                          <span className="text-[11px] text-[#727785] font-['JetBrains_Mono',monospace]">
                            {article.timeAgo}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-[#111c2a] hover:text-[#0058be] transition-colors leading-snug mb-3">
                          {article.title}
                        </h2>

                        {/* AI Summary Callout */}
                        <div className="p-3.5 bg-[#eef4ff] rounded-2xl border border-white/80 text-xs text-[#111c2a] relative">
                          <div className="flex items-center gap-1.5 mb-1 text-[#0058be] font-bold text-[10px] font-['JetBrains_Mono',monospace] uppercase">
                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                            <span>AI Executive Summary</span>
                          </div>
                          <p className="leading-relaxed text-[#424754] font-medium">{article.aiSummary}</p>
                        </div>

                        {/* Expanded Full Article Content */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-[#c2c6d6]/30 text-xs text-[#111c2a] space-y-2 animate-in fade-in">
                            <p className="font-bold text-[#0058be]">Deep Analysis:</p>
                            <p className="leading-relaxed text-[#424754]">{article.content}</p>
                          </div>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#c2c6d6]/20">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-['JetBrains_Mono',monospace] ${
                            article.sentiment === 'POSITIVE'
                              ? 'bg-[#10B981]/15 text-[#10B981]'
                              : article.sentiment === 'NEGATIVE'
                              ? 'bg-[#ba1a1a]/15 text-[#ba1a1a]'
                              : 'bg-[#727785]/15 text-[#727785]'
                          }`}>
                            {article.sentiment}
                          </span>
                          <span className="text-[11px] text-[#727785]">{article.readTime}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleBookmark(article.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              article.isBookmarked
                                ? 'bg-[#0058be] text-white'
                                : 'text-[#424754] hover:bg-[#eef4ff]'
                            }`}
                            title="Bookmark Article"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {article.isBookmarked ? 'bookmark_added' : 'bookmark'}
                            </span>
                          </button>

                          <button
                            onClick={() => setExpandedArticleId(isExpanded ? null : article.id)}
                            className="text-xs font-bold text-[#0058be] hover:underline flex items-center gap-1"
                          >
                            <span>{isExpanded ? 'Show Less' : 'Read Full'}</span>
                            <span className="material-symbols-outlined text-[16px]">
                              {isExpanded ? 'expand_less' : 'expand_more'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Right Col: Trending Tags & Summit Promo (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Trending Tags Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/60">
            <h3 className="text-lg font-bold text-[#111c2a] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0058be]">local_fire_department</span>
              Trending Tech Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag.replace('#', ''))}
                  className="px-3 py-1.5 bg-[#eef4ff] hover:bg-[#0058be] hover:text-white rounded-xl text-xs font-bold text-[#0058be] font-['JetBrains_Mono',monospace] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended For You */}
          <div className="glass-card rounded-3xl p-6 border border-white/60">
            <h3 className="text-lg font-bold text-[#111c2a] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#6b38d4]">thumb_up</span>
              Recommended For You
            </h3>
            <div className="space-y-3">
              {RECOMMENDED_ARTICLES.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 bg-white/60 hover:bg-white rounded-xl border border-white/80 transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-[#6b38d4] font-['JetBrains_Mono',monospace] block mb-1">
                    {rec.category}
                  </span>
                  <p className="font-bold text-xs text-[#111c2a] group-hover:text-[#0058be] transition-colors mb-1">
                    {rec.title}
                  </p>
                  <span className="text-[10px] text-[#727785]">{rec.readTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TechPulse Summit Promo Card */}
          <div className="glass-card rounded-3xl overflow-hidden border border-white/60 relative group bg-gradient-to-br from-[#111c2a] to-[#2170e4] text-white p-6 shadow-xl">
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full font-['JetBrains_Mono',monospace]">
                ANNUAL EVENT
              </span>
              <h3 className="text-xl font-extrabold text-white">TechPulse Summit 2024</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Join 5,000+ AI researchers, founders, and investors in San Francisco or stream live globally.
              </p>
              <button 
                onClick={() => onSelectView('ai-assistant')}
                className="w-full py-2.5 bg-white text-[#0058be] rounded-xl font-bold text-xs hover:bg-[#eef4ff] transition-all shadow-md mt-2"
              >
                Register Now • Free Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
