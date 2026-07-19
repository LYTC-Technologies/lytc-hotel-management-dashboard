import { AnalyticsReport } from '../types';

export const mockAnalyticsReport: AnalyticsReport = {
  id: 'report-001',
  generatedAt: new Date().toISOString(),
  
  executiveSummary: {
    overallScore: 87,
    performanceStatus: 'ممتاز',
    aiSummary: 'أداء الفندق والموقع الإلكتروني ومنصات التواصل الاجتماعي يظهر نمواً إيجابياً مع فرص كبيرة للتحسين في التسويق الرقمي وتجربة المستخدم.',
    overallGrowth: 12.5,
    overallRecommendation: 'التركيز على تحسين معدل التحويل وتوسيع الحضور على منصات التواصل الاجتماعي',
    digitalHealthScore: 85,
    businessStatus: 'مستقر ونامٍ',
    marketingStatus: 'جيد مع فرص للتحسين',
    websiteStatus: 'قوي',
    socialMediaStatus: 'متوسط'
  },
  
  overallScores: [
    {
      name: 'التسويق',
      score: 78,
      description: 'أداء التسويق الرقمي',
      color: '#D4AF37',
      trend: 'up',
      trendValue: 8.5
    },
    {
      name: 'الموقع الإلكتروني',
      score: 92,
      description: 'أداء الموقع وتجربة المستخدم',
      color: '#10B981',
      trend: 'up',
      trendValue: 12.3
    },
    {
      name: 'SEO',
      score: 85,
      description: 'تحسين محركات البحث',
      color: '#3B82F6',
      trend: 'stable',
      trendValue: 2.1
    },
    {
      name: 'تفاعل العملاء',
      score: 81,
      description: 'مستوى تفاعل العملاء',
      color: '#8B5CF6',
      trend: 'up',
      trendValue: 15.7
    },
    {
      name: 'النمو',
      score: 88,
      description: 'معدل النمو الشامل',
      color: '#06B6D4',
      trend: 'up',
      trendValue: 12.5
    },
    {
      name: 'الصحة الرقمية',
      score: 85,
      description: 'الحالة العامة للوجود الرقمي',
      color: '#F59E0B',
      trend: 'up',
      trendValue: 5.2
    },
    {
      name: 'التحويل',
      score: 73,
      description: 'معدل التحويل',
      color: '#EF4444',
      trend: 'down',
      trendValue: -3.1
    },
    {
      name: 'رؤية العلامة',
      score: 79,
      description: 'ظهور العلامة التجارية',
      color: '#EC4899',
      trend: 'up',
      trendValue: 9.8
    }
  ],
  
  websiteAnalytics: {
    visitors: 45678,
    sessions: 89234,
    uniqueVisitors: 38956,
    pageViews: 234567,
    bounceRate: 42.5,
    averageSessionDuration: 245,
    pagesPerSession: 2.63,
    conversionRate: 3.2,
    trafficSources: [
      { source: 'محركات البحث', visitors: 18271, percentage: 40 },
      { source: 'المباشر', visitors: 11419, percentage: 25 },
      { source: 'التواصل الاجتماعي', visitors: 9135, percentage: 20 },
      { source: 'الإحالات', visitors: 6853, percentage: 15 }
    ],
    topLandingPage: '/rooms',
    topExitPage: '/contact',
    returningVisitors: 18271,
    newVisitors: 27407,
    deviceTypes: [
      { device: 'موبايل', visitors: 27407, percentage: 60 },
      { device: 'ديسكتوب', visitors: 15987, percentage: 35 },
      { device: 'تابلت', visitors: 2284, percentage: 5 }
    ],
    browserStatistics: [
      { browser: 'Chrome', visitors: 27407, percentage: 60 },
      { browser: 'Safari', visitors: 11419, percentage: 25 },
      { browser: 'Firefox', visitors: 4568, percentage: 10 },
      { browser: 'Edge', visitors: 2284, percentage: 5 }
    ],
    countryDistribution: [
      { country: 'السعودية', visitors: 20556, percentage: 45 },
      { country: 'الإمارات', visitors: 9135, percentage: 20 },
      { country: 'الكويت', visitors: 6853, percentage: 15 },
      { country: 'قطر', visitors: 4568, percentage: 10 },
      { country: 'البحرين', visitors: 4566, percentage: 10 }
    ],
    trafficTrend: [12000, 15000, 18000, 16500, 19000, 22000, 21000, 24000, 23000, 25000, 27000, 29000],
    growthPercentage: 18.5
  },
  
  facebookAnalytics: {
    followers: 45678,
    newFollowers: 1234,
    reach: 234567,
    impressions: 567890,
    engagement: 8.5,
    postReach: 45678,
    topPost: 'عرض خاص للجناح الملكي',
    profileVisits: 12345,
    linkClicks: 5678,
    shares: 2345,
    comments: 1234,
    likes: 8901,
    bestPostingTime: '8:00 م',
    audienceGrowth: [40000, 41000, 42000, 41500, 43000, 44000, 45000, 45500, 46000, 46500, 47000, 45678],
    performanceTrend: [7.2, 7.5, 7.8, 8.0, 8.2, 8.5, 8.3, 8.6, 8.4, 8.7, 8.5, 8.5]
  },
  
  instagramAnalytics: {
    followers: 34567,
    reach: 189234,
    reelsViews: 567890,
    storiesReach: 123456,
    profileVisits: 9876,
    websiteClicks: 4567,
    engagement: 9.2,
    topReel: 'جولة في الجناح البنتهاوس',
    topStory: 'عرض خاص على الإفطار',
    followerGrowth: [30000, 31000, 32000, 31500, 33000, 33500, 34000, 34200, 34500, 34800, 35000, 34567],
    audienceDemographics: [
      { ageGroup: '18-24', percentage: 15 },
      { ageGroup: '25-34', percentage: 35 },
      { ageGroup: '35-44', percentage: 30 },
      { ageGroup: '45-54', percentage: 15 },
      { ageGroup: '55+', percentage: 5 }
    ],
    mostActiveTime: '7:00 م',
    topHashtags: ['#فندق_فاخر', '#ليتك', '#السعودية', '#إقامة_مميزة', '#جناح_ملكي']
  },
  
  snapchatAnalytics: {
    subscribers: 12345,
    storyViews: 89012,
    watchTime: 45678,
    completionRate: 72,
    swipeUps: 3456,
    topStory: 'تجربة الإقامة الفاخرة',
    engagement: 6.8,
    audienceGrowth: [10000, 10500, 11000, 10800, 11500, 11800, 12000, 12100, 12200, 12300, 12400, 12345],
    mostViewedStory: 'جولة في المرافق',
    averageWatchTime: 18
  },
  
  aiInsights: {
    executiveSummary: 'الفندق يظهر أداءً قوياً في معظم المؤشرات مع فرص واضحة للتحسين في التسويق الرقمي وتجربة المستخدم على الموقع الإلكتروني.',
    strengths: [
      {
        category: 'الأداء العام',
        title: 'نمو قوي في الزوار',
        description: 'زيادة 18.5% في عدد زوار الموقع خلال الشهر الماضي',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 92
      },
      {
        category: 'التواصل الاجتماعي',
        title: 'تفاعل ممتاز على Instagram',
        description: 'معدل تفاعل 9.2% يفوق المتوسط الصناعي',
        priority: 'high',
        expectedImpact: 'متوسط',
        confidenceScore: 88
      },
      {
        category: 'الموقع الإلكتروني',
        title: 'تجربة مستخدم جيدة',
        description: 'معدل ارتداد منخفض 42.5% ومتوسط جلسة طويل',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 85
      }
    ],
    weaknesses: [
      {
        category: 'التحويل',
        title: 'معدل تحويل منخفض',
        description: 'معدل التحويل 3.2% أقل من المتوسط الصناعي',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 90
      },
      {
        category: 'التسويق',
        title: 'حضور ضعيف على Snapchat',
        description: 'عدد المشتركين منخفض مقارنة بالمنصات الأخرى',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 78
      }
    ],
    growthOpportunities: [
      {
        category: 'التسويق',
        title: 'توسيع الحملات الإعلانية',
        description: 'الاستثمار في إعلانات Instagram و Facebook لزيادة الوصول',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 85
      },
      {
        category: 'المحتوى',
        title: 'إنشاء محتوى فيديو',
        description: 'إنتاج محتوى فيديو عالي الجودة للمنصات الاجتماعية',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 82
      }
    ],
    marketingRecommendations: [
      {
        category: 'التسويق',
        title: 'تحسين استهداف الإعلانات',
        description: 'استخدام البيانات الديموغرافية لاستهداف دقيق',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 88
      },
      {
        category: 'التسويق',
        title: 'زيادة النشاط على Snapchat',
        description: 'إنشاء محتوى خاص بـ Snapchat لزيادة المشتركين',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 75
      }
    ],
    seoRecommendations: [
      {
        category: 'SEO',
        title: 'تحسين الكلمات المفتاحية',
        description: 'تحسين المحتوى للكلمات المفتاحية ذات الصلة بالفنادق الفاخرة',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 90
      },
      {
        category: 'SEO',
        title: 'تحسين سرعة الموقع',
        description: 'تحسين أداء الموقع لتحسين الترتيب في محركات البحث',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 85
      }
    ],
    websiteRecommendations: [
      {
        category: 'الموقع',
        title: 'تحسين صفحة الحجز',
        description: 'تبسيط عملية الحجز لزيادة معدل التحويل',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 92
      },
      {
        category: 'الموقع',
        title: 'إضافة معرض صور تفاعلي',
        description: 'تحسين عرض الصور لزيادة التفاعل',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 80
      }
    ],
    socialMediaRecommendations: [
      {
        category: 'التواصل الاجتماعي',
        title: 'زيادة تردد النشر',
        description: 'النشر بشكل منتظم للحفاظ على التفاعل',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 87
      },
      {
        category: 'التواصل الاجتماعي',
        title: 'استخدام الهاشتاقات الفعالة',
        description: 'استخدام هاشتاقات ذات صلة لزيادة الوصول',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 82
      }
    ],
    revenueOpportunities: [
      {
        category: 'الإيرادات',
        title: 'عروض موسمية',
        description: 'إنشاء عروض خاصة للمواسم',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 85
      },
      {
        category: 'الإيرادات',
        title: 'باقات إقامة',
        description: 'إنشاء باقات إقامة جذابة',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 80
      }
    ],
    customerExperienceSuggestions: [
      {
        category: 'تجربة العملاء',
        title: 'تحسين خدمة العملاء',
        description: 'توفير دعم على مدار الساعة',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 90
      },
      {
        category: 'تجربة العملاء',
        title: 'تخصيص التجربة',
        description: 'تخصيص العروض بناءً على تفضيلات العملاء',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 78
      }
    ],
    operationalSuggestions: [
      {
        category: 'العمليات',
        title: 'تحسين الحجز عبر الموقع',
        description: 'تبسيط عملية الحجز وتقليل الخطوات',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 88
      },
      {
        category: 'العمليات',
        title: 'أتمتة الردود',
        description: 'استخدام روبوتات الدردشة للرد السريع',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 75
      }
    ],
    riskAnalysis: [
      {
        category: 'المخاطر',
        title: 'منافسة قوية',
        description: 'زيادة المنافسة في السوق',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 85
      },
      {
        category: 'المخاطر',
        title: 'تغيرات السوق',
        description: 'تغيرات في سلوك المستهلك',
        priority: 'medium',
        expectedImpact: 'متوسط',
        confidenceScore: 70
      }
    ],
    priorityRecommendations: [
      {
        category: 'الأولويات',
        title: 'تحسين صفحة الحجز',
        description: 'التركيز على تحسين صفحة الحجز لزيادة التحويل',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 95
      },
      {
        category: 'الأولويات',
        title: 'زيادة النشاط على Instagram',
        description: 'الاستثمار في محتوى Instagram لزيادة التفاعل',
        priority: 'high',
        expectedImpact: 'عالي',
        confidenceScore: 90
      }
    ]
  },
  
  swotAnalysis: {
    strengths: [
      'موقع استراتيجي ممتاز',
      'خدمة عملاء عالية الجودة',
      'مرافق فاخرة وحديثة',
      'سمعة قوية في السوق',
      'فريق عمل محترف'
    ],
    weaknesses: [
      'معدل تحويل منخفض',
      'حضور ضعيف على بعض المنصات',
      'تكلفة تسويق عالية',
      'تحديات في الحجز عبر الموقع'
    ],
    opportunities: [
      'نمو السياحة في المنطقة',
      'زيادة الطلب على الفنادق الفاخرة',
      'فرص للتوسع',
      'شراكات استراتيجية',
      'تطوير التكنولوجيا'
    ],
    threats: [
      'منافسة متزايدة',
      'تغيرات اقتصادية',
      'تقلبات في السياحة',
      'تغيرات في التشريعات'
    ]
  },
  
  monthlyActionPlan: {
    week1: [
      {
        task: 'تحسين صفحة الحجز',
        expectedResults: 'زيادة معدل التحويل بنسبة 15%',
        priority: 'high',
        estimatedImpact: 'عالي',
        completionProgress: 0
      },
      {
        task: 'إنشاء محتوى فيديو لـ Instagram',
        expectedResults: 'زيادة التفاعل بنسبة 20%',
        priority: 'high',
        estimatedImpact: 'عالي',
        completionProgress: 0
      }
    ],
    week2: [
      {
        task: 'تحسين استهداف الإعلانات',
        expectedResults: 'زيادة الوصول بنسبة 25%',
        priority: 'high',
        estimatedImpact: 'عالي',
        completionProgress: 0
      },
      {
        task: 'تحسين الكلمات المفتاحية',
        expectedResults: 'تحسين الترتيب في محركات البحث',
        priority: 'medium',
        estimatedImpact: 'متوسط',
        completionProgress: 0
      }
    ],
    week3: [
      {
        task: 'إنشاء عروض موسمية',
        expectedResults: 'زيادة الحجوزات بنسبة 10%',
        priority: 'medium',
        estimatedImpact: 'متوسط',
        completionProgress: 0
      },
      {
        task: 'تحسين خدمة العملاء',
        expectedResults: 'تحسين رضا العملاء',
        priority: 'high',
        estimatedImpact: 'عالي',
        completionProgress: 0
      }
    ],
    week4: [
      {
        task: 'تقييم الأداء',
        expectedResults: 'تحديد فرص التحسين',
        priority: 'medium',
        estimatedImpact: 'متوسط',
        completionProgress: 0
      },
      {
        task: 'تخطيط الشهر القادم',
        expectedResults: 'تحسين الاستراتيجية',
        priority: 'medium',
        estimatedImpact: 'متوسط',
        completionProgress: 0
      }
    ]
  },
  
  performanceTimeline: {
    previousReports: [
      { date: '2026-06-01', score: 82, status: 'مكتمل' },
      { date: '2026-05-01', score: 79, status: 'مكتمل' },
      { date: '2026-04-01', score: 76, status: 'مكتمل' },
      { date: '2026-03-01', score: 74, status: 'مكتمل' }
    ],
    growthHistory: [74, 76, 79, 82, 87],
    performanceChanges: [
      { date: '2026-06-01', metric: 'الزوار', change: 15, description: 'زيادة في الزوار' },
      { date: '2026-05-01', metric: 'التفاعل', change: 12, description: 'تحسين التفاعل' },
      { date: '2026-04-01', metric: 'التحويل', change: -3, description: 'انخفاض في التحويل' }
    ],
    marketingProgress: [65, 70, 75, 78],
    websiteProgress: [80, 85, 88, 92],
    socialMediaProgress: [70, 73, 76, 81]
  },
  
  reportHistory: [
    {
      id: 'report-001',
      reportName: 'التقرير الشهري - يوليو 2026',
      generatedDate: '2026-07-01',
      generatedBy: 'مدير النظام',
      reportType: 'شهري',
      overallScore: 87,
      status: 'completed'
    },
    {
      id: 'report-002',
      reportName: 'التقرير الشهري - يونيو 2026',
      generatedDate: '2026-06-01',
      generatedBy: 'مدير النظام',
      reportType: 'شهري',
      overallScore: 82,
      status: 'completed'
    },
    {
      id: 'report-003',
      reportName: 'التقرير الشهري - مايو 2026',
      generatedDate: '2026-05-01',
      generatedBy: 'مدير النظام',
      reportType: 'شهري',
      overallScore: 79,
      status: 'completed'
    }
  ]
};
