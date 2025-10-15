import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatDate, formatReadingTime } from "@/lib/formatters";
import { getTopic, templateLibrary, topics } from "@/lib/mock-content";
import { allArticles } from "contentlayer/generated";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) {
    return {
      title: "专题未找到",
    };
  }
  return {
    title: `${topic.title} | 专题详情`,
    description: topic.description,
  };
}

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter((article) => article.topic === topic.slug && article.status !== "draft")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const recommendedTemplates = templateLibrary.slice(0, 2);

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "专题导航", href: "/topics" },
          { label: topic.title, href: `/topics/${topic.slug}` },
        ]}
      />

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>面向对象：{topic.audience}</span>
          <span>·</span>
          <span>最近更新：{topic.updatedAt}</span>
        </div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{topic.title}</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {topic.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          {topic.focusAreas.map((area) => (
            <span key={area} className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
              {area}
            </span>
          ))}
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">专题导读</h2>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 leading-relaxed text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300">
          <p>
            本专题聚焦如何把公众号采集、清洗、治理与分发流程标准化，确保在国内监管要求下稳定上线。
            建议先完成合规备案、域名配置等前置任务，再逐步推进站点架构、内容系统、评论/统计与发布流水线。
          </p>
          <p className="mt-4">
            每一步对应任务清单中的 T6~T24，专题文章会针对关键节点给出实现方案与 DoD
            校验方式，帮助团队同步节奏、规避风险。
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">相关文章</h2>
          <Link
            href="/articles"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {relatedArticles.map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {article.title}
                </h3>
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
                阅读文章 →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">推荐模板</h2>
          <Link
            href="/templates"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            模板库 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recommendedTemplates.map((template) => (
            <article
              key={template.slug}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{template.category}</span>
                  <span>·</span>
                  <span>{template.platform}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {template.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {template.summary}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
                  难度：{template.difficulty}
                </span>
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/templates#${template.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                查看操作指南 →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
