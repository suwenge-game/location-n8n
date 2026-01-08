"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import type { Workflow } from "@/types/workflow";

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link href={ROUTES.WORKFLOW_DETAIL(workflow.slug)} className="group">
      <Card className="h-full overflow-hidden border-2 border-border transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={workflow.thumbnail}
            alt={workflow.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {workflow.isFree && (
            <Badge variant="success" className="absolute top-3 right-3 shadow-sm">
              免费
            </Badge>
          )}
          {!workflow.isFree &&
            workflow.originalPrice &&
            workflow.originalPrice > workflow.price && (
              <Badge variant="default" className="absolute top-3 right-3 shadow-sm bg-red-500">
                促销
              </Badge>
            )}
        </div>

        {/* Content */}
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {workflow.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{workflow.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {workflow.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {workflow.rating}
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {formatNumber(workflow.downloads)}
              </span>
            </div>
            <span className="font-semibold text-primary">
              {workflow.isFree ? "免费" : `$${workflow.price}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
