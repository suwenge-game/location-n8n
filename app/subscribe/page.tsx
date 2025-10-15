import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "订阅更新",
  description: "订阅最新文章、模板与上线检查清单，支持邮件与企业微信通知。",
};

export default function SubscribePage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "订阅更新", href: "/subscribe" },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">订阅更新</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          订阅功能将在 T12 中落地，包含
          RSS、邮件双重确认与企业微信推送。当前页面预留提交入口，并说明上线前准备事项。
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">邮件订阅（预留）</h2>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              邮箱地址
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              disabled
              className="mt-2 w-full rounded-md border border-dashed border-neutral-300 bg-neutral-100 px-3 py-2 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              关注主题（可选）
            </label>
            <textarea
              placeholder="例如：公众号采集、内容安全、站点性能"
              disabled
              className="mt-2 w-full rounded-md border border-dashed border-neutral-300 bg-neutral-100 px-3 py-2 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              rows={3}
            />
          </div>
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
          >
            即将开放
          </button>
        </form>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          完整订阅流程将接入 Double Opt-in、退订链接与事件埋点，确保符合国内邮件营销规范。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">WeCom 企业微信群</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          企业微信订阅将提供任务清单更新提醒、模板上新与实战分享。请在订阅功能上线后扫码加入。
        </p>
      </section>
    </div>
  );
}
