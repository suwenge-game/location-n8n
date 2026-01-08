import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = useMemo(() => {
    const pages: number[] = [];
    const showPages = 5; // 显示的页码数量

    if (totalPages <= showPages) {
      // 如果总页数少于要显示的数量，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);

      if (currentPage <= 3) {
        // 当前页在前面
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // 省略号
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后面
        pages.push(-1); // 省略号
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(-1); // 省略号
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(-1); // 省略号
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* 上一页 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        上一页
      </Button>

      {/* 页码 */}
      <div className="flex gap-1">
        {pages.map((page, index) => {
          if (page === -1) {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-1 text-muted-foreground">
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* 下一页 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="gap-1"
      >
        下一页
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
