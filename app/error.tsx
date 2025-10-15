"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">500</p>
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">发生了错误</h1>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        系统已记录该问题，稍后请重试。如果持续出现，可通过订阅入口或邮件 hi@autoflow.example.com
        反馈。
      </p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
        >
          重试
        </button>
        <a
          href="mailto:hi@autoflow.example.com"
          className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white"
        >
          联系支持
        </a>
      </div>
      {process.env.NODE_ENV === "development" && (
        <pre className="mx-auto max-w-2xl overflow-x-auto rounded-lg bg-neutral-100 p-4 text-left text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          {error.message}
          {error.digest ? `\nDigest: ${error.digest}` : ""}
        </pre>
      )}
    </div>
  );
}
