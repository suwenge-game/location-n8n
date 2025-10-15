import type { MDXComponents } from "mdx/types";

import { CodeBlock } from "./code-block";

export const mdxComponents: MDXComponents = {
  pre: (props) => <CodeBlock {...props} />,
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-500 dark:text-white dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
    >
      {children}
    </a>
  ),
};
