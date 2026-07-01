# Tasks

## 阶段一：项目初始化
- [x] Task 1: 初始化 Next.js 16 项目并配置依赖
  - [x] SubTask 1.1: 删除现有 VitePress 文件（docs/、package.json 等）
  - [x] SubTask 1.2: 创建 Next.js 16 项目配置（next.config.ts、tsconfig.json）
  - [x] SubTask 1.3: 配置 package.json 依赖（React 19、Tailwind CSS 4、shadcn/ui）
  - [x] SubTask 1.4: 配置静态导出输出目录为 `out/`

## 阶段二：样式系统搭建
- [x] Task 2: 配置 Tailwind CSS 4 和 shadcn/ui
  - [x] SubTask 2.1: 创建 globals.css，定义 oklch 色彩变量和字体
  - [x] SubTask 2.2: 配置 shadcn/ui 组件（button、card、badge、dialog 等）
  - [x] SubTask 2.3: 创建 components.json 配置文件

## 阶段三：核心组件复刻
- [x] Task 3: 创建布局和导航组件
  - [x] SubTask 3.1: 创建 RootLayout（app/layout.tsx）
  - [x] SubTask 3.2: 创建 Navigation 组件（固定顶部导航栏）
  - [x] SubTask 3.3: 创建 MobileContactBar 组件（移动端固定底栏）
  - [x] SubTask 3.4: 创建 ContactFooter 组件（页脚联系方式区）

- [x] Task 4: 创建首页组件
  - [x] SubTask 4.1: 创建 HeroSection 组件（全屏 Hero 区）
  - [x] SubTask 4.2: 创建 TrustBar 组件（信任承诺条）
  - [x] SubTask 4.3: 创建 CTASection 组件（CTA 横幅）
  - [x] SubTask 4.4: 创建 VenueCard 组件（场馆卡片）

- [x] Task 5: 创建多语言系统
  - [x] SubTask 5.1: 创建 i18n.ts 字典文件（zh、zh-TW、en）
  - [x] SubTask 5.2: 创建 i18n-context.tsx 上下文
  - [x] SubTask 5.3: 创建 ClientProviders 组件

## 阶段四：数据层搭建
- [x] Task 6: 创建场馆数据模块
  - [x] SubTask 6.1: 创建 cms.ts 定义 Venue 类型接口
  - [x] SubTask 6.2: 复制所有场馆数据（12+ 个场馆的完整信息）
  - [x] SubTask 6.3: 创建 API routes（/api/venues、/api/venues/[slug]、/api/ranking）

## 阶段五：页面复刻
- [x] Task 7: 创建首页 (app/page.tsx)
  - [x] SubTask 7.1: 组合 HeroSection + GuideFlowSection + TrustBar + CTASection
  - [x] SubTask 7.2: 创建品牌故事区块

- [x] Task 8: 创建场馆列表页 (app/venues/page.tsx)
  - [x] SubTask 8.1: 显示所有场馆网格列表
  - [x] SubTask 8.2: 实现筛选和排序功能

- [x] Task 9: 创建场馆详情页 (app/venues/[slug]/page.tsx)
  - [x] SubTask 9.1: 显示场馆封面图和基本信息
  - [x] SubTask 9.2: 显示核心亮点和详细评价
  - [x] SubTask 9.3: 显示价格方案和相似推荐

- [x] Task 10: 创建排行榜页 (app/ranking/page.tsx)
  - [x] SubTask 10.1: 显示年度排行列表
  - [x] SubTask 10.2: 创建对比表格组件

- [x] Task 11: 创建攻略指南页 (app/guide/page.tsx)
  - [x] SubTask 11.1: 创建目录导航（锚点跳转）
  - [x] SubTask 11.2: 分章节展示流程教学内容

## 阶段六：静态资源迁移
- [x] Task 12: 迁移图片资源
  - [x] SubTask 12.1: 复制场馆封面图到 public/venues/covers/
  - [x] SubTask 12.2: 复制场馆图库到 public/venues/[slug]/
  - [x] SubTask 12.3: 复制视频资源（如有）
  - [x] SubTask 12.4: 复制 Logo 和图标资源

## 阶段七：部署配置
- [x] Task 13: 配置 GitHub Pages 部署
  - [x] SubTask 13.1: 更新 .github/workflows/deploy.yml 适配 Next.js
  - [x] SubTask 13.2: 配置 next.config.ts 的 basePath 和 output
  - [x] SubTask 13.3: 创建 robots.txt 和 sitemap

## 阶段八：验证测试
- [ ] Task 14: 构建和验证
  - [ ] SubTask 14.1: 执行 `npm run build` 等待 Node.js 环境安装后确认构建成功
  - [ ] SubTask 14.2: 本地预览验证页面显示正常（待 Node.js 安装后执行）
  - [ ] SubTask 14.3: 验证移动端响应式布局（待 Node.js 安装后执行）

**注意**：Task 14 需要安装 Node.js 后执行。项目代码已全部完成，可推送到 GitHub 让 GitHub Actions 自动构建部署。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 1]
- [Task 6] depends on [Task 1]
- [Task 7] depends on [Task 3, Task 4, Task 5, Task 6]
- [Task 8] depends on [Task 3, Task 4, Task 6]
- [Task 9] depends on [Task 3, Task 4, Task 6]
- [Task 10] depends on [Task 3, Task 6]
- [Task 11] depends on [Task 3, Task 5]
- [Task 12] depends on [Task 1]
- [Task 13] depends on [Task 7, Task 8, Task 9, Task 10, Task 11, Task 12]
- [Task 14] depends on [Task 13]

# Parallelizable Work
- Task 3, Task 4, Task 5, Task 6 可并行执行
- Task 12 可与其他任务并行执行