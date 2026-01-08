import type { Workflow } from "@/types/workflow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import { ROUTES } from "@/lib/constants";

interface FeaturedSectionProps {
  workflows: Workflow[];
  title?: string;
  description?: string;
}

export function FeaturedSection({
  workflows,
  title = "精选工作流",
  description = "最受欢迎的工作流模板",
}: FeaturedSectionProps) {
  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Link
          href={ROUTES.WORKFLOWS}
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <WorkflowGrid workflows={workflows} />
      <div className="mt-8 text-center sm:hidden">
        <Link href={ROUTES.WORKFLOWS}>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            查看全部工作流
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </section>
  );
}
