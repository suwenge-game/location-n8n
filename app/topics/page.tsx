import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { topics } from "@/lib/mock-content";

export const metadata: Metadata = {
  title: "专题导航",
  description: "按问题域梳理的专题，覆盖采集、治理、分发与运营自动化。",
};

export default function TopicsPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "专题导航", href: "/topics" },
        ]}
      />
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">专题导航</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          从工程、合规到运营，沉淀项目实战中的关键步骤。每个专题都给出执行节奏、指标 DoD
          与相关模板，帮助团队快速对齐目标。
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {topics.map((topic) => (
          <article
            key={topic.slug}
            className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>面向对象：{topic.audience}</span>
                <span>更新于 {topic.updatedAt}</span>
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                {topic.title}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {topic.description}
              </p>
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
              查看专题详情 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
