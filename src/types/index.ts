export interface ScenarioStep {
  id: string;
  tool: string;
  action: string;
}

export interface Scenario {
  id: string;
  name: string;
  category: string;
  steps: ScenarioStep[];
}

export interface GmbProfile {
  id: string;
  email: string;
  location: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  siret: string;
  autoReply: boolean;
  rating: string | number;
  totalReviews: string | number;
  pendingReviews: string | number;
  status: string;
  connectionStatus: string;
}

export interface Client {
  id: string;
  name: string;
  businessType: string;
  location: string;
  joinedDate: string;
  monthlyReviews: number;
  activeCampaigns: number;
  automationActive: boolean;
  avatarUrl: string;
}

export interface GmbReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  reply?: string | null;
}

export interface GbpRule {
  minRating: number;
  notifySlack: boolean;
  sensitiveKeywords: string[];
}

export interface BrandVoice {
  tone: string;
  emojiUsage: string;
  tabooWords: string[];
  signature: string;
}

export interface McpServer {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  url?: string;
}
