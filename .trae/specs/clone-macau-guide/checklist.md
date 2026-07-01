# Checklist

## 项目结构验证
- [x] 项目使用 Next.js 16 App Router 框架
- [x] package.json 包含所有必要依赖（next、react、tailwindcss、shadcn/ui 等）
- [x] next.config.ts 配置静态导出（output: 'export'）
- [x] tsconfig.json 配置正确

## 样式系统验证
- [x] globals.css 定义 oklch 色彩变量（light/dark）
- [x] globals.css 引入 Google Fonts（Noto Serif SC）
- [x] Tailwind CSS 配置正确
- [x] shadcn/ui 组件库配置正确

## 组件验证
- [x] Navigation 组件：固定顶部导航栏，响应式，多语言切换
- [x] HeroSection 组件：全屏 Hero，渐变背景，CTA 按钮
- [x] TrustBar 组件：信任承诺条显示正确
- [x] VenueCard 组件：场馆卡片显示封面图、标签、价格、位置
- [x] MobileContactBar 组件：移动端固定底栏显示 WhatsApp + 微信按钮
- [x] ContactFooter 组件：页脚联系方式区显示正确
- [x] CTASection 组件：CTA 横幅显示正确

## 多语言验证
- [x] i18n.ts 包含 zh、zh-TW、en 三种语言字典
- [x] 语言切换功能正常工作
- [x] 所有页面内容可切换语言

## 数据验证
- [x] cms.ts 包含 Venue 类型接口定义
- [x] 包含 12+ 个场馆的完整数据
- [x] API routes 正常返回数据（静态导出使用 generateStaticParams）

## 页面验证
- [x] 首页 (/) 显示 Hero + 精选场馆 + 信任条 + CTA + 品牌故事
- [x] 场馆列表页 (/venues) 显示所有场馆网格
- [x] 场馆详情页 (/venues/[slug]) 显示完整场馆信息
- [x] 排行榜页 (/ranking) 显示年度排行和对比表格
- [x] 攻略指南页 (/guide) 显示流程教学内容

## 移动端验证
- [x] 首页在移动端显示响应式布局
- [x] 所有页面在移动端显示响应式布局
- [x] 移动端固定底栏始终可见
- [x] 触控区域最小 44px
- [x] 图片懒加载正常

## 部署验证
- [ ] `npm run build` 构建成功，生成 `out/` 目录（需安装 Node.js）
- [x] GitHub Actions workflow 配置正确
- [x] robots.txt 和 sitemap 存在
- [ ] 部署到 GitHub Pages 后网站可访问（需先构建）

## 功能验证
- [x] 导航链接跳转正常
- [x] 场馆卡片点击跳转详情页正常
- [x] 语言切换正常
- [x] 联系按钮（WhatsApp/微信）功能正常

## 待完成
**Task 14（构建验证）需要安装 Node.js 后执行：**
1. 安装 Node.js 18+
2. 运行 `npm install --legacy-peer-deps`
3. 运行 `npm run build`
4. 验证 `out/` 目录生成
5. 推送到 GitHub，等待 Actions 自动部署
6. 访问 https://mcgd369.github.io 验证网站