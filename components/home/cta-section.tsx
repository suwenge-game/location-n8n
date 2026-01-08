import Link from "next/link";
import { Rocket, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-12">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-12 text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground">准备好开始自动化了吗？</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            加入数千名开发者和企业，使用我们的N8N工作流模板， 快速构建强大的自动化解决方案。
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={ROUTES.WORKFLOWS}>
              <Button size="lg" className="min-w-[180px]">
                <Rocket className="mr-2 h-5 w-5" />
                开始探索
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline" className="min-w-[180px]">
                <Upload className="mr-2 h-5 w-5" />
                上传工作流
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
