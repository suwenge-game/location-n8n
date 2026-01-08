import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/workflows/category-grid";
import { FeaturedSection } from "@/components/home/featured-section";
import { TrustSection } from "@/components/home/trust-section";
import { CTASection } from "@/components/home/cta-section";
import { categories, featuredWorkflows } from "@/lib/mock-workflows";

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
        <CategoryGrid categories={categories} />
      </section>

      {/* Featured Workflows */}
      <FeaturedSection
        workflows={featuredWorkflows}
        title="精选工作流"
        description="最受欢迎和推荐的工作流模板"
      />

      {/* Trust Section */}
      <TrustSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
