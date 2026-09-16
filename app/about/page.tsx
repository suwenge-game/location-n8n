import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "关于 N8N Hub",
  description:
    "了解 N8N Hub 如何通过可复现教程、经过验证的工作流模板和工程化排错方法，帮助团队把 AI Agent 与自动化真正用于业务。",
  alternates: { canonical: "/about" },
};

const directions = [
  [
    "AI Agent 实战",
    "从聊天模型、系统提示词到工具调用与状态管理，解释 Agent 怎样读取上下文、选择工具，并在权限边界内完成任务。",
  ],
  [
    "RAG 知识库",
    "覆盖文档接入、清洗切分、向量写入、检索重排与答案引用，尤其关注数据更新、权限隔离和无法回答时的处理。",
  ],
  [
    "内容生产流水线",
    "把选题、资料整理、初稿、事实核对、人工审核和多平台分发串成可审计流程，让 AI 提效而不绕过编辑责任。",
  ],
  [
    "调试与可靠性",
    "记录超时、限流、格式漂移、重复执行、提示词注入和成本失控等常见失败模式，提供定位顺序与恢复策略。",
  ],
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "关于我们", href: "/about" },
        ]}
      />
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
          让 AI 自动化落地变得可复制
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {siteMetadata.name} 是一个面向实践者的中文 N8N
          知识站。我们关心的不是演示里“点一下就完成”的魔法，而是一个自动化流程进入真实业务后，如何正确接收数据、调用模型、约束输出、处理失败、保护凭证，并让团队中的其他人也能维护。我们的使命，是把零散的
          AI
          能力拆成清晰、可验证、可复用的工作流，让开发者、运营人员和小团队都能从一个可运行的起点出发，而不是反复从空白画布开始。
        </p>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          这里的“可复制”包含三个层次：节点参数可以照着配置，关键决策可以理解，异常路径可以提前演练。我们会说明输入和输出的数据结构、凭证应放在哪里、提示词为什么这样写，以及成功与失败分别如何验收。读完一篇教程，你应当能够搭出自己的版本，并知道业务变化时应该修改哪一段。
        </p>
      </header>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          我们持续研究的内容
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {directions.map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          如何使用 26 个工作流模板
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          模板库目前按业务目标整理了 26
          个工作流。它们是学习结构和加速实施的起点，不是导入后无需检查的黑盒。使用时先阅读模板详情，确认触发方式、依赖服务、所需凭证和输入字段；复制或导入后，把凭证替换为自己的连接，并用脱敏样本逐节点执行；随后检查正常路径、空数据、接口失败和重复触发四类情况；最后再开启定时器或生产
          Webhook。涉及发送消息、写数据库和发布内容的节点，建议在首次运行时关闭或改接测试目标，避免测试数据影响真实用户。
        </p>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          每个团队的字段、权限和合规要求不同，因此模板中的阈值、提示词和映射关系都应经过本地验证。凭证应使用
          N8N 的凭证管理能力，不要直接写进 Code 节点或工作流
          JSON；处理个人信息时，只传递完成任务所需的最少字段，并为执行记录设置合适的保留策略。模板更新时，我们优先解释变更原因和迁移影响，帮助你判断是否需要同步，而不是诱导无条件升级。
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">编辑与发布原则</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          我们坚持“实际跑通才发布”。教程中的主链路会使用可控样本执行，节点之间的字段引用会核对，代码或
          JSON
          片段会保持足够完整，使读者能看懂它在流程中的位置。我们不会虚构产品版本、价格、性能数字或不存在的功能；界面名称可能随产品更新变化时，会描述能力与配置目的，避免把容易过期的截图当作唯一答案。
        </p>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          同时，我们明确自动化的边界：外部模型可能生成错误信息，第三方接口可能限流，任何会对客户、资金、权限或公开内容产生影响的动作，都应设置校验、审批或人工兜底。文章会尽量给出失败模式、日志观察点、幂等策略和验收清单。若某项配置依赖具体账户权限，我们会说明前提，不把未经验证的假设写成结论。
        </p>
      </section>
      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">订阅与联系</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          如果你希望收到新教程、模板更新和排错清单，可以前往订阅页面留下联系方式。订阅只用于发送
          N8N、AI Agent
          和工作流工程相关内容，你可以随时停止接收。若你在复现文章时遇到字段映射、节点错误或边界场景，也欢迎带上脱敏后的输入样本、执行日志和预期结果联系我们；具体证据通常比一句“流程不工作”更容易定位问题。对于文章中的事实错误、失效配置或更安全的实现方式，也欢迎反馈，我们会复核后修订并保留必要的变更说明。
        </p>
        <Link
          href="/subscribe"
          className="inline-flex text-sm font-medium text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
        >
          前往订阅页面 →
        </Link>
      </section>
    </div>
  );
}
