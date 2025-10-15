import { useMDXComponent } from "next-contentlayer/hooks";

import { mdxComponents } from "./mdx-components";

type MdxContentProps = {
  code: string;
};

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
