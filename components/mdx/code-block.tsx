"use client";

import { useState } from "react";

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
  children: React.ReactNode;
};

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = typeof children === "string" ? children : getTextContent(children);
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  };

  return (
    <div className="group relative">
      <pre {...props}>{children}</pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-300"
      >
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  );
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }

  if (typeof children === "object" && children && "props" in children) {
    const child = children as { props?: { children?: React.ReactNode } };
    return getTextContent(child.props?.children ?? "");
  }

  return "";
}
