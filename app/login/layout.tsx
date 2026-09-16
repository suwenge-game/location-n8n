import type { Metadata } from "next";

// login/page.tsx 是 client 组件，无法导出 metadata；
// 用 server layout 补 canonical，避免 www/apex 重复页。
export const metadata: Metadata = {
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
