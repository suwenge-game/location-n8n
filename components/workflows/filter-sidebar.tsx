"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface WorkflowCategoryFilter {
  id: string;
  label: string;
  count: number;
}

interface FilterSidebarProps {
  categories: WorkflowCategoryFilter[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onReset?: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategory = "",
  onCategoryChange,
  onReset,
}: FilterSidebarProps) {
  const total = categories.reduce((sum, category) => sum + category.count, 0);
  const rowClass = (active: boolean) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-primary/10 font-medium text-primary" : "text-foreground hover:bg-muted"}`;

  return (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">按分类筛选</h2>
        {selectedCategory && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs">
            重置
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <button onClick={() => onCategoryChange?.("")} className={rowClass(!selectedCategory)}>
          <span>全部分类</span>
          <Badge variant="secondary">{total}</Badge>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange?.(category.id)}
            className={rowClass(selectedCategory === category.id)}
          >
            <span>{category.label}</span>
            <Badge variant="secondary">{category.count}</Badge>
          </button>
        ))}
      </div>
    </aside>
  );
}
