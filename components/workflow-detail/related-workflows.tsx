import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import type { Workflow } from "@/types/workflow";

interface RelatedWorkflowsProps {
  workflows: Workflow[];
}

export function RelatedWorkflows({ workflows }: RelatedWorkflowsProps) {
  if (workflows.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">相关推荐</h2>
      <WorkflowGrid workflows={workflows} />
    </section>
  );
}
