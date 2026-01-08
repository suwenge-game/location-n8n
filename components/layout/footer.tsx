import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "工作流", href: ROUTES.WORKFLOWS },
      { name: "文档", href: ROUTES.DOCS },
      { name: "价格", href: ROUTES.PRICING },
    ],
    company: [
      { name: "关于我们", href: "/about" },
      { name: "联系我们", href: "/contact" },
      { name: "隐私政策", href: "/privacy" },
      { name: "服务条款", href: "/terms" },
    ],
    community: [
      { name: "GitHub", href: "https://github.com" },
      { name: "Discord", href: "https://discord.com" },
      { name: "Twitter", href: "https://twitter.com" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Email", icon: Mail, href: "mailto:contact@n8nhub.com" },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-white">N</span>
              </div>
              <span className="text-xl font-bold text-foreground">N8N Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              发现和分享最佳N8N自动化工作流，节省10倍开发时间。
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">产品</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">公司</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">社区</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} N8N Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
