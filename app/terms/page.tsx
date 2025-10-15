import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "用户协议",
  description: "约定站点使用范围、责任划分及内容版权。",
};

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "用户协议", href: "/terms" },
        ]}
      />
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">用户协议</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          感谢您使用 AutoFlow 站点。本协议阐明我们提供服务的范围、双方权利义务以及内容使用规范，请在继续浏览或下载模板前仔细阅读。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">使用许可</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          您可在遵守法律法规的前提下免费试用站内提供的模板、文章与工具。若将内容用于商业项目，请保留来源标识，并确保不以误导方式展示 AutoFlow 品牌。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">知识产权</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          除用户自行提交的内容外，本站发布的文档、模板与代码示例均由 AutoFlow 项目及贡献者持有版权。未经书面许可，不得复制、转载、售卖或以其他方式商业化利用站内内容。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">责任限制</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          模板与自动化流程可能需要与第三方平台或云服务集成。您应自行评估其合规性与安全性，并妥善管理账号权限。因不当配置导致的数据丢失或损失，AutoFlow 项目不承担连带责任。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">隐私与 Cookie</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          我们将按照《隐私政策》说明的方式处理您的个人信息，您可通过页面底部的“管理 Cookie 偏好”按钮随时调整非必要 Cookie 授权。使用站点即表示您知晓并接受相关隐私条款。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">协议更新</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          随着产品功能或法律环境的变化，我们会适时更新本协议，并在站内显著位置提示。继续使用站点即视为接受更新后的条款。
        </p>
      </section>
    </div>
  );
}
