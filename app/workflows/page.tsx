import type { Metadata } from "next";

import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import { WorkflowsFilterShell } from "@/components/workflows/workflows-filter-shell";
import { realWorkflows } from "@/lib/real-workflows";

export const metadata: Metadata = {
  title: "开源 N8N 工作流库",
  description:
    "拆解来自真实开源项目的 20 个 N8N 工作流：节点结构、数据流向与导入步骤，全部免费。",
};

export default function WorkflowsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">开源 N8N 工作流库</h1>
          <p className="mt-2 text-muted-foreground">
            拆解来自真实开源项目的 {realWorkflows.length} 个工作流，查看节点结构与数据流向。
          </p>
        </div>
      </header>
      <WorkflowsFilterShell workflows={realWorkflows} />
    </div>
  );
}
