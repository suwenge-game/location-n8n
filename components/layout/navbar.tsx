"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ROUTES } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "工作流", href: ROUTES.WORKFLOWS },
    { name: "文档", href: ROUTES.DOCS },
    { name: "价格", href: ROUTES.PRICING },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <span className="text-2xl font-bold text-foreground">N8N Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href as Route}
                className="text-lg font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <ThemeToggle />
            <Link href={ROUTES.LOGIN as Route}>
              <Button variant="ghost" size="default">
                登录
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER as Route}>
              <Button size="default">注册</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href as Route}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              <Link
                href={ROUTES.LOGIN as Route}
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full" size="sm">
                  登录
                </Button>
              </Link>
              <Link
                href={ROUTES.REGISTER as Route}
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full" size="sm">
                  注册
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
