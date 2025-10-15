type TocItem = {
  depth: number;
  value: string;
  slug: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="文章目录"
      className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm dark:border-neutral-800 dark:bg-neutral-900/80"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        目录
      </p>
      <ul className="mt-4 space-y-2 text-neutral-600 dark:text-neutral-300">
        {items.map((item) => (
          <li key={item.slug} className={item.depth > 2 ? "pl-4 text-xs" : "text-sm"}>
            <a
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              href={`#${item.slug}`}
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
