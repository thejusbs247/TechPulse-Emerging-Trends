export type ActiveView = 
  | 'global-trends' 
  | 'dashboard' 
  | 'analytics' 
  | 'news-feed' 
  | 'ai-assistant' 
  | 'predictions';

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  subtext?: string;
  isPositive?: boolean;
  type?: 'growth' | 'today' | 'progress' | 'icon' | 'badge';
  progressValue?: number;
  iconName?: string;
}

export interface KpiCard {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  badgeText: string;
  badgeType: 'growth' | 'new' | 'weekly' | 'realtime' | 'warning';
  icon: string;
  iconBg: string;
  iconColor: string;
  changeText?: string;
  progressPercentage?: number;
  avatars?: string[];
  bars?: number[];
}

export interface InnovationCluster {
  id: string;
  name: string;
  location: string;
  status: 'LEADER' | 'RISING' | 'GROWING' | 'EMERGING';
  statusColor: string;
  nodeCount: number;
  details: string;
  lat: number; // For map positioning
  lng: number;
  topStartups: string[];
}

export interface TrendPrediction {
  id: string;
  title: string;
  description: string;
  status: 'GROWING' | 'STABLE' | 'RISING' | 'EMERGING' | 'DECLINING';
  confidence: string;
  impactScore: number;
  icon: string;
  bgClass: string;
  textClass: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  institution: string;
  date: string;
  abstract: string;
  downloads: number;
  category: string;
  pdfUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  categoryColor: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  imageUrl: string;
  imageAlt: string;
  aiSummary: string;
  readTime: string;
  isBookmarked?: boolean;
  content?: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  keyTakeaways?: string[];
  entities?: string[];
  isThinking?: boolean;
}
