import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookiePreferencesTrigger } from "@/components/cookie-consent";

export const metadata: Metadata = {
  title: "Cookie 使用说明",
  description: "了解我们在站点中使用的 Cookie 类型与用途，并管理您的偏好设置。",
};

const COOKIE_CATEGORIES = [
  {
    title: "必要 Cookie",
    description:
      "这类 Cookie 用于维持站点的基础运行能力，例如记住隐私设置、保持订阅流程的状态等，不涉及额外的跟踪。",
    status: "始终启用",
  },
  {
    title: "分析 Cookie",
    description:
      "在您授权后，我们会采集匿名的浏览行为，帮助了解文章与模板的访问表现，以便持续优化内容质量。",
    status: "可选",
  },
  {
    title: "营销 Cookie",
    description:
      "用于衡量订阅邮件与活动通知的效果，确保我们推送的内容与您的兴趣相关。若未授权，我们不会发送个性化通知。",
    status: "可选",
  },
];

export default function CookiesPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "Cookie 使用说明", href: "/cookies" },
        ]}
      />

      <header className="space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Cookie 使用说明</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          本页将详细说明站点使用的 Cookie
          类型、收集目的与数据保留周期。您可在此了解我们如何保障数据安全，亦可随时调整授权。
        </p>
        <CookiePreferencesTrigger className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500">
          打开偏好设置
        </CookiePreferencesTrigger>
      </header>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Cookie 分类与用途
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COOKIE_CATEGORIES.map((category) => (
            <article
              key={category.title}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-neutral-200 bg-white/80 p-6 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {category.description}
                </p>
              </div>
              <span className="self-start rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {category.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">数据保留与安全</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          授权记录会保留 12
          个月，之后我们会再次征求您的同意。所有数据均存储于大陆地区的云厂商，并使用最小权限访问控制。对于统计与订阅分析，我们仅以聚合形式查看趋势，不会定位到个人行为。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">撤回授权</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          您可以通过页面底部的“管理 Cookie 偏好”入口或上方按钮，随时重新打开偏好设置。对非必要
          Cookie 的拒绝不会影响站点核心功能。若您还希望删除历史记录，可发送邮件至
          hi@autoflow.example.com，我们会在 3 个工作日内响应。
        </p>
      </section>
    </div>
  );
}
