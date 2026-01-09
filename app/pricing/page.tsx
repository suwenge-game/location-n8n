"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Check, Zap, Shield, HeadphonesIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "基础版",
      description: "适合个人开发者和小团队",
      price: { monthly: 0, yearly: 0 },
      icon: Sparkles,
      features: [
        "5个工作流/月",
        "社区支持",
        "基础模板访问",
        "JSON格式导出",
        "30天历史记录",
      ],
      cta: "免费开始",
      popular: false,
    },
    {
      name: "专业版",
      description: "适合成长中的团队和企业",
      price: { monthly: 99, yearly: 990 },
      icon: Zap,
      features: [
        "无限工作流",
        "优先邮件支持",
        "全部模板访问",
        "多种格式导出",
        "无限历史记录",
        "高级定制功能",
        "API访问",
        "团队协作",
      ],
      cta: "开始使用",
      popular: true,
    },
    {
      name: "企业版",
      description: "适合大型组织和定制需求",
      price: { monthly: 299, yearly: 2990 },
      icon: Shield,
      features: [
        "专业版所有功能",
        "专属客户经理",
        "24/7电话支持",
        "私有化部署",
        "定制开发",
        "SLA保障",
        "培训服务",
        "无限团队成员",
      ],
      cta: "联系销售",
      popular: false,
    },
  ];

  const getDisplayPrice = (price: number) => {
    return price === 0 ? "免费" : `¥${price}`;
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="secondary" className="mb-2">灵活定价</Badge>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          选择适合您的方案
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          从个人开发者到企业团队，我们都有适合您的方案
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`text-sm font-medium transition-colors ${
              billingCycle === "monthly"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            按月付费
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingCycle === "yearly" ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`text-sm font-medium transition-colors ${
              billingCycle === "yearly"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            按年付费
          </button>
          {billingCycle === "yearly" && (
            <Badge variant="success" className="ml-2">省17%</Badge>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const displayPrice = getDisplayPrice(plan.price[billingCycle]);

          return (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-2 border-primary shadow-lg scale-105"
                  : "border-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">最受欢迎</Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">{plan.name}</CardTitle>
                <p className="text-center text-muted-foreground">{plan.description}</p>
                <div className="text-center pt-4">
                  <span className="text-4xl font-bold text-foreground">{displayPrice}</span>
                  {plan.price[billingCycle] > 0 && (
                    <span className="text-muted-foreground">
                      /{billingCycle === "monthly" ? "月" : "年"}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={plan.price[billingCycle] === 0 ? ROUTES.REGISTER as Route : ROUTES.WORKFLOWS as Route}
                  className="block"
                >
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">常见问题</h2>
        <div className="space-y-4">
          {[
            {
              q: "可以随时升级或降级吗？",
              a: "当然可以！您可以随时在用户中心升级或降级您的套餐，费用会按比例计算。",
            },
            {
              q: "免费版有什么限制？",
              a: "免费版每月可以下载5个工作流，适合个人开发者和小团队使用。升级到专业版可以获得无限工作流下载。",
            },
            {
              q: "支持哪些支付方式？",
              a: "我们支持支付宝、微信支付、银行转账等多种支付方式。企业用户还可以开具发票。",
            },
            {
              q: "购买后可以退款吗？",
              a: "我们提供7天无理由退款服务。如果您对产品不满意，可以在购买后7天内申请全额退款。",
            },
            {
              q: "企业版包含哪些服务？",
              a: "企业版包含专属客户经理、24/7电话支持、私有化部署、定制开发等服务。具体请联系我们的销售团队了解详情。",
            },
          ].map((faq, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 rounded-3xl border-2 border-border bg-card p-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HeadphonesIcon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">需要帮助选择？</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          如果您不确定哪个方案最适合您的需求，请联系我们的销售团队，我们会为您提供专业的建议。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" variant="default">
            联系销售
          </Button>
          <Link href={ROUTES.WORKFLOWS as Route}>
            <Button size="lg" variant="outline">
              查看工作流
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
