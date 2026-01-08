"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import { FilterSidebar } from "@/components/workflows/filter-sidebar";
import { Pagination } from "@/components/workflows/pagination";
import { workflows, categories } from "@/lib/mock-workflows";
import { SORT_OPTIONS } from "@/lib/constants";

export default function WorkflowsPage() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "rating" | "downloads">("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9; // 每页显示 9 个工作流

  // Initialize state from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");

    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
    if (price) setSelectedPrice(price);
    if (sort && ["latest", "popular", "rating", "downloads"].includes(sort)) {
      setSortBy(sort as "latest" | "popular" | "rating" | "downloads");
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Filter and sort workflows
  const filteredWorkflows = useMemo(() => {
    let filtered = [...workflows];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query) ||
          w.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Category filter
    if (selectedCategory) {
      const category = categories.find((c) => c.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter((w) => w.category === category.id);
      }
    }

    // Price filter
    if (selectedPrice === "free") {
      filtered = filtered.filter((w) => w.isFree);
    } else if (selectedPrice === "paid") {
      filtered = filtered.filter((w) => !w.isFree);
    }

    // Difficulty filter
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter((w) => selectedDifficulty.includes(w.difficulty));
    }

    // Platform filter
    if (selectedPlatform.length > 0) {
      filtered = filtered.filter((w) =>
        w.platform.some((p) => selectedPlatform.includes(p.toLowerCase())),
      );
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "downloads":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "latest":
      default:
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPrice, selectedDifficulty, selectedPlatform, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
  const paginatedWorkflows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredWorkflows.slice(startIndex, endIndex);
  }, [filteredWorkflows, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedPrice, selectedDifficulty, selectedPlatform, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedPrice("all");
    setSelectedDifficulty([]);
    setSelectedPlatform([]);
    setCurrentPage(1);
  };

  const getCategoryName = () => {
    if (!selectedCategory) return "全部工作流";
    const category = categories.find((c) => c.slug === selectedCategory);
    return category ? `${category.name}工作流` : "全部工作流";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{getCategoryName()}</h1>
            <p className="text-muted-foreground">找到 {filteredWorkflows.length} 个工作流</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="sm:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索工作流..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "latest" | "popular" | "rating" | "downloads")
            }
            className="h-10 rounded-lg border-2 border-border bg-background px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters and Grid */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-28">
            <FilterSidebar
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              selectedDifficulty={selectedDifficulty}
              selectedPlatform={selectedPlatform}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setSelectedPrice}
              onDifficultyChange={setSelectedDifficulty}
              onPlatformChange={setSelectedPlatform}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden rounded-xl border-2 border-border bg-card p-6">
            <FilterSidebar
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              selectedDifficulty={selectedDifficulty}
              selectedPlatform={selectedPlatform}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
                setShowFilters(false);
              }}
              onPriceChange={(price) => {
                setSelectedPrice(price);
                setShowFilters(false);
              }}
              onDifficultyChange={setSelectedDifficulty}
              onPlatformChange={setSelectedPlatform}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Workflow Grid */}
        <div className="flex-1 space-y-8">
          {isLoading ? (
            <WorkflowGrid workflows={[]} loading={true} />
          ) : filteredWorkflows.length > 0 ? (
            <>
              <WorkflowGrid workflows={paginatedWorkflows} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">没有找到符合条件的工作流</p>
              <Button variant="outline" onClick={handleReset}>
                清除筛选条件
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
