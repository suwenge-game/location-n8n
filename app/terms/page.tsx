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
          用户协议针对站点访问、内容使用以及自动化模板的授权范围做出说明，正式文本将在 T9
          任务阶段更新。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">使用许可</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          用户可在遵守法律法规的前提下免费试用模板与指南。若将模板用于商业化项目，请保留来源标识并遵守相关协议条款。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">知识产权</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          除用户上传内容外，本站发布的文档、模板与代码示例均由 AutoFlow
          项目及贡献者持有版权。未经许可不得复制、转载或用于违法用途。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">责任限制</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          自动化流程可能与第三方平台或云服务集成，用户需自行确保配置与安全性。因不当配置导致的数据丢失或损失，AutoFlow
          项目不承担连带责任。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">协议更新</h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          协议将根据业务调整与法规变化适时更新，并同步于站内公告或邮件订阅。继续使用即视为接受更新后的条款。
        </p>
      </section>
    </div>
  );
}
