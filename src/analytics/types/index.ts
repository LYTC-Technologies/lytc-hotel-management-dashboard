// Platform Connection Status
export type PlatformStatus = 'connected' | 'not_connected' | 'error';

export interface PlatformConnection {
  name: string;
  logo: string;
  status: PlatformStatus;
  lastSync: string;
  apiHealth: string;
  lastSuccessfulUpdate: string;
}

// Executive Summary
export interface ExecutiveSummary {
  overallScore: number;
  performanceStatus: string;
  aiSummary: string;
  overallGrowth: number;
  overallRecommendation: string;
  digitalHealthScore: number;
  businessStatus: string;
  marketingStatus: string;
  websiteStatus: string;
  socialMediaStatus: string;
}

// Overall Scores
export interface ScoreCard {
  name: string;
  score: number;
  description: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

// Website Analytics
export interface WebsiteAnalytics {
  visitors: number;
  sessions: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  conversionRate: number;
  trafficSources: TrafficSource[];
  topLandingPage: string;
  topExitPage: string;
  returningVisitors: number;
  newVisitors: number;
  deviceTypes: DeviceType[];
  browserStatistics: BrowserStat[];
  countryDistribution: CountryStat[];
  trafficTrend: number[];
  growthPercentage: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

export interface DeviceType {
  device: string;
  visitors: number;
  percentage: number;
}

export interface BrowserStat {
  browser: string;
  visitors: number;
  percentage: number;
}

export interface CountryStat {
  country: string;
  visitors: number;
  percentage: number;
}

// Facebook Analytics
export interface FacebookAnalytics {
  followers: number;
  newFollowers: number;
  reach: number;
  impressions: number;
  engagement: number;
  postReach: number;
  topPost: string;
  profileVisits: number;
  linkClicks: number;
  shares: number;
  comments: number;
  likes: number;
  bestPostingTime: string;
  audienceGrowth: number[];
  performanceTrend: number[];
}

// Instagram Analytics
export interface InstagramAnalytics {
  followers: number;
  reach: number;
  reelsViews: number;
  storiesReach: number;
  profileVisits: number;
  websiteClicks: number;
  engagement: number;
  topReel: string;
  topStory: string;
  followerGrowth: number[];
  audienceDemographics: DemographicData[];
  mostActiveTime: string;
  topHashtags: string[];
}

export interface DemographicData {
  ageGroup: string;
  percentage: number;
}

// Snapchat Analytics
export interface SnapchatAnalytics {
  subscribers: number;
  storyViews: number;
  watchTime: number;
  completionRate: number;
  swipeUps: number;
  topStory: string;
  engagement: number;
  audienceGrowth: number[];
  mostViewedStory: string;
  averageWatchTime: number;
}

// AI Insights
export interface AIInsight {
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  expectedImpact: string;
  confidenceScore: number;
}

export interface AIInsights {
  executiveSummary: string;
  strengths: AIInsight[];
  weaknesses: AIInsight[];
  growthOpportunities: AIInsight[];
  marketingRecommendations: AIInsight[];
  seoRecommendations: AIInsight[];
  websiteRecommendations: AIInsight[];
  socialMediaRecommendations: AIInsight[];
  revenueOpportunities: AIInsight[];
  customerExperienceSuggestions: AIInsight[];
  operationalSuggestions: AIInsight[];
  riskAnalysis: AIInsight[];
  priorityRecommendations: AIInsight[];
}

// SWOT Analysis
export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// Monthly Action Plan
export interface WeeklyTask {
  task: string;
  expectedResults: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: string;
  completionProgress: number;
}

export interface MonthlyActionPlan {
  week1: WeeklyTask[];
  week2: WeeklyTask[];
  week3: WeeklyTask[];
  week4: WeeklyTask[];
}

// Performance Timeline
export interface PerformanceTimeline {
  previousReports: ReportEntry[];
  growthHistory: number[];
  performanceChanges: PerformanceChange[];
  marketingProgress: number[];
  websiteProgress: number[];
  socialMediaProgress: number[];
}

export interface ReportEntry {
  date: string;
  score: number;
  status: string;
}

export interface PerformanceChange {
  date: string;
  metric: string;
  change: number;
  description: string;
}

// Report History
export interface ReportHistory {
  id: string;
  reportName: string;
  generatedDate: string;
  generatedBy: string;
  reportType: string;
  overallScore: number;
  status: 'completed' | 'failed' | 'in_progress';
}

// Main Analytics Report
export interface AnalyticsReport {
  id: string;
  generatedAt: string;
  executiveSummary: ExecutiveSummary;
  overallScores: ScoreCard[];
  websiteAnalytics: WebsiteAnalytics;
  facebookAnalytics: FacebookAnalytics;
  instagramAnalytics: InstagramAnalytics;
  snapchatAnalytics: SnapchatAnalytics;
  aiInsights: AIInsights;
  swotAnalysis: SWOTAnalysis;
  monthlyActionPlan: MonthlyActionPlan;
  performanceTimeline: PerformanceTimeline;
  reportHistory: ReportHistory[];
}

// Report Generation Workflow Steps
export interface WorkflowStep {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  duration?: number;
}

// Notification Types
export interface AnalyticsNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

// Chart Data Types
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}
