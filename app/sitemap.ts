import { MetadataRoute } from "next";
import { realWorkflows } from "@/lib/real-workflows";

export const dynamic = "force-static";

// 站点配置为 output:"export" + trailingSlash:true，因此每个页面的正式地址都带尾斜杠。
// sitemap 若少写斜杠，Google 抓到的每条 URL 都会吃一次 308，属白送的重定向损耗。
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flowhub.blog";

  // 静态页面
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/workflows/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // /dashboard 被 robots.txt Disallow，不得出现在 sitemap 中
    {
      url: `${baseUrl}/login/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // 工作流详情页
  const workflowPages = realWorkflows.map((workflow) => ({
    url: `${baseUrl}/workflows/${workflow.slug}/`,
    lastModified: new Date(workflow.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...workflowPages];
}
