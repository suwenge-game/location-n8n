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
          本政策说明我们如何收集、使用、存储与保护您的个人信息，并帮助您了解可以行使的权利。若政策更新，我们会通过站内公告或邮件订阅及时告知。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">收集的信息</h2>
        <div className="space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>我们仅在必要范围内收集以下信息：</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>订阅或报名时提交的邮箱、姓名与所属机构，用于发送模板更新和运营沟通；</li>
            <li>在您授权分析 Cookie 后匿名采集的浏览与互动数据，用于改进内容质量；</li>
            <li>技术日志（如 IP、浏览器类型），用于保障站点安全与排查故障。</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">数据使用与存储</h2>
        <div className="space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>
            所有个人信息存储于位于中国大陆的云服务商数据中心，并通过访问控制、日志审计与定期备份保障安全。除法律法规要求或征得您的明确同意，我们不会向第三方提供个人信息。
          </p>
          <p>
            统计数据仅以聚合形式分析，不与单个用户建立关联。Cookie 授权记录最长保留 12 个月，届满后会重新征求您的同意。
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">用户权益</h2>
        <div className="space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>您拥有以下权利：</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>撤回同意：可通过页面底部的“管理 Cookie 偏好”入口调整非必要 Cookie 设置，邮件订阅亦可随时退订；</li>
            <li>访问与更正：可向我们索取个人信息副本，并对不准确内容提出更正申请；</li>
            <li>删除与限制：如需删除账户信息或限制处理活动，请通过下方联系方式告知，我们将在 3 个工作日内反馈。</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">联系方式</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          如对隐私政策或数据处理有任何疑问，可发送邮件至 hi@autoflow.example.com，我们会尽快回应并跟进处理进度。
        </p>
      </section>
    </div>
  );
}
