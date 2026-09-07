"use client";

import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { RealWorkflow } from "@/lib/real-workflows";

export function WorkflowCard({ workflow }: { workflow: RealWorkflow }) {
  return (
    <Link href={`/workflows/${workflow.slug}` as Route} className="group">
      <Card className="h-full border-2 border-border transition-all duration-300 hover:border-primary hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="secondary">{workflow.categoryLabel}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              {workflow.nodeCount} 个节点
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold leading-snug group-hover:text-primary">
            {workflow.title}
          </h3>
          <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {workflow.description}
          </p>
          <span className="flex items-center gap-2 text-sm font-medium text-primary">
            查看工作流拆解 <ArrowRight className="h-4 w-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
