import "server-only";

import fs from "node:fs";
import path from "node:path";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  publishedAt: string;
  tags: string[];
  status: "published" | "draft";
  url: string;
  readingTime: { minutes: number };
  body: { code: string };
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseArticle(source: string, slug: string): Article {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`文章 ${slug} 缺少有效的 frontmatter`);
  const metadata: Record<string, string | string[]> = {};
  let arrayKey: string | null = null;

  for (const rawLine of match[1].split(/\r?\n/)) {
    const listItem = rawLine.match(/^\s+-\s+(.+)$/);
    if (listItem && arrayKey) {
      (metadata[arrayKey] as string[]).push(unquote(listItem[1]));
      continue;
    }
    const field = rawLine.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!field) continue;
    const [, key, rawValue] = field;
    if (!rawValue) {
      metadata[key] = [];
      arrayKey = key;
    } else {
      metadata[key] = unquote(rawValue);
      arrayKey = null;
    }
  }

  for (const key of ["title", "summary", "topic", "publishedAt", "status"] as const) {
    if (typeof metadata[key] !== "string" || !metadata[key])
      throw new Error(`文章 ${slug} 的 frontmatter 缺少 ${key}`);
  }
  const body = match[2].trim();
  return {
    slug,
    title: metadata.title as string,
    summary: metadata.summary as string,
    topic: metadata.topic as string,
    publishedAt: metadata.publishedAt as string,
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    status: metadata.status === "draft" ? "draft" : "published",
    url: `/articles/${slug}`,
    readingTime: { minutes: Math.max(1, Math.ceil(body.replace(/\s/g, "").length / 500)) },
    body: { code: body },
  };
}

export function getAllArticles(): Article[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return parseArticle(fs.readFileSync(path.join(articlesDirectory, file), "utf8"), slug);
    })
    .filter((article) => article.status !== "draft")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}
