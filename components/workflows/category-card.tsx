"use client";

import Link from "next/link";
import type { Route } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/workflow";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const href = `/workflows?category=${category.slug}` as Route;

  return (
    <Link href={href}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-2 hover:border-primary cursor-pointer border-2">
        <CardContent className="p-6">
          <div
            className="text-4xl mb-4 flex items-center justify-center w-16 h-16 rounded-xl"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <span className="text-3xl">{category.icon}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
          <Badge variant="secondary">{category.count}个工作流</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
