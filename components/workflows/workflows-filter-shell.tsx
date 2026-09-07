"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import type { RealWorkflow } from "@/lib/real-workflows";

interface WorkflowsFilterShellProps {
  workflows: RealWorkflow[];
}

export function WorkflowsFilterShell({ workflows }: WorkflowsFilterShellProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const counts: Record<string, { label: string; count: number }> = {};
    workflows.forEach((workflow) => {
      counts[workflow.category] ??= { label: workflow.categoryLabel, count: 0 };
      counts[workflow.category].count += 1;
    });
    return Object.entries(counts).map(([id, { label, count }]) => ({
      id,
      label,
      count,
    }));
  }, [workflows]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return workflows.filter((workflow) => {
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
  }, [category, query, workflows]);

  const sidebar = (
    <FilterSidebarInner
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
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="space-y-4 lg:contents">
        <div className="flex items-start justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索名称、分类或节点…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10"
            />
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
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-28">{sidebar}</div>
        </aside>
        {showFilters && (
          <div className="rounded-xl border-2 border-border bg-card p-6 lg:hidden">{sidebar}</div>
        )}
        <main className="min-w-0 flex-1 space-y-5">
          <p className="text-sm text-muted-foreground">
            当前显示 {filtered.length} 个工作流
          </p>
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

function FilterSidebarInner({
  categories,
  selectedCategory,
  onCategoryChange,
  onReset,
}: {
  categories: { id: string; label: string; count: number }[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-2">
      <p className="mb-3 text-sm font-medium">按分类筛选</p>
      <button
        onClick={() => onCategoryChange("")}
        className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
          !selectedCategory
            ? "bg-primary/10 font-medium text-primary"
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        全部（{categories.reduce((sum, c) => sum + c.count, 0)}）
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onCategoryChange(c.id)}
          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
            selectedCategory === c.id
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          {c.label}（{c.count}）
        </button>
      ))}
      {selectedCategory && (
        <button
          onClick={onReset}
          className="mt-2 text-xs text-muted-foreground underline"
        >
          清除筛选
        </button>
      )}
    </div>
  );
}

