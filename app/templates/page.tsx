import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { templateLibrary } from "@/lib/mock-content";

const categories = Array.from(new Set(templateLibrary.map((item) => item.category)));

export const metadata: Metadata = {
  title: "模板库",
  description: "可直接复用的自动化流程模板，覆盖采集、治理、增长与监控。",
};

export default function TemplatesPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "模板库", href: "/templates" },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">模板库</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          模板将以 JSON 配置 + 指引文档的形式提供，后续将结合 T8
          的筛选功能支持按照平台、难度、场景进行组合过滤。
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">模板分类</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templateLibrary.map((template) => (
          <article
            id={template.slug}
            key={template.slug}
            className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{template.category}</span>
                <span>·</span>
                <span>{template.platform}</span>
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {template.title}
              </h2>
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
            <p className="mt-6 text-xs text-neutral-400">
              最近更新：{template.updatedAt} · 即将开放“一键复制到项目”能力。
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
