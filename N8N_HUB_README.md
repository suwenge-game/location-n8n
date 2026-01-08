# N8N Hub - N8N工作流市场

一个现代化的N8N工作流市场网站，用于展示和售卖N8N自动化工作流模板。

## 🎨 设计特色

- **现代化UI设计**: 采用Vibrant & Block风格 + Flat Design
- **完全响应式**: 移动端优先，完美适配320px-1440px所有设备
- **暗色模式支持**: 自动适配系统主题偏好
- **专业配色方案**: SaaS风格蓝绿配色 + 橙色强调色
- **优雅字体**: Space Grotesk（标题） + DM Sans（正文）

## ✨ 已实现功能

### 1. 首页 (/)

- ✅ Hero区域：搜索框、价值主张、快速分类入口
- ✅ 分类浏览：8个主要分类，带图标和数量
- ✅ 精选工作流：展示6个热门工作流
- ✅ 信任元素：4个核心优势展示
- ✅ CTA区域：引导用户开始探索

### 2. 工作流列表页 (/workflows)

- ✅ 搜索功能：实时搜索工作流标题、描述、标签
- ✅ 高级筛选：
  - 分类筛选（8个分类）
  - 价格筛选（免费/付费）
  - 难度筛选（初级/中级/高级）
  - 平台筛选（8个主流平台）
- ✅ 排序功能：最新/最受欢迎/评分最高/下载最多
- ✅ 工作流卡片网格：响应式布局
- ✅ 移动端筛选侧边栏

### 3. 工作流详情页 (/workflows/[slug])

- ✅ 面包屑导航
- ✅ 大图/视频预览区
- ✅ 开发者信息卡片
- ✅ 价格/购买卡片
- ✅ 功能特性列表
- ✅ 系统要求说明
- ✅ 许可证信息
- ✅ 快速开始指南
- ✅ 相关工作流推荐

### 4. 核心组件

#### UI组件 (components/ui/)

- ✅ Button - 按钮组件（多种变体）
- ✅ Card - 卡片组件
- ✅ Badge - 标签组件
- ✅ Input - 输入框组件
- ✅ Skeleton - 骨架屏组件

#### 布局组件 (components/layout/)

- ✅ Navbar - 响应式导航栏
- ✅ Footer - 页脚（包含链接和社交媒体）

#### 业务组件

- ✅ WorkflowCard - 工作流卡片
- ✅ WorkflowGrid - 工作流网格
- ✅ CategoryCard - 分类卡片
- ✅ CategoryGrid - 分类网格
- ✅ FilterSidebar - 筛选侧边栏
- ✅ Hero - 首页Hero区
- ✅ FeaturedSection - 精选区域
- ✅ TrustSection - 信任元素区
- ✅ CTASection - CTA区域

## 🏗️ 项目结构

```
location-n8n/
├── app/
│   ├── layout.tsx                    # 根布局
│   ├── page.tsx                      # 首页
│   ├── globals.css                   # 全局样式
│   ├── workflows/
│   │   ├── page.tsx                  # 工作流列表页
│   │   └── [slug]/
│   │       └── page.tsx              # 工作流详情页
│   └── ...
├── components/
│   ├── ui/                           # 基础UI组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── skeleton.tsx
│   ├── layout/                       # 布局组件
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── workflows/                    # 工作流组件
│   │   ├── workflow-card.tsx
│   │   ├── workflow-grid.tsx
│   │   ├── category-card.tsx
│   │   ├── category-grid.tsx
│   │   └── filter-sidebar.tsx
│   ├── home/                         # 首页组件
│   │   ├── hero.tsx
│   │   ├── featured-section.tsx
│   │   ├── trust-section.tsx
│   │   └── cta-section.tsx
│   └── workflow-detail/              # 详情页组件
│       ├── workflow-preview.tsx
│       ├── workflow-info.tsx
│       └── related-workflows.tsx
├── lib/
│   ├── constants.ts                  # 常量配置
│   ├── utils.ts                      # 工具函数
│   └── mock-workflows.ts             # Mock数据
├── types/
│   └── workflow.ts                   # 类型定义
└── public/                           # 静态资源
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本

```bash
npm run build
npm start
```

## 📱 响应式断点

- **sm**: 640px（手机横屏）
- **md**: 768px（平板）
- **lg**: 1024px（笔记本）
- **xl**: 1280px（台式机）
- **2xl**: 1536px（大屏）

## 🎨 配色方案

```css
/* 亮色模式 */
--primary: #3b82f6 (蓝色) --primary-hover: #2563eb --accent: #f97316 (橙色) --background: #f8fafc
  --foreground: #1e293b --border: #e2e8f0 /* 暗色模式 */ --primary: #3b82f6 --primary-hover: #60a5fa
  --accent: #fb923c --background: #0f172a --foreground: #f1f5f9 --border: #334155;
```

## 🔧 技术栈

- **框架**: Next.js 15.5.5 (App Router)
- **样式**: Tailwind CSS 4
- **字体**: Space Grotesk + DM Sans (Google Fonts)
- **图标**: Lucide React
- **语言**: TypeScript 5

## 📝 待扩展功能

以下功能已预留接口，可按需添加：

- [ ] 用户认证系统
- [ ] 购物车和支付功能
- [ ] 用户仪表板
- [ ] 评论系统
- [ ] 工作流上传功能
- [ ] 实时搜索（使用API路由）
- [ ] 分页功能
- [ ] 收藏功能

## 📄 数据结构

### Workflow（工作流）

- id, title, slug, description
- thumbnail, category, tags
- rating, downloads, price
- author, features, requirements
- version, updatedAt, difficulty
- platform, language, license

### Category（分类）

- id, name, slug, icon
- description, count, color

### Author（作者）

- id, name, avatar, bio
- website, workflows, rating

## 🎯 优化建议

1. **性能优化**:
   - ✅ 使用Next.js Image组件
   - ✅ 响应式图片
   - ✅ 懒加载组件
   - ✅ 骨架屏

2. **SEO优化**:
   - ✅ 语义化HTML
   - ✅ Meta标签
   - ✅ 结构化数据（可扩展）

3. **无障碍**:
   - ✅ ARIA标签
   - ✅ 键盘导航
   - ✅ 颜色对比度

## 📄 许可证

MIT License

---

**开发完成时间**: 2026-01-06
**版本**: 1.0.0
