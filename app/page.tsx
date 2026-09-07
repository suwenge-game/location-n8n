import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/workflows/category-grid";
import { FeaturedSection } from "@/components/home/featured-section";
import { TrustSection } from "@/components/home/trust-section";
import { CTASection } from "@/components/home/cta-section";
import { realWorkflows } from "@/lib/real-workflows";

const categoryMeta = Array.from(
  realWorkflows
    .reduce((map, workflow) => {
      const current = map.get(workflow.category);
      map.set(workflow.category, {
        id: workflow.category,
        name: workflow.categoryLabel,
        slug: workflow.category,
        description: `${workflow.categoryLabel}相关的开源 N8N 自动化方案`,
        icon: "⚡",
        color: "#6366f1",
        count: (current?.count ?? 0) + 1,
      });
      return map;
    }, new Map<string, { id: string; name: string; slug: string; description: string; icon: string; color: string; count: number }>())
    .values(),
);

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">分类浏览</h2>
          <p className="text-muted-foreground">探索各种类别的N8N工作流模板</p>
        </div>
        <CategoryGrid categories={categoryMeta} />
      </section>

      {/* Featured Workflows */}
      <FeaturedSection
        workflows={realWorkflows.slice(0, 6)}
        totalCount={realWorkflows.length}
        title="精选开源工作流"
        description="从真实社区模板中精选的自动化方案"
      />

      {/* Trust Section */}
      <TrustSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
