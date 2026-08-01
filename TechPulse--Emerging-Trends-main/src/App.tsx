import React, { useState } from 'react';
import { ActiveView, ResearchPaper } from './types';
import { Sidebar } from './components/Navigation/Sidebar';
import { TopAppBar } from './components/Navigation/TopAppBar';
import { LandingView } from './components/Views/LandingView';
import { DashboardView } from './components/Views/DashboardView';
import { AnalyticsView } from './components/Views/AnalyticsView';
import { NewsFeedView } from './components/Views/NewsFeedView';
import { AiAssistantView } from './components/Views/AiAssistantView';
import { PredictionsView } from './components/Views/PredictionsView';
import { SettingsModal } from './components/Modals/SettingsModal';
import { PaperDetailModal } from './components/Modals/PaperDetailModal';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('global-trends');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const handleOpenPaper = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
  };

  const handleAskAiAboutPaper = (query: string) => {
    setActiveView('ai-assistant');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#111c2a] flex flex-col antialiased selection:bg-[#d8e2ff] selection:text-[#004395]">
      {/* Fixed Sidebar */}
      <Sidebar
        activeView={activeView}
        onSelectView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSupport={() => setIsSettingsOpen(true)}
      />

      {/* Top Header Bar */}
      <TopAppBar
        activeView={activeView}
        onSelectView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearch={(query) => {
          setActiveView('news-feed');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 transition-all">
        {activeView === 'global-trends' && (
          <LandingView onSelectView={(view) => setActiveView(view)} />
        )}

        {activeView === 'dashboard' && (
          <DashboardView
            onSelectView={(view) => setActiveView(view)}
            onOpenPaperDetail={handleOpenPaper}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView onSelectView={(view) => setActiveView(view)} />
        )}

        {activeView === 'news-feed' && (
          <NewsFeedView onSelectView={(view) => setActiveView(view)} />
        )}

        {activeView === 'ai-assistant' && (
          <AiAssistantView onSelectView={(view) => setActiveView(view)} />
        )}

        {activeView === 'predictions' && (
          <PredictionsView onSelectView={(view) => setActiveView(view)} />
        )}
      </main>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <PaperDetailModal
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
        onAskAi={handleAskAiAboutPaper}
      />
    </div>
  );
}

export default App;
