import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "说明站点收集与使用数据的范围、目的与保护措施。",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "隐私政策", href: "/privacy" },
        ]}
      />
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">隐私政策</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          隐私政策将在 T9
          任务中进一步完善并补充法律顾问审阅后的正式文本。当前为站点初版的最低信息披露。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">收集的信息</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          站点仅在必要时收集用户的邮箱、姓名与组织名称，用于邮件订阅、模板更新通知及运营沟通。站内行为数据通过自建事件埋点进行匿名采集，主要用于优化产品体验。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">数据使用与存储</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          所有个人信息存储于国内云厂商的数据中心，并采用最小权限访问策略。未经用户授权，站点不会将数据提供给第三方，除非法律法规要求。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">用户权益</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          用户可随时通过订阅管理入口撤回同意、请求删除个人信息或导出数据。相关流程将在 T9 阶段接入
          Cookie Banner 与偏好设置面板时同步上线。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">联系方式</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          如对隐私政策有任何疑问，可发送邮件至 hi@autoflow.example.com，或在评论系统中提交反馈。
        </p>
      </section>
    </div>
  );
}
