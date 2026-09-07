"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import { FilterSidebar } from "@/components/workflows/filter-sidebar";
import { realWorkflows } from "@/lib/real-workflows";

const categories = Array.from(
  realWorkflows
    .reduce((map, workflow) => {
      const current = map.get(workflow.category);
      map.set(workflow.category, {
        id: workflow.category,
        label: workflow.categoryLabel,
        count: (current?.count ?? 0) + 1,
      });
      return map;
    }, new Map<string, { id: string; label: string; count: number }>())
    .values(),
);

function WorkflowsPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCategory(searchParams.get("category") ?? "");
    setQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return realWorkflows.filter((workflow) => {
      const matchesCategory = !category || workflow.category === category;
      const matchesQuery =
        !needle ||
        [
          workflow.title,
          workflow.description,
          workflow.categoryLabel,
          ...workflow.nodes.map((node) => node.name),
        ].some((value) => value.toLowerCase().includes(needle));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const sidebar = (
    <FilterSidebar
      categories={categories}
      selectedCategory={category}
      onCategoryChange={(value) => {
        setCategory(value);
        setShowFilters(false);
      }}
      onReset={() => setCategory("")}
    />
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">开源 N8N 工作流库</h1>
            <p className="mt-2 text-muted-foreground">
              拆解来自真实开源项目的 {realWorkflows.length} 个工作流，查看节点结构与数据流向。
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索名称、分类或节点…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-10"
          />
        </div>
      </header>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-28">{sidebar}</div>
        </aside>
        {showFilters && (
          <div className="rounded-xl border-2 border-border bg-card p-6 lg:hidden">{sidebar}</div>
        )}
        <main className="min-w-0 flex-1 space-y-5">
          <p className="text-sm text-muted-foreground">当前显示 {filtered.length} 个工作流</p>
          {filtered.length ? (
            <WorkflowGrid workflows={filtered} />
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border py-16 text-center">
              <p className="mb-4 text-muted-foreground">没有找到匹配的工作流</p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("");
                }}
              >
                清除筛选
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function WorkflowsPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">正在加载开源工作流…</p>}>
      <WorkflowsPageContent />
    </Suspense>
  );
}
