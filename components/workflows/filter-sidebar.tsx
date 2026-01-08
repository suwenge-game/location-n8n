"use client";

import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mock-workflows";
import { DIFFICULTY_FILTERS, PRICE_RANGES, PLATFORMS } from "@/lib/constants";

interface FilterSidebarProps {
  selectedCategory?: string;
  selectedPrice?: string;
  selectedDifficulty?: string[];
  selectedPlatform?: string[];
  onCategoryChange?: (category: string) => void;
  onPriceChange?: (price: string) => void;
  onDifficultyChange?: (difficulty: string[]) => void;
  onPlatformChange?: (platform: string[]) => void;
  onReset?: () => void;
}

export function FilterSidebar({
  selectedCategory,
  selectedPrice = "all",
  selectedDifficulty = [],
  selectedPlatform = [],
  onCategoryChange,
  onPriceChange,
  onDifficultyChange,
  onPlatformChange,
  onReset,
}: FilterSidebarProps) {
  const toggleDifficulty = (value: string) => {
    const newDifficulty = selectedDifficulty.includes(value)
      ? selectedDifficulty.filter((d) => d !== value)
      : [...selectedDifficulty, value];
    onDifficultyChange?.(newDifficulty);
  };

  const togglePlatform = (value: string) => {
    const newPlatform = selectedPlatform.includes(value)
      ? selectedPlatform.filter((p) => p !== value)
      : [...selectedPlatform, value];
    onPlatformChange?.(newPlatform);
  };

  return (
    <aside className="w-full space-y-8">
      {/* Reset Button */}
      {(selectedCategory ||
        selectedPrice !== "all" ||
        selectedDifficulty.length > 0 ||
        selectedPlatform.length > 0) && (
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-sm font-medium">已选筛选</span>
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs">
            重置全部
          </Button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-foreground">分类</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange?.(category.slug)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedCategory === category.slug
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-foreground">价格</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((option) => (
            <button
              key={option.value}
              onClick={() => onPriceChange?.(option.value)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedPrice === option.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <span>{option.label}</span>
              {selectedPrice === option.value && <CheckIcon className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-foreground">难度</h3>
        <div className="space-y-2">
          {DIFFICULTY_FILTERS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleDifficulty(option.value)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedDifficulty.includes(option.value)
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <span>{option.label}</span>
              {selectedDifficulty.includes(option.value) && <CheckIcon className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-foreground">平台</h3>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.value}
              onClick={() => togglePlatform(platform.value)}
              className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm transition-colors ${
                selectedPlatform.includes(platform.value)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 text-foreground"
              }`}
            >
              <span>{platform.icon}</span>
              {platform.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
