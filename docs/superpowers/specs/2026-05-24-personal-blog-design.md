# 个人博客网站设计文档

**日期：** 2026-05-24
**状态：** 已确认
**技术栈：** Astro 5.x + TinaCMS + Tailwind CSS 4.x

---

## 1. 项目概述

苹果风格极简个人博客，支持四种内容类型：长文技术文章、图文日志、短思考/微博客、项目展示。通过 TinaCMS 提供可视化在线编辑，Vercel 自动部署。

### 设计关键词

- 苹果美学：大量留白、精致字体、克制动效
- 内容优先：排版为阅读服务，减少视觉噪音
- 性能极致：默认零 JS，仅交互部分按需加载

---

## 2. 技术栈

| 层级 | 选型 | 理由 |
|------|------|------|
| 框架 | Astro 5.x | 静态生成，零 JS 默认输出，文件即路由 |
| CMS | TinaCMS | 可视化编辑页面，Git 后端，实时预览 |
| 内容格式 | MDX | Markdown 内嵌组件，图文混排灵活 |
| 样式 | Tailwind CSS 4.x | 高度定制化，符合苹果风精度要求 |
| 字体 | Inter + 系统中文字体栈 | 兼顾设计与性能 |
| 搜索 | Pagefind | 纯静态搜索索引，零运行时依赖 |
| 评论区 | Giscus | GitHub Discussions 驱动，免费无广告 |
| 图片优化 | astro:assets | 自动 WebP/AVIF + 响应式 srcset |
| 邮件订阅 | ConvertKit 或 Buttondown | 免费额度满足个人使用 |
| 部署 | Vercel | Git 联动，自动构建，免费 SSL |

---

## 3. 内容模型

### 3.1 通用字段（四种内容类型共有）

| 字段 | 类型 | 必填 | 说明 |
|------|------|:---:|------|
| title | string | 是 | 标题 |
| slug | string | 是 | URL 别名，由标题自动生成 |
| publishedAt | date | 是 | 发布日期 |
| description | string | 是 | 摘要/副标题 |
| tags | string[] | 否 | 标签列表 |
| image | image | 否 | 封面图 |
| draft | boolean | 是 | 草稿状态，true 时生产环境不展示 |

### 3.2 各类型特有字段

**articles（长文文章）**

| 字段 | 类型 | 必填 | 说明 |
|------|------|:---:|------|
| readingTime | number | 否 | 阅读时长（分钟），可自动计算 |
| body | MDX | 是 | 正文 |

**journal（图文日志）**

| 字段 | 类型 | 必填 | 说明 |
|------|------|:---:|------|
| gallery | image[] | 否 | 图片组 |
| location | string | 否 | 地点 |
| body | MDX | 是 | 正文 |

**thoughts（短思考）**

| 字段 | 类型 | 必填 | 说明 |
|------|------|:---:|------|
| body | text | 是 | 纯文本，无 Markdown |

**projects（项目展示）**

| 字段 | 类型 | 必填 | 说明 |
|------|------|:---:|------|
| url | string | 否 | 项目链接 |
| tech | string[] | 否 | 技术栈标签 |
| featured | boolean | 是 | 是否在首页精选展示 |
| body | MDX | 是 | 项目介绍 |

---

## 4. 目录结构

```
/
├── public/
│   ├── images/           # 用户上传的图片（TinaCMS 管理）
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── content/
│   │   ├── articles/     # 长文文章（MDX）
│   │   ├── journal/      # 图文日志（MDX）
│   │   ├── thoughts/     # 短思考（MD）
│   │   └── projects/     # 项目展示（MDX）
│   ├── pages/
│   │   ├── index.astro           # 首页（混合内容流）
│   │   ├── articles/
│   │   │   ├── index.astro       # 文章列表（支持标签筛选）
│   │   │   └── [...slug].astro   # 文章详情
│   │   ├── journal/
│   │   │   ├── index.astro       # 图文日志列表
│   │   │   └── [...slug].astro   # 日志详情
│   │   ├── thoughts/
│   │   │   ├── index.astro       # 短思考时间线
│   │   │   └── [...slug].astro   # 短思考详情
│   │   ├── projects/
│   │   │   ├── index.astro       # 项目画廊
│   │   │   └── [...slug].astro   # 项目详情
│   │   ├── about.astro           # 关于页
│   │   ├── tags/
│   │   │   └── [tag].astro       # 标签聚合页
│   │   └── rss.xml.js            # RSS 源
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro   # 全局布局（Header + Footer）
│   │   │   ├── Header.astro       # 顶部导航（毛玻璃固定）
│   │   │   └── Footer.astro       # 页脚
│   │   ├── ui/
│   │   │   ├── ArticleCard.astro
│   │   │   ├── JournalCard.astro
│   │   │   ├── ThoughtCard.astro
│   │   │   ├── ProjectCard.astro
│   │   │   ├── TagBadge.astro
│   │   │   ├── ThemeToggle.astro
│   │   │   └── SubscribeForm.astro
│   │   ├── content/
│   │   │   ├── Lightbox.astro     # 图片放大组件
│   │   │   └── Gallery.astro      # 图片轮播
│   │   └── search/
│   │       └── SearchModal.astro  # 搜索弹窗
│   ├── lib/
│   │   └── utils.ts
│   └── styles/
│       └── global.css             # Tailwind 入口 + 全局样式
├── tina/
│   ├── config.ts                  # TinaCMS 集合定义
│   └── ...
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 5. 页面结构与导航

### 5.1 全局布局

```
┌──────────────────────────────────┐
│  Header（固定，毛玻璃 backdrop-blur）│
│  [logo]  ·  nav   ·   [搜索] [暗黑]  │
├──────────────────────────────────┤
│                                  │
│          Page Content            │
│   最大宽度：720px（文章/思考）        │
│   最大宽度：1200px（画廊/日志）       │
│                                  │
├──────────────────────────────────┤
│  Footer                          │
│  RSS · 订阅 · GitHub · ...       │
└──────────────────────────────────┘
```

### 5.2 导航项

| 导航项 | 路径 | 布局特点 |
|--------|------|----------|
| 首页 | `/` | 内容混排流 |
| 文章 | `/articles` | 列表 + 标签筛选 |
| 日志 | `/journal` | 图片卡片瀑布流 |
| 思考 | `/thoughts` | 纯文字时间线 |
| 项目 | `/projects` | 网格布局 |
| 关于 | `/about` | 单页介绍 |

### 5.3 首页设计

四类内容按时间倒序混排，不同类型使用不同卡片：

- **文章** → 标题 + 摘要 + 阅读时长 + 标签
- **图文日志** → 封面图占主体 + 标题 + 地点
- **短思考** → 引号风格纯文字，展示全文
- **项目** → 小缩略图 + 标题 + 技术栈标签

---

## 6. 视觉设计系统

### 6.1 配色

```
浅色模式                    暗黑模式
━━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━
背景    #FAFAFA            背景    #0A0A0C
卡片    #FFFFFF            卡片    #1C1C1E
主文字  #1D1D1F            主文字  #F5F5F7
辅文字  #6E6E73            辅文字  #98989D
强调色  #0071E3（蓝）       强调色  #2997FF
分隔线  #E5E5EA            分隔线  #2C2C2E
```

### 6.2 字体排印

- **中文**：系统字体栈（苹方/微软雅黑），不加载额外字体
- **英文 & 标题**：Inter（Google Fonts，子集化，首屏 ≤ 30KB）
- **字号**：基于 Tailwind 比例尺，rem 单位

| 层级 | 字号 | 字重 |
|------|------|------|
| h1 | 3rem / 48px | light (300) |
| h2 | 2rem / 32px | normal (400) |
| h3 | 1.25rem / 20px | medium (500) |
| body | 1rem / 16px | normal (400) |
| small | 0.875rem / 14px | normal (400) |

### 6.3 间距体系

- 基础单位：4px
- 段落间距：24px
- 模块间距：64px
- 页面水平边距：24px（移动端）/ 40px（桌面端）

### 6.4 动效规范

- 缓动函数：`cubic-bezier(0.4, 0, 0.2, 1)`（标准缓出）
- hover 过渡：150ms
- 页面切换：300ms
- 暗黑模式切换：CSS transition 平滑过渡颜色
- 滚动：`scroll-behavior: smooth`

### 6.5 卡片风格

- 无边框，浅阴影（`box-shadow` 透明度 ≤ 8%）
- 圆角：12-16px
- 图片占视觉重心，文字信息克制
- 暗黑模式下阴影几乎不可见，靠微弱边框区分

---

## 7. 交互功能

### 7.1 暗黑模式

- 默认跟随 `prefers-color-scheme`
- 顶栏切换按钮，状态存 `localStorage`
- Tailwind `class` 策略（`<html class="dark">`）
- `<head>` 内联 script 提前设 class，避免闪烁

### 7.2 全文搜索

- Pagefind 构建时生成索引
- ⌘K / Ctrl+K 唤醒搜索弹窗
- 结果按内容类型分组，键盘导航（↑↓ 选择，Enter 跳转，Esc 关闭）

### 7.3 图片画廊

- 图文日志内嵌轮播（CSS scroll-snap）
- 点击放大使用 `<dialog>` + CSS View Transitions
- 键盘操作：← → 切换，Esc 关闭
- 所有图片经 astro:assets 优化，格式 WebP/AVIF

### 7.4 邮件订阅

- ConvertKit 或 Buttondown 表单
- 首页底部 + 文章底部嵌入
- 客户端 JS Island 提交，无需后端

### 7.5 评论

- Giscus（GitHub Discussions 驱动）
- 每篇文章底部 React Island 加载
- Session 存主题偏好，和页面暗黑模式同步

### 7.6 TinaCMS 编辑入口

- `/admin` 路由，TinaCMS 可视化编辑面板
- 本地开发：`tinacms dev -c "astro dev"`
- 生产环境：Tina Cloud OAuth → GitHub → commit → Vercel 自动部署

---

## 8. 数据流

```
用户浏览器             Tina Cloud            GitHub
──────────            ──────────            ──────
/admin
  │
  ├─ 加载 Tina ──────→ OAuth 认证 ──────────→ 读取仓库内容
  │   编辑界面
  │   实时预览          (Git 代理)
  │      │
  │   保存 ──────────→ Tina Cloud ──────────→ commit + push
  │                                             │
  │                                     Vercel 检测 push
  │                                          │
  │                                     ←─── 自动构建部署
```

- **开发环境**：Tina Local，直接读写本地文件
- **生产环境**：Tina Cloud，通过 OAuth 授权 GitHub，保存即 commit

---

## 9. 测试

| 类型 | 工具 | 覆盖内容 |
|------|------|----------|
| 内容校验 | Astro Content Collections + Zod | frontmatter 字段类型、必填项 |
| 类型检查 | `astro check` | TypeScript 类型 |
| 构建验证 | `astro build` | 确保无构建错误 |

静态博客逻辑少，不写全量单元测试。内容 schema 校验 + 类型检查 + 构建成功等于质量保障。

---

## 10. 性能目标

| 指标 | 目标值 |
|------|--------|
| Lighthouse Performance | ≥ 95 |
| FCP（首次内容绘制） | < 1.5s |
| 自研 JS 体积 | < 50KB（不含 Giscus 等第三方） |
| 图片格式 | WebP 优先，AVIF 兼容 |
| 字体加载策略 | `font-display: swap` + 子集化 |

---

## 11. 部署

- **平台**：Vercel
- **流程**：GitHub 仓库连接 → `astro build` → Vercel 自动识别 Astro → 部署 `dist/`
- **自定义域名**：Vercel Dashboard 配置，自动 SSL
- **触发条件**：每次 `git push`，包括 TinaCMS 的保存 commit
- **环境变量**：`TINA_CLIENT_ID`、`TINA_TOKEN`（生产环境 Tina Cloud 所需）
