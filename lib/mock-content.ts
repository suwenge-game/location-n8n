export type Article = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  status: "published" | "draft";
  tags: string[];
  topic?: string;
  readingTime?: {
    minutes: number;
  };
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  focusAreas: string[];
  updatedAt: string;
};

export type TemplateItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  platform: string;
  difficulty: "入门" | "进阶" | "专家";
  updatedAt: string;
  tags: string[];
  resources?: {
    guideUrl?: string;
    packageUrl?: string;
  };
};

export const mockArticles: Article[] = [
  {
    slug: "content-governance-checklist",
    title: "上线前必须通过的内容治理 Checklist",
    summary: "从隐私合规、错误监控到灰度回滚，确保每次发布都有迹可循。",
    publishedAt: "2025-01-08",
    status: "published",
    tags: ["治理"],
    topic: "workflow-intelligence",
    readingTime: { minutes: 5 },
  },
  {
    slug: "growth-loop-design",
    title: "增长飞轮：从 RSS 到站外矩阵的内容分发策略",
    summary: "结合 RSS、邮件订阅与知乎/公众号分发，建立自动化增长飞轮，持续导入高质量流量。",
    publishedAt: "2024-12-22",
    status: "published",
    tags: ["增长"],
    topic: "wechat-automation",
    readingTime: { minutes: 8 },
  },
  {
    slug: "wechat-article-pipeline",
    title: "微信公众号文章流水线",
    summary: "从采集到发布的完整自动化流程，提高内容生产效率。",
    publishedAt: "2024-12-15",
    status: "published",
    tags: ["自动化"],
    topic: "wechat-automation",
    readingTime: { minutes: 6 },
  },
];

export const topics: Topic[] = [
  {
    slug: "wechat-automation",
    title: "公众号采集与自动化运营",
    description: "从采集、清洗、归档到选题分析的一站式自动化流程，降低编辑团队重复劳动。",
    audience: "内容编辑、运营团队、自动化工程师",
    focusAreas: ["采集链路设计", "内容结构化", "合规风控"],
    updatedAt: "2025-01-18",
  },
  {
    slug: "workflow-intelligence",
    title: "工作流智能辅助与知识库",
    description: "构建自更新的工作流知识库，结合 AI 辅助审核、摘要与发布，缩短生产周期。",
    audience: "团队负责人、知识管理者",
    focusAreas: ["AI 辅助", "知识沉淀", "协同"],
    updatedAt: "2025-01-10",
  },
];

export const templateLibrary: TemplateItem[] = [
  {
    slug: "wechat-crawl-standard",
    title: "公众号文章采集标准流程",
    summary: "Webhook + HTML Extract + 敏感词过滤 + 落库，适合中小团队快速上线。",
    category: "采集",
    platform: "n8n",
    difficulty: "入门",
    updatedAt: "2025-01-11",
    tags: ["Webhook", "HTML Extract", "数据库"],
  },
  {
    slug: "content-curation-ai-review",
    title: "内容精选与 AI 初审流程",
    summary: "集成 LLM 作摘要与关键词、人工复核队列，兼顾效率与风险控制。",
    category: "内容治理",
    platform: "n8n + OpenAI API",
    difficulty: "进阶",
    updatedAt: "2025-01-05",
    tags: ["AI 审核", "人工复核", "队列"],
  },
  {
    slug: "multi-channel-distribution",
    title: "多渠道分发与监测流程",
    summary: "一次发布自动同步到公众号、知乎、掘金，并跟踪回流数据与收录状态。",
    category: "增长",
    platform: "n8n + 飞书",
    difficulty: "专家",
    updatedAt: "2024-12-18",
    tags: ["发布", "监控", "飞书"],
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((item) => item.slug === slug);
}

export function getTemplatesByCategory(category?: string): TemplateItem[] {
  if (!category) return templateLibrary;
  return templateLibrary.filter((item) => item.category === category);
}
