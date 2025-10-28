import type { TemplateItem } from "./mock-content";

export type TemplateFilters = {
  categories: string[];
  platforms: string[];
  difficulties: string[];
  tags: string[];
  query: string;
};

export const DEFAULT_TEMPLATE_FILTERS: TemplateFilters = {
  categories: [],
  platforms: [],
  difficulties: [],
  tags: [],
  query: "",
};

const PARAM_KEYS = {
  categories: "category",
  platforms: "platform",
  difficulties: "difficulty",
  tags: "tag",
  query: "q",
} as const;

function toArray(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueOrdered(values: Iterable<string>): string[] {
  const seen = new Set<string>();
  for (const value of values) {
    if (value) {
      seen.add(value);
    }
  }
  return Array.from(seen);
}

export function parseTemplateFiltersFromObject(
  params: Record<string, string | string[] | undefined>,
): TemplateFilters {
  return {
    categories: uniqueOrdered(toArray(params[PARAM_KEYS.categories])),
    platforms: uniqueOrdered(toArray(params[PARAM_KEYS.platforms])),
    difficulties: uniqueOrdered(toArray(params[PARAM_KEYS.difficulties])),
    tags: uniqueOrdered(toArray(params[PARAM_KEYS.tags])),
    query:
      typeof params[PARAM_KEYS.query] === "string"
        ? (params[PARAM_KEYS.query] as string).trim()
        : "",
  };
}

export function parseTemplateFiltersFromSearchParams(params: URLSearchParams): TemplateFilters {
  return {
    categories: uniqueOrdered(params.getAll(PARAM_KEYS.categories)),
    platforms: uniqueOrdered(params.getAll(PARAM_KEYS.platforms)),
    difficulties: uniqueOrdered(params.getAll(PARAM_KEYS.difficulties)),
    tags: uniqueOrdered(params.getAll(PARAM_KEYS.tags)),
    query: params.get(PARAM_KEYS.query)?.trim() ?? "",
  };
}

export function serializeTemplateFilters(filters: TemplateFilters): URLSearchParams {
  const params = new URLSearchParams();

  filters.categories.forEach((value) => params.append(PARAM_KEYS.categories, value));
  filters.platforms.forEach((value) => params.append(PARAM_KEYS.platforms, value));
  filters.difficulties.forEach((value) => params.append(PARAM_KEYS.difficulties, value));
  filters.tags.forEach((value) => params.append(PARAM_KEYS.tags, value));

  const queryValue = filters.query.trim();
  if (queryValue) {
    params.set(PARAM_KEYS.query, queryValue);
  }

  return params;
}

export type TemplateFilterOptions = {
  categories: string[];
  platforms: string[];
  difficulties: string[];
  tags: string[];
};

const DIFFICULTY_ORDER: TemplateItem["difficulty"][] = ["入门", "进阶", "专家"];

export function getTemplateFilterOptions(templates: TemplateItem[]): TemplateFilterOptions {
  const categories: string[] = [];
  const platforms: string[] = [];
  const tags: string[] = [];

  templates.forEach((item) => {
    categories.push(item.category);
    platforms.push(item.platform);
    tags.push(...item.tags);
  });

  const uniqueCategories = uniqueOrdered(categories);
  const uniquePlatforms = uniqueOrdered(platforms);
  const uniqueTags = uniqueOrdered(tags);

  const availableDifficulties = DIFFICULTY_ORDER.filter((difficulty) =>
    templates.some((item) => item.difficulty === difficulty),
  );

  return {
    categories: uniqueCategories,
    platforms: uniquePlatforms,
    difficulties: availableDifficulties,
    tags: uniqueTags,
  };
}

export function applyTemplateFilters(
  templates: TemplateItem[],
  filters: TemplateFilters,
): TemplateItem[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return templates.filter((template) => {
    if (filters.categories.length > 0 && !filters.categories.includes(template.category)) {
      return false;
    }

    if (filters.platforms.length > 0 && !filters.platforms.includes(template.platform)) {
      return false;
    }

    if (filters.difficulties.length > 0 && !filters.difficulties.includes(template.difficulty)) {
      return false;
    }

    if (filters.tags.length > 0 && !filters.tags.every((tag) => template.tags.includes(tag))) {
      return false;
    }

    if (normalizedQuery) {
      const haystack = [
        template.title,
        template.summary,
        template.platform,
        template.category,
        ...template.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export function hasActiveTemplateFilters(filters: TemplateFilters): boolean {
  return (
    filters.categories.length > 0 ||
    filters.platforms.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.tags.length > 0 ||
    Boolean(filters.query.trim())
  );
}

function arraysEqual(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
}

export function areTemplateFiltersEqual(left: TemplateFilters, right: TemplateFilters): boolean {
  return (
    arraysEqual(left.categories, right.categories) &&
    arraysEqual(left.platforms, right.platforms) &&
    arraysEqual(left.difficulties, right.difficulties) &&
    arraysEqual(left.tags, right.tags) &&
    left.query === right.query
  );
}
