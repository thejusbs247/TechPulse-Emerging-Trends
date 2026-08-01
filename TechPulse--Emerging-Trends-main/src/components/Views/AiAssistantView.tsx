import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ActiveView } from '../../types';

interface AiAssistantViewProps {
  onSelectView?: (view: ActiveView) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Can you summarize the top 3 Agentic AI frameworks for 2024 and their primary architectural advantages?',
      timestamp: '10:42 AM',
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: `Based on TechPulse's analysis of 120,000+ GitHub repositories and 850 indexed research papers, the top 3 Agentic AI frameworks dominating enterprise deployment in 2024 are:

1. **AutoGPT 2.0 & CrewAI**: Leading in role-playing multi-agent orchestration. They allow modular role assignment (e.g., Researcher, Coder, Critic) with built-in consensus loops.
2. **LangChain Agentic Workflows**: High-level graph execution control via LangGraph, enabling deterministic state machines for complex enterprise compliance.
3. **Cognition AI Architecture**: Specialized in autonomous code synthesis with sandboxed execution environments and automated debugging feedback loops.`,
      timestamp: '10:43 AM',
      keyTakeaways: [
        'Multi-Agent Consensus: 45% reduction in hallucination rates compared to single-agent prompts.',
        'Graph Execution: Shift from linear chains to cyclical graph state management.',
        'Sandboxed Feedback: Agents iteratively run tests and self-correct errors prior to output.'
      ],
      entities: ['CrewAI', 'LangGraph', 'AutoGPT 2.0', 'Cognition AI', 'Devin'],
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-[#111c2a]': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from server');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "Here is the technical analysis you requested.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        keyTakeaways: data.keyTakeaways || [
          "High-density intelligence modeling.",
          "Real-time evaluation across indexed research papers."
        ],
        entities: data.entities || ["Agentic AI", "GraphRAG", "TechPulse AI"],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `Based on TechPulse's index, **${query}** represents a high-impact technology domain. Key indicators point toward rapid enterprise adoption and strategic venture backing in 2024-2025.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        keyTakeaways: [
          'High Market Velocity: Increased research citations and GitHub commits.',
          'Cross-domain Integration: Combining deep learning with domain-specific knowledge graphs.'
        ],
        entities: ['Agentic Workflows', 'Enterprise AI', 'TechPulse PulseEngine'],
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
      setAttachedFile(null);
    }
  };

  const suggestedPills = [
    'Analyze top 3 Agentic AI frameworks',
    'Compare Quantum vs Classical optimization speed',
    'Summarize GraphRAG paper key takeaways',
    'Provide startup funding trends in Cleantech',
  ];

  return (
    <div className="pt-20 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto space-y-6">
      {/* Header Bar */}
      <div className="border-b border-[#c2c6d6]/20 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#6b38d4] text-[28px] filled">smart_toy</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111c2a] tracking-tight">Intelligence Assistant</h1>
        </div>
        <p className="text-xs sm:text-sm text-[#424754]">
          Query 4.2M research papers, startup metrics, and technology trajectories with conversational AI.
        </p>
      </div>

      {/* Suggested Query Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[11px] font-bold text-[#424754] font-['JetBrains_Mono',monospace] uppercase whitespace-nowrap">
          SUGGESTED QUERIES:
        </span>
        {suggestedPills.map((pill) => (
          <button
            key={pill}
            onClick={() => handleSendMessage(pill)}
            className="px-3 py-1.5 bg-[#eef4ff] hover:bg-[#0058be] hover:text-white text-[#0058be] rounded-xl text-xs font-semibold whitespace-nowrap transition-all border border-white/60 shadow-sm"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 border border-white/60 min-h-[480px] max-h-[600px] flex flex-col justify-between shadow-xl">
        {/* Messages Stream */}
        <div className="overflow-y-auto space-y-6 pr-2 mb-4 flex-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0058be] to-[#6b38d4] flex items-center justify-center text-white shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[20px] filled">auto_awesome</span>
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#0058be] text-white rounded-tr-none shadow-md shadow-[#0058be]/20'
                    : 'bg-white/80 text-[#111c2a] rounded-tl-none border border-white/80 shadow-md'
                }`}
              >
                {/* Header info */}
                <div className="flex justify-between items-center text-[10px] opacity-70 font-['JetBrains_Mono',monospace] mb-1">
                  <span className="font-bold">{msg.sender === 'user' ? 'YOU' : 'TECHPULSE AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Text */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.text}
                </div>

                {/* Key Takeaways Card */}
                {msg.keyTakeaways && msg.keyTakeaways.length > 0 && (
                  <div className="p-3.5 bg-[#eef4ff] rounded-xl border border-[#0058be]/20 text-xs text-[#111c2a]">
                    <div className="flex items-center gap-1.5 mb-2 text-[#0058be] font-bold text-[11px] font-['JetBrains_Mono',monospace] uppercase">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Key Takeaways</span>
                    </div>
                    <ul className="space-y-1.5 list-disc pl-4 text-[#424754]">
                      {msg.keyTakeaways.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Relevant Entities */}
                {msg.entities && msg.entities.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-[#c2c6d6]/30">
                    <span className="text-[10px] font-bold text-[#727785] font-['JetBrains_Mono',monospace] uppercase">
                      ENTITIES:
                    </span>
                    {msg.entities.map((entity, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold bg-[#d8e2ff] text-[#004395] px-2 py-0.5 rounded-md font-['JetBrains_Mono',monospace]"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-[#111c2a] flex items-center justify-center text-white shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0058be] to-[#6b38d4] flex items-center justify-center text-white shrink-0 shadow-md animate-spin">
                <span className="material-symbols-outlined text-[20px]">sync</span>
              </div>
              <div className="p-4 bg-white/80 rounded-2xl border border-white/80 text-xs text-[#424754] font-['JetBrains_Mono',monospace] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0058be] animate-ping"></span>
                <span>Synthesizing research paper index...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Attached File Preview */}
        {attachedFile && (
          <div className="mb-2 px-3 py-1.5 bg-[#eef4ff] rounded-lg text-xs font-bold text-[#0058be] flex items-center justify-between w-max gap-2 border border-[#0058be]/20">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">attach_file</span>
              {attachedFile}
            </span>
            <button onClick={() => setAttachedFile(null)} className="text-[#ba1a1a] font-bold hover:underline">
              ×
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2 pt-2 border-t border-[#c2c6d6]/20"
        >
          <button
            type="button"
            onClick={() => setAttachedFile('Research_Paper_Draft.pdf')}
            className="p-2.5 text-[#424754] hover:bg-[#eef4ff] hover:text-[#0058be] rounded-xl transition-colors"
            title="Attach Document or PDF"
          >
            <span className="material-symbols-outlined text-[22px]">attach_file</span>
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask TechPulse AI anything about emerging tech, research, or startups..."
            className="w-full bg-[#eef4ff] border-none rounded-2xl px-4 py-3 text-sm text-[#111c2a] focus:ring-2 focus:ring-[#0058be] outline-none font-medium placeholder:text-[#424754]/60"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-[#0058be] text-white rounded-2xl hover:bg-[#2170e4] active:scale-95 disabled:opacity-50 transition-all shadow-md shadow-[#0058be]/20 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px] filled">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
