"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { TemplateItem } from "@/lib/mock-content";
import {
  DEFAULT_TEMPLATE_FILTERS,
  TemplateFilterOptions,
  TemplateFilters,
  applyTemplateFilters,
  areTemplateFiltersEqual,
  hasActiveTemplateFilters,
  parseTemplateFiltersFromSearchParams,
  serializeTemplateFilters,
} from "@/lib/template-filters";

type TemplateLibraryBrowserProps = {
  templates: TemplateItem[];
  filterOptions: TemplateFilterOptions;
  initialFilters: TemplateFilters;
};

type FilterKey = Exclude<keyof TemplateFilters, "query">;

const FILTER_SECTION_LABEL: Record<FilterKey, string> = {
  categories: "分类",
  platforms: "平台",
  difficulties: "难度",
  tags: "标签",
};

export function TemplateLibraryBrowser({
  templates,
  filterOptions,
  initialFilters,
}: TemplateLibraryBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<TemplateFilters>(initialFilters);
  const [copyState, setCopyState] = useState<string | null>(null);

  useEffect(() => {
    const nextFilters = parseTemplateFiltersFromSearchParams(searchParams);
    setFilters((current) =>
      areTemplateFiltersEqual(current, nextFilters) ? current : nextFilters,
    );
  }, [searchParams]);

  const applyFiltersToUrl = useCallback(
    (nextFilters: TemplateFilters) => {
      const params = serializeTemplateFilters(nextFilters);
      const query = params.toString();
      const target = query ? `${pathname}?${query}` : pathname;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace(target as any, { scroll: false });
    },
    [pathname, router],
  );

  const syncFilters = useCallback(
    (compute: (current: TemplateFilters) => TemplateFilters) => {
      setFilters((current) => {
        const next = compute(current);
        if (areTemplateFiltersEqual(current, next)) {
          return current;
        }
        applyFiltersToUrl(next);
        return next;
      });
    },
    [applyFiltersToUrl],
  );

  const filteredTemplates = useMemo(
    () => applyTemplateFilters(templates, filters),
    [templates, filters],
  );

  const ensureOptionOrder = useCallback(
    (values: string[], key: FilterKey) => {
      const sourceOptions = filterOptions[key];
      const valueSet = new Set(values);
      return sourceOptions.filter((option) => valueSet.has(option));
    },
    [filterOptions],
  );

  const toggleFilterValue = useCallback(
    (key: FilterKey, value: string) => {
      syncFilters((current) => {
        const currentValues = current[key];
        const exists = currentValues.includes(value);
        const nextValues = exists
          ? currentValues.filter((item) => item !== value)
          : ensureOptionOrder([...currentValues, value], key);

        return {
          ...current,
          [key]: nextValues,
        };
      });
    },
    [ensureOptionOrder, syncFilters],
  );

  const setQuery = useCallback(
    (value: string) => {
      syncFilters((current) => ({
        ...current,
        query: value,
      }));
    },
    [syncFilters],
  );

  const resetFilters = useCallback(() => {
    syncFilters(() => ({
      ...DEFAULT_TEMPLATE_FILTERS,
      categories: [],
      platforms: [],
      difficulties: [],
      tags: [],
      query: "",
    }));
  }, [syncFilters]);

  const handleCopy = useCallback((template: TemplateItem) => {
    const packageUrl = template.resources?.packageUrl;

    if (packageUrl && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(packageUrl)
        .then(() => {
          setCopyState(template.slug);
          window.setTimeout(
            () => setCopyState((current) => (current === template.slug ? null : current)),
            2400,
          );
        })
        .catch(() => {
          window.prompt("复制模板下载链接", packageUrl);
        });
    } else if (packageUrl) {
      window.prompt("复制模板下载链接", packageUrl);
    }
  }, []);

  const totalMatches = filteredTemplates.length;
  const showReset = hasActiveTemplateFilters(filters);

  return (
    <div className="space-y-10" data-testid="template-library-browser">
      <section className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <header className="space-y-2">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">筛选模板</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            支持组合筛选并通过 URL 分享当前视图，便于团队协作讨论。
          </p>
        </header>

        <div className="space-y-4">
          <label className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-300 sm:flex-row sm:items-center">
            <span className="shrink-0 font-medium text-neutral-700 dark:text-neutral-200">
              关键词
            </span>
            <input
              type="search"
              placeholder="按标题、摘要、平台或标签搜索"
              value={filters.query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300/70 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-700/60"
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            {(Object.keys(FILTER_SECTION_LABEL) as FilterKey[]).map((key) => {
              const options = filterOptions[key];
              if (options.length === 0) return null;

              return (
                <div key={key} className="space-y-2">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {FILTER_SECTION_LABEL[key]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {options.map((option) => {
                      const active = filters[key].includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleFilterValue(key, option)}
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                            active
                              ? "border-neutral-900 bg-neutral-900 text-white focus-visible:outline-neutral-400 dark:border-white dark:bg-white dark:text-neutral-900 dark:focus-visible:outline-neutral-500"
                              : "border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white dark:focus-visible:outline-neutral-600",
                          ].join(" ")}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-neutral-200 pt-4 text-sm dark:border-neutral-800">
          <div className="text-neutral-600 dark:text-neutral-300">
            已匹配{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">{totalMatches}</span>{" "}
            个模板
          </div>
          {showReset ? (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white dark:focus-visible:outline-neutral-600"
            >
              重置筛选
            </button>
          ) : (
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              设置过滤条件以快速缩小范围。
            </span>
          )}
        </div>
      </section>

      {totalMatches === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-400">
          未匹配到模板，请调整筛选条件或清除关键字。
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <article
              key={template.slug}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{template.category}</span>
                  <span>·</span>
                  <span>{template.platform}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {template.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {template.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
                    难度：{template.difficulty}
                  </span>
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-neutral-400">最近更新：{template.updatedAt}</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(template)}
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900/80 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:bg-white/20 dark:text-white dark:hover:bg-white/30 dark:focus-visible:outline-neutral-500"
                  >
                    复制下载链接
                  </button>
                  <a
                    href={template.resources?.packageUrl || "#"}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white dark:focus-visible:outline-neutral-600"
                  >
                    下载 JSON
                  </a>
                  <a
                    href={template.resources?.guideUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white dark:focus-visible:outline-neutral-600"
                  >
                    查看指引
                  </a>
                </div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500" aria-live="polite">
                  {copyState === template.slug ? "下载链接已复制到剪贴板。" : "\u00A0"}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
