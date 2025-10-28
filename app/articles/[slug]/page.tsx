import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
// import { MdxContent } from "@/components/mdx/mdx-content";
// import { TableOfContents } from "@/components/mdx/table-of-contents";
import { formatDate, formatReadingTime } from "@/lib/formatters";
import { getTopic, topics } from "@/lib/mock-content";
// import { allArticles } from "contentlayer/generated";

// 简单的Markdown内容组件
function SimpleMdxContent({ code }: { code: string }) {
  return (
    <div
      className="prose prose-neutral max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{
        __html: code.replace(/\n/g, "<br/>").replace(/## /g, "<h2>").replace(/\n/g, "</h2>"),
      }}
    />
  );
}

// 临时使用模拟数据
const allArticles = [
  {
    slug: "content-governance-checklist",
    title: "内容治理检查清单",
    summary: "确保内容质量和合规性的完整检查清单",
    topic: "wechat-automation",
    publishedAt: "2024-01-15",
    tags: ["内容治理", "合规"],
    status: "published",
    url: "/articles/content-governance-checklist",
    toc: [],
    readingTime: { minutes: 5 },
    body: { code: "## 内容治理检查清单\n\n这里是文章内容..." },
  },
  {
    slug: "growth-loop-design",
    title: "增长循环设计",
    summary: "设计可持续的增长循环机制",
    topic: "workflow-intelligence",
    publishedAt: "2024-01-10",
    tags: ["增长", "循环"],
    status: "published",
    url: "/articles/growth-loop-design",
    toc: [],
    readingTime: { minutes: 8 },
    body: { code: "## 增长循环设计\n\n这里是文章内容..." },
  },
  {
    slug: "wechat-article-pipeline",
    title: "微信公众号文章流水线",
    summary: "自动化微信公众号文章处理流程",
    topic: "wechat-automation",
    publishedAt: "2024-01-05",
    tags: ["微信", "自动化"],
    status: "published",
    url: "/articles/wechat-article-pipeline",
    toc: [],
    readingTime: { minutes: 6 },
    body: { code: "## 微信公众号文章流水线\n\n这里是文章内容..." },
  },
];

const topicMap = new Map(topics.map((topic) => [topic.slug, topic]));

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = allArticles.find((item) => item.slug === slug);
  if (!article) {
    return { title: "文章未找到" };
  }

  const topicTitle = getTopic(article.topic)?.title ?? "文章中心";

  return {
    title: article.title,
    description: article.summary,
    other: {
      "article:published_time": article.publishedAt,
    },
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.summary,
    },
    alternates: {
      canonical: article.url,
    },
    category: topicTitle,
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = allArticles.find((item) => item.slug === slug);
  if (!article) {
    notFound();
  }

  const topic = topicMap.get(article.topic);
  // const toc = (article.toc ?? []) as Array<{ depth: number; value: string; slug: string }>;

  return (
    <article className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "文章中心", href: "/articles" },
          {
            label: topic?.title ?? "专题",
            href: topic ? `/topics/${topic.slug}` : "/topics",
          },
          { label: article.title, href: article.url },
        ]}
      />

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-neutral-400">
          <span>{topic?.title ?? "文章中心"}</span>
          <span>·</span>
          <span>{article.tags.join(" / ")}</span>
        </div>
        <h1 className="text-3xl font-semibold leading-snug text-neutral-900 dark:text-white">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>发布时间：{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <span>阅读时间：{formatReadingTime(article.readingTime?.minutes)}</span>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {article.summary}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <SimpleMdxContent code={article.body.code} />
        </div>
        <aside className="lg:sticky lg:top-32">{/* <TableOfContents items={toc} /> */}</aside>
      </div>
    </article>
  );
}
