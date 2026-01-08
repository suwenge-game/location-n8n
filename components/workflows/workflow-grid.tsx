import { WorkflowCard } from "./workflow-card";
import type { Workflow } from "@/types/workflow";

interface WorkflowGridProps {
  workflows: Workflow[];
}

export function WorkflowGrid({ workflows }: WorkflowGridProps) {
  if (workflows.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">暂无工作流</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
