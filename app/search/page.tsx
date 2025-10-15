import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "站内搜索",
  description: "查找文章、模板与专题。后续将集成基于 Contentlayer 的静态索引与客户端过滤。",
};

export default function SearchPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "站内搜索", href: "/search" },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">站内搜索</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          搜索能力将在 T6 与 T7 完成路由与 Markdown
          内容系统后接入。当前页面用于展示信息架构占位，并说明即将上线的功能范围。
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">路线图</h2>
        <ol className="list-decimal space-y-2 pl-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <li>构建时生成文章/模板的静态索引 JSON，提供标题、标签与摘要。</li>
          <li>前端实现模糊匹配与过滤（类型、专题、难度等），并兼容移动端。</li>
          <li>结合 T11 的事件埋点记录搜索词与无结果反馈，为选题策略提供数据参考。</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">当前状态</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          目前可通过浏览专题、文章与模板页获取内容。亦可在订阅页面留下需求或关键词，以便后续优先补充相关资料。
        </p>
      </section>
    </div>
  );
}
