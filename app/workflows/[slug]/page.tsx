import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Home, Code2 } from "lucide-react";
import { WorkflowPreview } from "@/components/workflow-detail/workflow-preview";
import { WorkflowInfo } from "@/components/workflow-detail/workflow-info";
import { RelatedWorkflows } from "@/components/workflow-detail/related-workflows";
import { WorkflowJsonPreview } from "@/components/workflow-detail/workflow-json-preview";
import { ProductJsonLd, BreadcrumbListJsonLd } from "@/components/seo/json-ld";
import { getWorkflowBySlug, getRelatedWorkflows, workflows } from "@/lib/mock-workflows";
import { ROUTES, SITE_NAME, SITE_URL } from "@/lib/constants";

interface WorkflowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    return {
      title: "工作流未找到",
    };
  }

  const url = `${SITE_URL}/workflows/${workflow.slug}`;

  return {
    title: `${workflow.title} | ${SITE_NAME}`,
    description: workflow.description,
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url,
      title: workflow.title,
      description: workflow.description,
      siteName: SITE_NAME,
      images: [
        {
          url: workflow.thumbnail,
          width: 1200,
          height: 630,
          alt: workflow.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: workflow.title,
      description: workflow.description,
      images: [workflow.thumbnail],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  const relatedWorkflows = getRelatedWorkflows(workflow.id);
  const breadcrumbItems = [
    { name: "首页", url: SITE_URL },
    { name: "工作流", url: `${SITE_URL}/workflows` },
    { name: workflow.title, url: `${SITE_URL}/workflows/${workflow.slug}` },
  ];

  return (
    <>
      <ProductJsonLd workflow={workflow} url={SITE_URL} />
      <BreadcrumbListJsonLd items={breadcrumbItems} />

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
              <div className="prose prose-slate max-w-none dark:prose-invert">
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

            {/* Workflow JSON Preview */}
            {workflow.sampleJson && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  工作流JSON
                </h2>
                <WorkflowJsonPreview
                  workflowJson={workflow.sampleJson}
                  filename={`${workflow.slug}.json`}
                />
              </div>
            )}
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
    </>
  );
}
