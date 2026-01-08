"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants";
import { useState } from "react";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`${ROUTES.WORKFLOWS}?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(ROUTES.WORKFLOWS);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-border bg-card px-6 py-16 shadow-sm sm:px-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          N8N工作流市场
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          发现最佳
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {" "}
            N8N自动化工作流
          </span>
        </h1>

        {/* Description */}
        <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
          立即购买、下载并部署，节省10倍开发时间。经过专业验证的工作流模板，
          助力企业快速实现自动化。
        </p>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索工作流..."
              className="h-12 pl-12 pr-32 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
            >
              搜索
            </Button>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {["数据同步", "自动化", "邮件营销", "CRM集成"].map((category) => (
            <Link
              key={category}
              href={`${ROUTES.WORKFLOWS}?category=${category}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/10"
            >
              {category}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={ROUTES.WORKFLOWS}>
            <Button size="lg" className="min-w-[160px]">
              浏览工作流
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={"/docs" as Route}>
            <Button size="lg" variant="outline" className="min-w-[160px]">
              查看文档
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
