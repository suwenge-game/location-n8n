import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "项目概览",
  description: "说明 AutoFlow 项目的定位、交付内容与沟通渠道。",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "项目概览", href: "/about" },
        ]}
      />
      <header className="space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">项目概览</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {siteMetadata.name}{" "}
          面向内容运营与自动化应用场景，聚焦输出可复用的工作流模板、工程规范与合规指引，
          将复杂的落地工作拆解为可执行的任务清单。
        </p>
      </header>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">交付内容</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <li>站点建设全流程的任务拆分与 DoD 定义。</li>
          <li>符合国内监管要求的备案、隐私、数据治理建议。</li>
          <li>自动化模板与选题库，支持持续的内容生产与分发。</li>
          <li>性能、安全、监控基线配置，保障交付稳定性。</li>
        </ul>
      </section>
      <section className="space-y-2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">沟通渠道</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          项目以开源文档与模板发布为主，并可按需提供定制化实施支持。可通过订阅页面留下联系方式，或发送邮件至
          hi@autoflow.example.com。
        </p>
      </section>
    </div>
  );
}
