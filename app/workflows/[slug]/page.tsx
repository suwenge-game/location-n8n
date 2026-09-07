import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, ExternalLink, GitBranch, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { realWorkflows, type RealWorkflow } from "@/lib/real-workflows";
import { ROUTES, SITE_NAME, SITE_URL } from "@/lib/constants";

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

const nodePurpose: Record<string, string> = {
  telegramTrigger: "监听 Telegram 消息触发流程",
  if: "条件分支",
  slack: "发送 Slack 消息",
  webhook: "接收外部 HTTP 请求",
  cron: "定时触发",
  set: "字段整理",
  merge: "合并多路数据",
  function: "自定义代码处理",
  splitInBatches: "分批处理",
  noOp: "空操作占位",
  emailSend: "发送邮件",
  githubTrigger: "监听 GitHub 事件",
  googleSheets: "读写 Google 表格",
  typeformTrigger: "接收 Typeform 表单提交",
  respondToWebhook: "返回 Webhook 响应",
  xml: "XML 转换",
  telegram: "发送 Telegram 消息",
  manualTrigger: "手动触发流程",
  rssFeedRead: "读取 RSS 订阅源",
  mongoDb: "查询或写入 MongoDB 数据",
  httpRequest: "调用外部 HTTP 接口",
  openWeatherMap: "获取天气数据",
  mattermost: "发送 Mattermost 消息",
  mondayCom: "读写 Monday.com 数据",
  freshdesk: "创建或处理 Freshdesk 工单",
  airtable: "读写 Airtable 数据",
  bannerbear: "使用 Bannerbear 生成视觉内容",
  trello: "创建或更新 Trello 卡片",
  mautic: "读写 Mautic 营销数据",
  switch: "按不同值进行多路分支",
  discord: "发送 Discord 消息",
  graphql: "调用 GraphQL 接口",
  stripeTrigger: "监听 Stripe 支付事件",
};

function explainWorkflow(workflow: RealWorkflow) {
  const triggerNodes = workflow.nodes.filter(
    (node) =>
      node.type.toLowerCase().includes("trigger") ||
      ["webhook", "cron", "manualTrigger"].includes(node.type),
  );
  const actionNodes = workflow.nodes.filter((node) => !triggerNodes.includes(node));
  const start = triggerNodes.length
    ? triggerNodes.map((node) => node.name).join("、")
    : workflow.nodes[0]?.name;
  const actions = actionNodes
    .slice(0, 4)
    .map((node) => `${node.name}（${nodePurpose[node.type] ?? "执行对应服务操作"}）`)
    .join("、");
  return `该流程由 ${start || "上游节点"} 发起，共包含 ${workflow.nodeCount} 个节点。数据进入后依照 ${workflow.flows.length || 1} 条连接关系流转，主要通过${actions || "当前触发节点"}完成自动化任务。你可以结合下方节点表和数据流向，快速判断需要配置哪些服务与凭证。`;
}

export function generateStaticParams() {
  return realWorkflows.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = realWorkflows.find((item) => item.slug === slug);
  if (!workflow) return { title: "工作流未找到" };
  return {
    title: `${workflow.title} 拆解 | ${SITE_NAME}`,
    description: workflow.description,
    alternates: { canonical: `${SITE_URL}/workflows/${slug}` },
  };
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = realWorkflows.find((item) => item.slug === slug);
  if (!workflow) notFound();

  return (
    <article className="mx-auto max-w-5xl space-y-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href={ROUTES.HOME} aria-label="首页">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={ROUTES.WORKFLOWS} className="hover:text-foreground">
          工作流库
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="max-w-md truncate text-foreground">{workflow.title}</span>
      </nav>

      <header className="rounded-2xl border-2 border-border bg-card p-6 sm:p-9">
        <div className="mb-5 flex flex-wrap gap-3">
          <Badge>{workflow.categoryLabel}</Badge>
          <Badge variant="outline">
            <GitBranch className="mr-1 h-3.5 w-3.5" />
            {workflow.nodeCount} 个节点
          </Badge>
          <Badge variant="outline">开源工作流</Badge>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{workflow.title}</h1>
        <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{workflow.description}</p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold">这个工作流做什么</h2>
        <p className="leading-8 text-muted-foreground">{explainWorkflow(workflow)}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">节点结构</h2>
        <div className="overflow-x-auto rounded-xl border-2 border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/70">
              <tr>
                <th className="px-4 py-3 font-semibold">名称</th>
                <th className="px-4 py-3 font-semibold">类型</th>
                <th className="px-4 py-3 font-semibold">作用说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workflow.nodes.map((node, index) => (
                <tr key={`${node.name}-${index}`}>
                  <td className="px-4 py-3 font-medium">{node.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{node.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {nodePurpose[node.type] ?? "执行对应服务操作"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">数据流向</h2>
        {workflow.flows.length ? (
          <ol className="grid gap-3 sm:grid-cols-2">
            {workflow.flows.map((flow, index) => (
              <li
                key={`${flow}-${index}`}
                className="rounded-lg border border-border bg-card px-4 py-3"
              >
                <span className="mr-3 text-xs font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {flow}
              </li>
            ))}
          </ol>
        ) : (
          <p className="rounded-lg border border-border bg-card px-4 py-3 text-muted-foreground">
            该模板只有一个触发节点，没有后续连接；可将它作为新自动化流程的起点。
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">如何使用</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            "从下方源文件链接下载工作流 JSON",
            "在自己的 N8N 实例中导入 JSON",
            "替换凭证、目标频道及环境相关参数",
          ].map((step, index) => (
            <li key={step} className="rounded-xl border-2 border-border bg-card p-5">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {index + 1}
              </span>
              <p className="leading-6">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border-2 border-border bg-card p-6">
        <h2 className="mb-4 text-2xl font-bold">来源</h2>
        <p className="mb-5 text-muted-foreground">
          由 {workflow.author.name} 收录，来自 GitHub 开源模板库 {workflow.source.repo}（
          {workflow.source.stars}★）。
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={`https://github.com/${workflow.source.repo}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            查看开源仓库 <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={workflow.source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            查看并下载源文件 <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </article>
  );
}
