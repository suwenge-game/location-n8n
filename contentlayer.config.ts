import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import type { Heading } from "mdast";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypePrettyCode from "rehype-pretty-code";

const getTableOfContents = (raw: string) => {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(raw);
  const slugger = new GithubSlugger();
  const headings: Array<{ depth: number; value: string; slug: string }> = [];

  visit(tree, "heading", (node: Heading) => {
    if (!node.depth || node.depth > 3) return;
    const value = toString(node);
    const slug = slugger.slug(value);
    headings.push({ depth: node.depth, value, slug });
  });

  return headings;
};

const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    topic: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    status: { type: "enum", options: ["draft", "published"], required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^articles\//, ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/articles/${doc._raw.flattenedPath.replace(/^articles\//, "")}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: "json",
      resolve: (doc) => getTableOfContents(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Article],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor-link"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["sr-only"] },
            children: [{ type: "text", value: "锚点" }],
          },
        },
      ],
      // rehypePrettyCode is temporarily disabled pending build environment support
    ],
  },
});
