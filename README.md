# 澳门美食指南

一个基于 VitePress 构建的澳门美食博客网站，介绍澳门的各种美食，从葡国菜到粤式点心，从街头小吃到米其林餐厅。

## 🚀 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm（或 yarn、pnpm）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看网站。

### 构建生产版本

```bash
npm run docs:build
```

构建产物将输出到 `docs/.vitepress/dist` 目录。

### 预览生产版本

```bash
npm run docs:preview
```

## 📁 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # VitePress 配置文件
│   │   └── theme/
│   │       └── index.ts       # 主题配置
│   ├── public/                # 静态资源
│   │   └── logo.svg
│   ├── food/                  # 美食分类页面
│   │   ├── portuguese.md      # 葡国菜
│   │   ├── dim-sum.md         # 粤式点心
│   │   ├── street-food.md     # 街头小吃
│   │   └── desserts.md        # 甜品糕点
│   ├── index.md               # 首页
│   ├── map.md                 # 美食地图
│   └── about.md               # 关于我们
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages 自动部署
├── .gitignore
├── package.json
└── README.md
```

## 🍜 美食分类

- **葡国菜**：马介休球、葡式蛋挞、非洲鸡、葡国鸡
- **粤式点心**：虾饺、烧卖、肠粉、叉烧包
- **街头小吃**：猪扒包、杏仁饼、肉干、牛杂
- **甜品糕点**：木糠布甸、双皮奶、大菜糕、凤凰卷

## 🚀 部署到 GitHub Pages

本项目已配置好 GitHub Actions 自动部署工作流。

### 部署步骤

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. 在仓库设置中，将 Pages 的 Source 设置为 "GitHub Actions"
3. 等待 Actions 自动构建和部署
4. 访问 `https://mcgd369.github.io` 查看网站

### 手动部署

也可以手动构建后部署：

```bash
npm run docs:build
```

将 `docs/.vitepress/dist` 目录的内容部署到任何静态托管服务。

## ✨ 特性

- 📱 响应式设计，完美适配移动端
- 🔍 内置全文搜索
- 🌙 深色模式支持
- 📖 Markdown 驱动，易于写作
- 🚀 极速加载体验
- 📊 页面导航目录
- 📝 最后更新时间显示

## 📝 写作指南

### 添加新的美食分类

在 `docs/food/` 目录下创建新的 Markdown 文件即可。

### 添加新页面

在 `docs/` 目录下创建 Markdown 文件，并在 `docs/.vitepress/config.ts` 的 `nav` 配置中添加导航链接。

### 图片资源

将图片放在 `docs/public/` 目录下，在 Markdown 中使用绝对路径引用，如 `/image.jpg`。

## 📄 开源协议

MIT License
