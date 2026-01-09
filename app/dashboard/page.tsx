"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { User, ShoppingBag, Heart, Settings, LogOut, Download, CreditCard } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";
import type { Workflow } from "@/types/workflow";

// 模拟用户数据
const mockUser = {
  name: "张三",
  email: "zhangsan@example.com",
  avatar: "",
  memberSince: "2024-01-01",
  totalSpent: 299,
};

// 模拟购买的工作流
const mockPurchasedWorkflows: Workflow[] = [
  {
    id: "1",
    title: "邮件营销自动化",
    slug: "email-marketing-automation",
    description: "自动化邮件营销流程，提高转化率",
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800",
    category: "营销自动化",
    tags: ["邮件", "营销", "自动化"],
    rating: 4.8,
    downloads: 1200,
    isFree: false,
    price: 49,
    originalPrice: 99,
    author: {
      id: "1",
      name: "N8N Hub Team",
      avatar: "",
      workflows: 10,
      rating: 4.9,
    },
    features: ["自动发送邮件", "A/B测试", "转化率追踪"],
    requirements: ["N8N 1.0+", "邮件服务API"],
    version: "1.2.0",
    updatedAt: "2024-01-05",
    createdAt: "2024-01-01",
    difficulty: "beginner",
    platform: ["gmail"],
    language: "zh-CN",
    license: "MIT",
  },
  {
    id: "2",
    title: "CRM数据同步",
    slug: "crm-data-sync",
    description: "自动同步CRM数据到多个平台",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    category: "数据同步",
    tags: ["CRM", "同步", "数据"],
    rating: 4.9,
    downloads: 850,
    isFree: false,
    price: 79,
    author: {
      id: "1",
      name: "N8N Hub Team",
      avatar: "",
      workflows: 10,
      rating: 4.9,
    },
    features: ["实时同步", "多平台支持", "错误处理"],
    requirements: ["N8N 1.0+", "CRM API"],
    version: "2.0.0",
    updatedAt: "2024-01-10",
    createdAt: "2023-12-15",
    difficulty: "intermediate",
    platform: ["salesforce", "hubspot"],
    language: "zh-CN",
    license: "MIT",
  },
];

// 模拟收藏的工作流
const mockFavoriteWorkflows: Workflow[] = [
  {
    id: "3",
    title: "Slack通知自动化",
    slug: "slack-notification-automation",
    description: "自动发送Slack通知",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    category: "团队协作",
    tags: ["Slack", "通知", "自动化"],
    rating: 4.7,
    downloads: 1500,
    isFree: true,
    author: {
      id: "1",
      name: "N8N Hub Team",
      avatar: "",
      workflows: 10,
      rating: 4.9,
    },
    features: ["自定义通知", "定时发送", "多渠道支持"],
    requirements: ["N8N 1.0+", "Slack Webhook"],
    version: "1.5.0",
    updatedAt: "2024-01-08",
    createdAt: "2023-12-01",
    difficulty: "beginner",
    platform: ["slack"],
    language: "zh-CN",
    license: "MIT",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"purchased" | "favorites" | "orders">("purchased");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">用户中心</h1>
              <p className="text-muted-foreground">管理您的工作流和订单</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - User Info */}
          <aside className="lg:col-span-1">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-1">{mockUser.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{mockUser.email}</p>
                  <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">会员时间</span>
                      <span className="font-medium">{mockUser.memberSince}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">累计消费</span>
                      <span className="font-medium">¥{mockUser.totalSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">已购工作流</span>
                      <span className="font-medium">{mockPurchasedWorkflows.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-2 mt-6">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === "purchased" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("purchased")}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    我的工作流
                  </Button>
                  <Button
                    variant={activeTab === "favorites" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("favorites")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    我的收藏
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    订单历史
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Purchased Workflows */}
            {activeTab === "purchased" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">我的工作流</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {mockPurchasedWorkflows.map((workflow) => (
                    <Card key={workflow.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={workflow.thumbnail}
                              alt={workflow.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1 truncate">{workflow.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {workflow.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">v{workflow.version}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {workflow.updatedAt}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="flex-1 gap-1">
                            <Download className="h-4 w-4" />
                            下载
                          </Button>
                          <Link href={ROUTES.WORKFLOW_DETAIL(workflow.slug) as Route}>
                            <Button size="sm" variant="outline">
                              查看详情
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Favorite Workflows */}
            {activeTab === "favorites" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">我的收藏</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {mockFavoriteWorkflows.map((workflow) => (
                    <Card key={workflow.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={workflow.thumbnail}
                              alt={workflow.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1 truncate">{workflow.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {workflow.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant={workflow.isFree ? "success" : "default"}>
                                {workflow.isFree ? "免费" : `¥${workflow.price}`}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {workflow.downloads} 下载
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Link href={ROUTES.WORKFLOW_DETAIL(workflow.slug) as Route} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              查看详情
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">订单历史</h2>
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div>
                          <p className="font-medium">订单 #202401010001</p>
                          <p className="text-sm text-muted-foreground">
                            邮件营销自动化 x 1, CRM数据同步 x 1
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">¥128</p>
                          <Badge variant="success">已完成</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <p className="font-medium">订单 #202401050001</p>
                          <p className="text-sm text-muted-foreground">
                            Slack通知自动化 x 1
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">¥0</p>
                          <Badge variant="success">已完成</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
