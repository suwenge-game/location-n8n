export const siteMetadata = {
  name: "AutoFlow 自动化工作流",
  shortName: "AutoFlow",
  description:
    "AutoFlow 专注于打造低门槛的自动化工作流模板与实践指南，帮助团队高效运营公众号、内容采集与增长自动化。",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://autoflow.example.com",
};

export type SiteMetadata = typeof siteMetadata;
