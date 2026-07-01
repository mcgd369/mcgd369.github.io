# 复刻澳门指导网站 Spec

## Why
用户希望将 `C:\Users\Administrator\Desktop\网站\0630\template` 的澳门水疗场馆推荐网站完整复刻到当前 GitHub Pages 项目 `mcgd369.github.io`，替换原有的 VitePress 澳门美食博客，并确保完美适配移动端。

## What Changes
- **BREAKING**: 完全替换 VitePress 项目结构为 Next.js 16 项目
- 复刻所有页面：首页、场馆列表、场馆详情、排行榜、攻略指南
- 复刻所有核心组件：导航栏、Hero区、信任条、场馆卡片、移动端底栏、页脚
- 复刻完整数据：12+ 个场馆的详细信息、图片、价格、特色等
- 复刻样式系统：Tailwind CSS 4 + shadcn/ui + 自定义 oklch 色彩变量
- 实现三语切换：简体中文、繁体中文、英文
- 配置静态导出部署到 GitHub Pages

## Impact
- Affected specs: 整个项目结构
- Affected code: 删除 `docs/` 目录和 VitePress 配置，创建 Next.js 项目结构

## ADDED Requirements

### Requirement: 项目框架迁移
The system SHALL use Next.js 16 with App Router as the framework instead of VitePress.

#### Scenario: 框架替换
- **WHEN** 用户访问网站
- **THEN** 网站使用 Next.js 静态导出运行，而非 VitePress

### Requirement: 页面结构复刻
The system SHALL provide the following pages identical to the source template:

#### Scenario: 首页
- **WHEN** 用户访问首页 `/`
- **THEN** 显示 Hero 区 + 精选场馆 + 信任承诺条 + CTA + 品牌故事

#### Scenario: 场馆列表页
- **WHEN** 用户访问 `/venues`
- **THEN** 显示所有场馆的网格列表，支持筛选排序

#### Scenario: 场馆详情页
- **WHEN** 用户访问 `/venues/[slug]`
- **THEN** 显示场馆完整信息：封面图、亮点、评价、价格、相似推荐

#### Scenario: 排行榜页
- **WHEN** 用户访问 `/ranking`
- **THEN** 显示年度排行列表，包含详细评价和对比表格

#### Scenario: 攻略指南页
- **WHEN** 用户访问 `/guide`
- **THEN** 显示流程教学页面，分章节展示准备→预约→到店→流程→避坑

### Requirement: 组件复刻
The system SHALL provide the following components identical to the source template:

- `Navigation`: 固定顶部导航栏，响应式，支持多语言切换
- `HeroSection`: 全屏 Hero 区，渐变背景 + 标题 + CTA 按钮
- `TrustBar`: 信任承诺条（独家折扣、免费接送、免费按摩、专业推荐）
- `VenueCard`: 场馆卡片组件（封面图、标签、名称、价格、位置）
- `MobileContactBar`: 移动端固定底栏（WhatsApp + 微信按钮）
- `ContactFooter`: 页脚联系方式区
- `CTASection`: CTA 横幅区

### Requirement: 数据复刻
The system SHALL include all venue data from the source template:

- 尚品国际水疗、曼濠水疗、玖号水疗、巨亨桑拿、极品桑拿
- 东方皇堡水疗、尊贵水疗、晋会桑拿、豪门桑拿、壹号桑拿
- 帝湖水疗、凯旋桑拿
- 每个场馆包含：名称、简介、价格、位置、评分、特色、亮点、评价、图片库等

### Requirement: 多语言支持
The system SHALL support three languages with switch functionality:

- 简体中文 (zh) - 默认
- 繁体中文 (zh-TW)
- 英文 (en)

#### Scenario: 语言切换
- **WHEN** 用户点击导航栏语言切换按钮
- **THEN** 页面内容切换为对应语言

### Requirement: 移动端适配
The system SHALL be fully responsive and optimized for mobile devices:

#### Scenario: 移动端显示
- **WHEN** 用户在移动设备访问
- **THEN** 页面显示响应式布局，移动端固定底栏始终可见

#### Scenario: 触控友好
- **WHEN** 用户在移动设备操作
- **THEN** 所有触控区域最小 44px，底部 CTA 始终可见

### Requirement: 样式系统
The system SHALL use the following styling approach:

- Tailwind CSS 4 with custom theme configuration
- shadcn/ui component library (Radix UI primitives)
- Custom oklch color variables for light/dark mode
- Google Fonts: Noto Serif SC for headings

### Requirement: 部署配置
The system SHALL be deployable to GitHub Pages via static export:

#### Scenario: 静态导出
- **WHEN** 构建 `npm run build`
- **THEN** 生成静态 HTML 文件到 `out/` 目录

#### Scenario: GitHub Actions 部署
- **WHEN** 推送到 main 分支
- **THEN** 自动构建并部署到 GitHub Pages

## MODIFIED Requirements
N/A - 这是一个全新的替换项目

## REMOVED Requirements

### Requirement: VitePress 博客
**Reason**: 用户要求完整复刻模板网站，需要替换框架
**Migration**: 删除 `docs/` 目录和 VitePress 配置文件，使用 Next.js 项目结构