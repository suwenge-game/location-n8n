import Image from "next/image";
import { Star, Download, Heart, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS, LICENSE_LABELS } from "@/lib/constants";
import { formatNumber, formatDate } from "@/lib/utils";
import type { Workflow } from "@/types/workflow";

interface WorkflowInfoProps {
  workflow: Workflow;
}

export function WorkflowInfo({ workflow }: WorkflowInfoProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-3">{workflow.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className={DIFFICULTY_COLORS[workflow.difficulty]}>
                {DIFFICULTY_LABELS[workflow.difficulty]}
              </Badge>
              {workflow.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{workflow.rating}</span>
            <span>评分</span>
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="font-semibold text-foreground">
              {formatNumber(workflow.downloads)}
            </span>
            <span>下载</span>
          </span>
          <span>更新于 {formatDate(workflow.updatedAt)}</span>
          <span>版本 {workflow.version}</span>
        </div>
      </div>

      {/* Author and Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Author Card */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">开发者</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {workflow.author.avatar && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={workflow.author.avatar}
                    alt={workflow.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{workflow.author.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {workflow.author.workflows} 个工作流 · ⭐ {workflow.author.rating}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                主页
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Card */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="mb-4">
              {workflow.isFree ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">免费</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${workflow.price ?? 0}</span>
                  {workflow.originalPrice &&
                    workflow.price &&
                    workflow.originalPrice > workflow.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${workflow.originalPrice}
                      </span>
                    )}
                </div>
              )}
            </div>
            <Button className="w-full" size="lg">
              {workflow.isFree ? "免费获取" : "立即购买"}
            </Button>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>包含完整源文件</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>详细文档说明</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>30天技术支持</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>免费更新</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>功能特性</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2">
            {workflow.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>系统要求</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {workflow.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* License */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">许可证</h3>
              <p className="text-sm text-muted-foreground">{LICENSE_LABELS[workflow.license]}</p>
            </div>
            <Badge variant="outline">{workflow.license}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
