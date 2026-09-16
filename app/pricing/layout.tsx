import type { Metadata } from "next";

// pricing/page.tsx 是 client 组件，无法导出 metadata；
// 用 server layout 补 canonical，否则 www 与 apex 形成重复页面。
export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
