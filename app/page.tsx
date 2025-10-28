import Link from "next/link";
import type { Metadata } from "next";

import { templateLibrary, topics, mockArticles } from "@/lib/mock-content";
import { formatDate, formatReadingTime } from "@/lib/formatters";
import { siteMetadata } from "@/lib/site-metadata";

const HERO_POINTS = [
  "公众号采集、内容治理、站外分发的一站式流水线",
  "覆盖合规、安全、监控的交付基线，贴合国内监管要求",
  "以模板 + 选题库支撑的持续产出体系，快速复制增长经验",
];

export const metadata: Metadata = {
  title: "首页",
  description: siteMetadata.description,
};

const PUBLISHED_ARTICLES = mockArticles
  .filter((article) => article.status !== "draft")
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export default function HomePage() {
  const featuredTopics = topics.slice(0, 2);
  const featuredArticles = PUBLISHED_ARTICLES.slice(0, 3);
  const featuredTemplates = templateLibrary.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-neutral-200 bg-white px-6 py-12 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80 sm:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white dark:bg-white dark:text-neutral-950">
              AutoFlow Automation Lab
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              搭建面向内容运营的自动化增长系统
            </h1>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
              该框架将采集、治理、分发与监控串联为可复用的工作流模板，并结合合规、性能、安全的发布基线，帮助团队在国内环境中稳定扩展自动化能力。
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white">架构原则</h2>
            <ul className="mt-4 space-y-2">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1 text-neutral-400">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/topics"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900/30 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:bg-white/30 dark:text-white dark:hover:bg-white/40"
          >
            查看专题导航
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white"
          >
            浏览模板库
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">核心专题</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              梳理合规、工程与运营视角的关键问题域。
            </p>
          </div>
          <Link
            href="/topics"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            所有专题 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredTopics.map((topic) => (
            <article
              key={topic.slug}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {topic.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {topic.description}
                </p>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  <span>面向对象：{topic.audience}</span>
                  <span className="mx-2">·</span>
                  <span>更新于 {topic.updatedAt}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                {topic.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <Link
                href={`/topics/${topic.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                深入了解 →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">最新文章</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              记录工程实践、合规策略与增长玩法。
            </p>
          </div>
          <Link
            href="/articles"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            全部文章 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  {article.tags[0]}
                </p>
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

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">模板精选</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              直接落地的自动化流程，配套词库与文档说明。
            </p>
          </div>
          <Link
            href="/templates"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredTemplates.map((template) => (
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
                查看详情 →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
