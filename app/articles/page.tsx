import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatDate, formatReadingTime } from "@/lib/formatters";
import { topics } from "@/lib/mock-content";
import { allArticles } from "contentlayer/generated";

const topicMap = new Map(topics.map((topic) => [topic.slug, topic.title]));

const publishedArticles = allArticles
  .filter((article) => article.status !== "draft")
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const metadata: Metadata = {
  title: "文章中心",
  description: "沉淀自动化项目中的最佳实践、风险提示与标准化清单。",
};

export default function ArticlesPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "文章中心", href: "/articles" },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">文章中心</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          每篇文章都对应任务清单中的关键节点，提供可落地的实现建议、验收标准以及常见踩坑。
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publishedArticles.map((article) => (
          <article
            key={article.slug}
            className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400">
                <span>{topicMap.get(article.topic) ?? "未分类"}</span>
                <span>·</span>
                <span>{article.tags.join(" / ")}</span>
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {article.title}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {article.summary}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <span>{formatDate(article.publishedAt)}</span>
              <span>·</span>
              <span>{formatReadingTime(article.readingTime?.minutes)}</span>
            </div>
            <Link
              href={`/articles/${article.slug}`}
              className="mt-6 inline-flex items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              阅读全文 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
