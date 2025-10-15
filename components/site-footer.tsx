import Link from "next/link";

import { CookiePreferencesTrigger } from "@/components/cookie-consent";
import { SECONDARY_NAV } from "@/lib/navigation";
import { siteMetadata } from "@/lib/site-metadata";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white/95 py-8 text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/95 dark:text-neutral-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            {siteMetadata.name}
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed">{siteMetadata.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <CookiePreferencesTrigger className="text-xs font-medium text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white">
          管理 Cookie 偏好
        </CookiePreferencesTrigger>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          © {year} {siteMetadata.shortName}. 保留所有权利。
        </p>
      </div>
    </footer>
  );
}
