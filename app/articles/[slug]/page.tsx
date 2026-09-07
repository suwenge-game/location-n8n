import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { formatDate, formatReadingTime } from "@/lib/formatters";
import { getTopic, topics } from "@/lib/mock-content";

function renderInline(value: string): React.ReactNode[] {
  return value.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

function SimpleMdxContent({ code }: { code: string }) {
  return code.split(/\n{2,}/).map((block, index) => {
    const text = block.trim();
    if (text.startsWith("```")) {
      const lines = text.split("\n");
      const end = lines.at(-1)?.startsWith("```") ? -1 : undefined;
      return (
        <pre key={index}>
          <code>{lines.slice(1, end).join("\n")}</code>
        </pre>
      );
    }
    if (text.startsWith("### ")) return <h3 key={index}>{renderInline(text.slice(4))}</h3>;
    if (text.startsWith("## ")) return <h2 key={index}>{renderInline(text.slice(3))}</h2>;
    if (text.split("\n").every((line) => /^[-*]\s+|^\[[ x]\]\s+/.test(line))) {
      return (
        <ul key={index}>
          {text.split("\n").map((line, item) => (
            <li key={item}>
              {renderInline(line.replace(/^[-*]\s+/, "").replace(/^\[[ x]\]\s*/, ""))}
            </li>
          ))}
        </ul>
      );
    }
    if (text.split("\n").every((line) => /^\d+\.\s+/.test(line))) {
      return (
        <ol key={index}>
          {text.split("\n").map((line, item) => (
            <li key={item}>{renderInline(line.replace(/^\d+\.\s+/, ""))}</li>
          ))}
        </ol>
      );
    }
    const lines = text.split("\n");
    return (
      <p key={index}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {renderInline(line)}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

const topicMap = new Map(topics.map((topic) => [topic.slug, topic]));

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: article.title,
    description: article.summary,
    other: { "article:published_time": article.publishedAt },
    keywords: article.tags,
    openGraph: { title: article.title, description: article.summary },
    alternates: { canonical: article.url },
    category: getTopic(article.topic)?.title ?? "文章中心",
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const topic = topicMap.get(article.topic);

  return (
    <article className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "文章中心", href: "/articles" },
          { label: topic?.title ?? "专题", href: topic ? `/topics/${topic.slug}` : "/topics" },
          { label: article.title, href: article.url },
        ]}
      />
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-neutral-400">
          <span>{topic?.title ?? "AI Agent"}</span>
          <span>·</span>
          <span>{article.tags.join(" / ")}</span>
        </div>
        <h1 className="text-3xl font-semibold leading-snug text-neutral-900 dark:text-white">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>发布时间：{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <span>阅读时间：{formatReadingTime(article.readingTime.minutes)}</span>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {article.summary}
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <SimpleMdxContent code={article.body.code} />
        </div>
        <aside className="lg:sticky lg:top-32" />
      </div>
    </article>
  );
}
