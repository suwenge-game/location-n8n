"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MAIN_NAV, SECONDARY_NAV } from "@/lib/navigation";
import { siteMetadata } from "@/lib/site-metadata";

const baseLinkStyles =
  "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-neutral-900/5 dark:hover:bg-neutral-50/10";

const activeLinkStyles = "text-neutral-900 dark:text-white bg-neutral-900/10 dark:bg-neutral-50/10";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-neutral-900 dark:text-white">
            {siteMetadata.shortName}
          </span>
          <span className="hidden text-xs text-neutral-500 dark:text-neutral-400 sm:inline">
            {siteMetadata.description}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="主导航">
          {MAIN_NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${baseLinkStyles} ${
                  isActive ? activeLinkStyles : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex" aria-label="辅助导航">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="site-mobile-nav"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span>{mobileOpen ? "关闭菜单" : "菜单"}</span>
          <span aria-hidden="true" className="text-lg leading-none">
            ☰
          </span>
        </button>
      </div>

      <div
        id="site-mobile-nav"
        className={`border-t border-neutral-200 bg-white/95 px-4 py-3 transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="移动主导航">
          {MAIN_NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${baseLinkStyles} ${
                  isActive ? activeLinkStyles : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="移动辅助导航">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-sm text-neutral-500 transition-colors hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-50/10 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
