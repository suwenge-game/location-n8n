import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { WorkflowPreview } from "@/components/workflow-detail/workflow-preview";
import { WorkflowInfo } from "@/components/workflow-detail/workflow-info";
import { RelatedWorkflows } from "@/components/workflow-detail/related-workflows";
import { getWorkflowBySlug, getRelatedWorkflows } from "@/lib/mock-workflows";
import { ROUTES } from "@/lib/constants";

interface WorkflowPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: WorkflowPageProps) {
  const workflow = getWorkflowBySlug(params.slug);

  if (!workflow) {
    return {
      title: "工作流未找到",
    };
  }

  return {
    title: `${workflow.title} | N8N Hub`,
    description: workflow.description,
  };
}

export default function WorkflowPage({ params }: WorkflowPageProps) {
  const workflow = getWorkflowBySlug(params.slug);

  if (!workflow) {
    notFound();
  }

  const relatedWorkflows = getRelatedWorkflows(workflow.id);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={ROUTES.HOME} className="hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={ROUTES.WORKFLOWS} className="hover:text-foreground transition-colors">
          工作流
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{workflow.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          <WorkflowPreview
            thumbnail={workflow.thumbnail}
            title={workflow.title}
            videoUrl={workflow.videoUrl}
          />

          {/* Long Description */}
          {workflow.longDescription && (
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">{workflow.longDescription}</p>
            </div>
          )}

          {/* Installation Guide */}
          <div className="rounded-xl border-2 border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">快速开始</h2>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  1
                </span>
                <span className="text-sm text-muted-foreground">下载工作流文件</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  2
                </span>
                <span className="text-sm text-muted-foreground">在N8N中导入工作流</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  3
                </span>
                <span className="text-sm text-muted-foreground">配置必要的凭据</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  4
                </span>
                <span className="text-sm text-muted-foreground">激活工作流开始使用</span>
              </li>
            </ol>
            {workflow.videoUrl && (
              <div className="mt-4">
                <button className="text-sm font-medium text-primary hover:underline">
                  观看视频教程 →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <WorkflowInfo workflow={workflow} />
          </div>
        </aside>
      </div>

      {/* Related Workflows */}
      <RelatedWorkflows workflows={relatedWorkflows} />
    </div>
  );
}
