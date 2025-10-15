import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">404</p>
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
        页面不存在或已下线
      </h1>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        请检查链接是否正确，或返回首页浏览最新的专题、文章与模板。
      </p>
      <div className="flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
        >
          返回首页
        </Link>
        <Link
          href="/search"
          className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white"
        >
          搜索内容
        </Link>
      </div>
    </div>
  );
}
