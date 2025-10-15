export type NavItem = {
  label: string;
  href: string;
};

export const MAIN_NAV: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "专题", href: "/topics" },
  { label: "文章", href: "/articles" },
  { label: "模板库", href: "/templates" },
  { label: "搜索", href: "/search" },
  { label: "订阅", href: "/subscribe" },
];

export const SECONDARY_NAV: NavItem[] = [
  { label: "项目概览", href: "/about" },
  { label: "隐私政策", href: "/privacy" },
  { label: "用户协议", href: "/terms" },
  { label: "Cookie 使用说明", href: "/cookies" },
];
