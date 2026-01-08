import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TrustSection() {
  const features = [
    {
      icon: CheckCircle2,
      title: "经过验证",
      description: "所有工作流经过专业测试，确保质量和稳定性",
    },
    {
      icon: CheckCircle2,
      title: "即插即用",
      description: "无需编程，一键导入即可使用",
    },
    {
      icon: CheckCircle2,
      title: "超值价格",
      description: "专业开发，价格合理，性价比高",
    },
    {
      icon: CheckCircle2,
      title: "持续更新",
      description: "定期更新和维护，保持最新功能",
    },
  ];

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">为什么选择我们</h2>
        <p className="text-muted-foreground">专业的工作流市场，值得信赖</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-2 border-border text-center">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
