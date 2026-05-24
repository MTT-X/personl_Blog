# 个人博客网站 (Astro + TinaCMS) 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建苹果极简风格的 Astro 静态博客，支持文章/日志/短思考/项目四种内容类型，集成 TinaCMS 可视化编辑，部署到 Vercel。

**Architecture:** Astro 5.x 静态站点 + Tailwind CSS 3.x 样式系统 + TinaCMS Git-based 内容管理。内容以 MDX/MD 文件存储在 `src/content/`，Astro Content Collections 做类型校验，Pagefind 提供静态搜索，Giscus 提供评论区。构建输出纯静态 HTML，部署到 Vercel。

**Tech Stack:** Astro 5.x, Tailwind CSS 3.x, TinaCMS, MDX, Pagefind, Giscus, ConvertKit, Vercel

---

## Task 1: 项目脚手架搭建

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/env.d.ts`
- Create: `.gitignore`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`

- [ ] **Step 1: 检查 Node.js 环境**

Run: `node --version && npm --version`
Expected: Node.js >= 18, npm >= 9

- [ ] **Step 2: 创建 package.json**

```json
{
  "name": "personal-blog",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build && npx pagefind --site dist",
    "preview": "astro preview",
    "astro": "astro",
    "tina": "tinacms dev -c \"astro dev\""
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/mdx": "^4.0.0",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/rss": "^4.0.0",
    "tailwindcss": "^3.4.0",
    "tinacms": "^2.0.0",
    "@tinacms/cli": "^1.6.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@giscus/react": "^3.0.0",
    "pagefind": "^1.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `cd "E:/个人博客网站项目" && npm install`

- [ ] **Step 4: 创建 astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [mdx(), tailwind()],
  site: 'https://your-domain.com',
  output: 'static',
});
```

- [ ] **Step 5: 创建 tailwind.config.mjs**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#FAFAFA',
          'bg-dark': '#0A0A0C',
          card: '#FFFFFF',
          'card-dark': '#1C1C1E',
          text: '#1D1D1F',
          'text-dark': '#F5F5F7',
          muted: '#6E6E73',
          'muted-dark': '#98989D',
          accent: '#0071E3',
          'accent-dark': '#2997FF',
          divider: '#E5E5EA',
          'divider-dark': '#2C2C2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      maxWidth: {
        prose: '720px',
        wide: '1200px',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: 创建 tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

- [ ] **Step 7: 创建 src/env.d.ts**

```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 8: 创建 src/styles/global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-apple-bg text-apple-text font-sans antialiased;
    @apply dark:bg-apple-bg-dark dark:text-apple-text-dark;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1 { @apply text-5xl font-light tracking-tight; }
  h2 { @apply text-3xl font-normal tracking-tight; }
  h3 { @apply text-xl font-medium; }
  p  { @apply leading-relaxed; }

  ::selection {
    @apply bg-apple-accent/20;
  }
}

@layer components {
  .prose {
    @apply max-w-prose mx-auto;
  }
  .wide {
    @apply max-w-wide mx-auto;
  }

  .card {
    @apply bg-apple-card rounded-card shadow-sm;
    @apply dark:bg-apple-card-dark dark:border dark:border-apple-divider-dark;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }
}
```

- [ ] **Step 9: 创建 public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#0071E3"/>
  <text x="50" y="68" font-size="50" text-anchor="middle" fill="white" font-family="serif">B</text>
</svg>
```

- [ ] **Step 10: 创建 public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap-index.xml
```

- [ ] **Step 11: 创建 .gitignore**

```
node_modules/
dist/
.tina/
.env
.env.local
```

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind and TinaCMS deps"
```

---

## Task 2: 内容 Schema 定义 (Content Collections)

**Files:**
- Create: `src/content/config.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: 创建 src/lib/utils.ts**

```typescript
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 300;
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  const words = text.split(/\s+/).length + chineseChars;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
```

- [ ] **Step 2: 创建 src/content/config.ts**

```typescript
import { defineCollection, z } from 'astro:content';

const baseSchema = {
  title: z.string(),
  publishedAt: z.date(),
  description: z.string(),
  tags: z.array(z.string()).optional().default([]),
  image: z.string().optional(),
  draft: z.boolean().default(false),
};

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseSchema,
    readingTime: z.number().optional(),
  }),
});

const journalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseSchema,
    gallery: z.array(z.string()).optional().default([]),
    location: z.string().optional(),
  }),
});

const thoughtsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().default(false),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseSchema,
    url: z.string().optional(),
    tech: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  articles: articlesCollection,
  journal: journalCollection,
  thoughts: thoughtsCollection,
  projects: projectsCollection,
};
```

- [ ] **Step 3: 创建示例内容文件用于验证**

Create `src/content/articles/hello-world.mdx`:

```mdx
---
title: Hello World
publishedAt: 2026-05-24
description: 第一篇文章
tags: [intro]
draft: false
---

## 欢迎来到我的博客

这是我的第一篇博客文章。
```

Create `src/content/thoughts/test-thought.md`:

```md
---
publishedAt: 2026-05-24
draft: false
---

今天天气真好，适合开始一个新项目。
```

Create `src/content/journal/test-journal.mdx`:

```mdx
---
title: 测试日志
publishedAt: 2026-05-24
description: 一篇测试日志
location: 上海
draft: false
---

今天拍了一些照片。
```

Create `src/content/projects/test-project.mdx`:

```mdx
---
title: 测试项目
publishedAt: 2026-05-24
description: 一个示例项目
tech: [Astro, Tailwind]
featured: true
draft: false
---

这是一个测试项目。
```

- [ ] **Step 4: 验证 content schema**

Run: `cd "E:/个人博客网站项目" && npx astro check`
Expected: 无类型错误

- [ ] **Step 5: Commit**

```bash
git add src/content/ src/lib/
git commit -m "feat: add content collections with Zod schemas"
```

---

## Task 3: 全局布局组件

**Files:**
- Create: `src/components/layout/BaseLayout.astro`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`

- [ ] **Step 1: 创建 BaseLayout.astro**

```astro
---
import Header from './Header.astro';
import Footer from './Footer.astro';
import SearchModal from '../search/SearchModal.astro';
import Lightbox from '../content/Lightbox.astro';

interface Props {
  title: string;
  description: string;
  containerClass?: 'prose' | 'wide';
}

const { title, description, containerClass = 'prose' } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <script is:inline>
      (function() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
  </head>
  <body>
    <Header />
    <main class={`${containerClass} px-6 lg:px-10 py-24`}>
      <slot />
    </main>
    <Footer />
    <SearchModal />
    <Lightbox />
  </body>
</html>
```

- [ ] **Step 2: 创建 Header.astro**

```astro
---
const navItems = [
  { label: '文章', href: '/articles' },
  { label: '日志', href: '/journal' },
  { label: '思考', href: '/thoughts' },
  { label: '项目', href: '/projects' },
  { label: '关于', href: '/about' },
];
---

<header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-apple-bg/80 dark:bg-apple-bg-dark/80 border-b border-apple-divider dark:border-apple-divider-dark">
  <nav class="max-w-wide mx-auto flex items-center justify-between h-14 px-6 lg:px-10">
    <a href="/" class="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity">
      Blog
    </a>

    <!-- Desktop nav -->
    <div class="hidden md:flex items-center gap-8">
      {navItems.map(item => (
        <a href={item.href} class="text-sm text-apple-muted dark:text-apple-muted-dark hover:text-apple-text dark:hover:text-apple-text-dark transition-colors duration-150">
          {item.label}
        </a>
      ))}

      <button id="search-trigger" class="text-apple-muted dark:text-apple-muted-dark hover:text-apple-text dark:hover:text-apple-text-dark transition-colors duration-150" aria-label="搜索">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" />
        </svg>
      </button>

      <button id="theme-toggle" class="text-apple-muted dark:text-apple-muted-dark hover:text-apple-text dark:hover:text-apple-text-dark transition-colors duration-150" aria-label="切换暗黑模式">
        <svg id="sun-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" class="hidden dark:block">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.5 2.5l1.5 1.5M12 12l1.5 1.5M2.5 13.5l1.5-1.5M12 4l1.5-1.5" />
        </svg>
        <svg id="moon-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" class="block dark:hidden">
          <path d="M6 2a6 6 0 1 0 8 8 4 4 0 0 1-8-8z" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu button -->
    <div class="md:hidden flex items-center gap-4">
      <button id="mobile-menu-btn" class="text-apple-muted" aria-label="菜单">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 5h12M3 9h12M3 13h12" />
        </svg>
      </button>
    </div>
  </nav>
</header>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

- [ ] **Step 3: 创建 Footer.astro**

```astro
<footer class="border-t border-apple-divider dark:border-apple-divider-dark">
  <div class="max-w-wide mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row justify-between gap-4">
    <p class="text-sm text-apple-muted dark:text-apple-muted-dark">
      &copy; {new Date().getFullYear()} My Blog. All rights reserved.
    </p>
    <div class="flex gap-6 text-sm text-apple-muted dark:text-apple-muted-dark">
      <a href="/rss.xml" class="hover:text-apple-text dark:hover:text-apple-text-dark transition-colors">RSS</a>
      <a href="https://github.com" class="hover:text-apple-text dark:hover:text-apple-text-dark transition-colors">GitHub</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: 验证布局渲染**

Run: `cd "E:/个人博客网站项目" && npx astro dev`
确认开发服务器启动正常。

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add BaseLayout, Header, and Footer components"
```

---

## Task 4: 内容卡片组件

**Files:**
- Create: `src/components/ui/TagBadge.astro`
- Create: `src/components/ui/ArticleCard.astro`
- Create: `src/components/ui/JournalCard.astro`
- Create: `src/components/ui/ThoughtCard.astro`
- Create: `src/components/ui/ProjectCard.astro`

- [ ] **Step 1: 创建 TagBadge.astro**

```astro
---
interface Props {
  tag: string;
  href?: string;
}

const { tag, href } = Astro.props;
const Tag = href ? 'a' : 'span';
---

<Tag
  {...(href ? { href } : {})}
  class="inline-block px-2.5 py-0.5 text-xs rounded-full bg-apple-divider dark:bg-apple-divider-dark text-apple-muted dark:text-apple-muted-dark hover:text-apple-accent dark:hover:text-apple-accent-dark transition-colors"
>
  {tag}
</Tag>
```

- [ ] **Step 2: 创建 ArticleCard.astro**

```astro
---
import { formatDate } from '../../lib/utils';
import TagBadge from './TagBadge.astro';

const { article } = Astro.props;
---

<article class="card overflow-hidden group cursor-pointer">
  <a href={`/articles/${article.slug}`} class="block p-8">
    <time class="text-xs text-apple-muted dark:text-apple-muted-dark">
      {formatDate(article.data.publishedAt)}
    </time>
    <h2 class="mt-2 text-2xl font-medium group-hover:text-apple-accent dark:group-hover:text-apple-accent-dark transition-colors duration-150">
      {article.data.title}
    </h2>
    <p class="mt-3 text-apple-muted dark:text-apple-muted-dark leading-relaxed">
      {article.data.description}
    </p>
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      {article.data.tags?.map((tag: string) => <TagBadge tag={tag} href={`/tags/${tag}`} />)}
      {article.data.readingTime && (
        <span class="text-xs text-apple-muted dark:text-apple-muted-dark ml-auto">
          {article.data.readingTime} 分钟阅读
        </span>
      )}
    </div>
  </a>
</article>
```

- [ ] **Step 3: 创建 JournalCard.astro**

```astro
---
import { formatDate } from '../../lib/utils';

const { entry } = Astro.props;
---

<article class="card overflow-hidden group cursor-pointer">
  <a href={`/journal/${entry.slug}`} class="block">
    {entry.data.image && (
      <div class="aspect-video overflow-hidden">
        <img
          src={entry.data.image}
          alt={entry.data.title}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    )}
    <div class="p-6">
      <div class="flex items-center gap-2 text-xs text-apple-muted dark:text-apple-muted-dark">
        <time>{formatDate(entry.data.publishedAt)}</time>
        {entry.data.location && (
          <>
            <span>&middot;</span>
            <span>{entry.data.location}</span>
          </>
        )}
      </div>
      <h2 class="mt-2 text-xl font-medium group-hover:text-apple-accent dark:group-hover:text-apple-accent-dark transition-colors duration-150">
        {entry.data.title}
      </h2>
    </div>
  </a>
</article>
```

- [ ] **Step 4: 创建 ThoughtCard.astro**

```astro
---
import { formatDate } from '../../lib/utils';

const { entry } = Astro.props;
---

<article class="card p-8 border-l-2 border-apple-accent dark:border-apple-accent-dark">
  <a href={`/thoughts/${entry.slug}`} class="block">
    <blockquote class="text-lg leading-relaxed italic text-apple-text dark:text-apple-text-dark">
      &ldquo;{entry.body.slice(0, 280)}{entry.body.length > 280 ? '...' : ''}&rdquo;
    </blockquote>
    <time class="mt-4 block text-xs text-apple-muted dark:text-apple-muted-dark">
      {formatDate(entry.data.publishedAt)}
    </time>
  </a>
</article>
```

- [ ] **Step 5: 创建 ProjectCard.astro**

```astro
---
import TagBadge from './TagBadge.astro';

const { project } = Astro.props;
---

<article class="card overflow-hidden group cursor-pointer">
  <a href={`/projects/${project.slug}`} class="block p-6">
    {project.data.image && (
      <div class="w-full h-40 overflow-hidden rounded-lg mb-4">
        <img
          src={project.data.image}
          alt={project.data.title}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    )}
    <h2 class="text-xl font-medium group-hover:text-apple-accent dark:group-hover:text-apple-accent-dark transition-colors duration-150">
      {project.data.title}
    </h2>
    <p class="mt-2 text-sm text-apple-muted dark:text-apple-muted-dark">
      {project.data.description}
    </p>
    {project.data.tech && project.data.tech.length > 0 && (
      <div class="mt-3 flex flex-wrap gap-1.5">
        {project.data.tech.map((t: string) => <TagBadge tag={t} />)}
      </div>
    )}
  </a>
</article>
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add card components for all content types"
```

---

## Task 5: 搜索弹窗 & 暗黑模式

**Files:**
- Create: `src/components/search/SearchModal.astro`

- [ ] **Step 1: 创建 SearchModal.astro**

```astro
<div id="search-modal" class="fixed inset-0 z-[100] hidden items-start justify-center pt-[15vh] bg-black/20 dark:bg-black/50 backdrop-blur-sm">
  <div class="w-full max-w-xl bg-apple-card dark:bg-apple-card-dark rounded-xl shadow-2xl border border-apple-divider dark:border-apple-divider-dark overflow-hidden">
    <!-- Search input -->
    <div class="flex items-center gap-3 px-4 border-b border-apple-divider dark:border-apple-divider-dark">
      <svg class="w-4 h-4 text-apple-muted shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        id="search-input"
        type="text"
        placeholder="搜索文章、日志、项目..."
        class="w-full py-3 text-sm bg-transparent border-none outline-none text-apple-text dark:text-apple-text-dark placeholder:text-apple-muted"
      />
      <kbd class="text-xs text-apple-muted bg-apple-divider dark:bg-apple-divider-dark px-1.5 py-0.5 rounded">ESC</kbd>
    </div>
    <!-- Results -->
    <div id="search-results" class="max-h-80 overflow-y-auto p-2 text-sm text-apple-muted">
      <p class="p-2">输入关键词开始搜索...</p>
    </div>
    <!-- Footer hints -->
    <div class="flex items-center gap-4 px-4 py-2 border-t border-apple-divider dark:border-apple-divider-dark text-xs text-apple-muted">
      <span>&uarr;&darr; 选择</span>
      <span>Enter 打开</span>
      <span>Esc 关闭</span>
    </div>
  </div>
</div>

<script>
  let pagefind: any = null;

  async function loadPagefind() {
    if (pagefind) return pagefind;
    pagefind = await import('/pagefind/pagefind.js');
    pagefind.options?.({});
    return pagefind;
  }

  const modal = document.getElementById('search-modal')!;
  const input = document.getElementById('search-input') as HTMLInputElement;
  const results = document.getElementById('search-results')!;

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    input.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    input.value = '';
    results.innerHTML = '<p class="p-2">输入关键词开始搜索...</p>';
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }
    if (e.key === 'Escape') closeModal();
  });

  document.getElementById('search-trigger')?.addEventListener('click', openModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  let debounceTimer: ReturnType<typeof setTimeout>;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const query = input.value.trim();
      if (!query) {
        results.innerHTML = '<p class="p-2">输入关键词开始搜索...</p>';
        return;
      }
      results.innerHTML = '<p class="p-2">搜索中...</p>';

      try {
        const pf = await loadPagefind();
        const searchResult = await pf.search(query);
        if (!searchResult || searchResult.results.length === 0) {
          results.innerHTML = '<p class="p-2">未找到结果</p>';
          return;
        }

        const html = (await Promise.all(
          searchResult.results.slice(0, 10).map(async (r: any) => {
            const data = await r.data();
            const type = data.meta?.type || 'page';
            const typeLabel: Record<string, string> = { articles: '文章', journal: '日志', thoughts: '思考', projects: '项目' };
            return `
              <a href="${data.url}" class="block px-3 py-2.5 rounded-lg hover:bg-apple-divider dark:hover:bg-apple-divider-dark transition-colors">
                <span class="text-xs text-apple-accent">${typeLabel[type] || ''}</span>
                <p class="text-apple-text dark:text-apple-text-dark font-medium mt-0.5">${data.meta?.title || r.id}</p>
              </a>
            `;
          })
        )).join('');

        results.innerHTML = html;
      } catch {
        results.innerHTML = '<p class="p-2">搜索功能暂不可用</p>';
      }
    }, 200);
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/search/
git commit -m "feat: add Pagefind search modal with keyboard shortcuts"
```

---

## Task 6: 首页（混合内容流）

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: 创建 src/pages/index.astro**

```astro
---
import BaseLayout from '../components/layout/BaseLayout.astro';
import ArticleCard from '../components/ui/ArticleCard.astro';
import JournalCard from '../components/ui/JournalCard.astro';
import ThoughtCard from '../components/ui/ThoughtCard.astro';
import ProjectCard from '../components/ui/ProjectCard.astro';
import { getCollection } from 'astro:content';

const articles = await getCollection('articles', ({ data }) => !data.draft);
const journal = await getCollection('journal', ({ data }) => !data.draft);
const thoughts = await getCollection('thoughts', ({ data }) => !data.draft);
const projects = await getCollection('projects', ({ data }) => !data.draft && data.featured);

const allEntries = [
  ...articles.map(e => ({ ...e, type: 'article' as const })),
  ...journal.map(e => ({ ...e, type: 'journal' as const })),
  ...thoughts.map(e => ({ ...e, type: 'thought' as const })),
  ...projects.map(e => ({ ...e, type: 'project' as const })),
].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<BaseLayout title="My Blog" description="个人博客 - 记录思考、分享生活" containerClass="prose">
  <section class="space-y-16">
    {allEntries.map((entry) => {
      switch (entry.type) {
        case 'article':
          return <ArticleCard article={entry} />;
        case 'journal':
          return <JournalCard entry={entry} />;
        case 'thought':
          return <ThoughtCard entry={entry} />;
        case 'project':
          return <ProjectCard project={entry} />;
      }
    })}

    {allEntries.length === 0 && (
      <div class="py-32 text-center">
        <p class="text-2xl font-light text-apple-muted">欢迎来到我的博客</p>
        <p class="mt-4 text-apple-muted dark:text-apple-muted-dark">内容正在路上...</p>
      </div>
    )}
  </section>
</BaseLayout>
```

- [ ] **Step 2: 验证首页渲染**

Run: `cd "E:/个人博客网站项目" && npx astro dev`
访问 `http://localhost:4321` 确认首页显示示例内容。

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add homepage with mixed content feed"
```

---

## Task 7: 文章列表页 & 详情页

**Files:**
- Create: `src/pages/articles/index.astro`
- Create: `src/pages/articles/[...slug].astro`

- [ ] **Step 1: 创建文章列表页 src/pages/articles/index.astro**

```astro
---
import BaseLayout from '../../../components/layout/BaseLayout.astro';
import ArticleCard from '../../../components/ui/ArticleCard.astro';
import { getCollection } from 'astro:content';

const allArticles = await getCollection('articles', ({ data }) => !data.draft);
const allTags = [...new Set(allArticles.flatMap(a => a.data.tags || []))].sort();
const selectedTag = Astro.url.searchParams.get('tag');

const articles = (selectedTag
  ? allArticles.filter(a => (a.data.tags || []).includes(selectedTag))
  : allArticles
).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<BaseLayout title="文章" description="长文技术文章" containerClass="prose">
  <h1 class="mb-4">文章</h1>
  <p class="text-apple-muted dark:text-apple-muted-dark mb-10">长文技术分享与深度思考</p>

  {allTags.length > 0 && (
    <div class="flex flex-wrap gap-2 mb-10">
      <a
        href="/articles"
        class={`inline-block px-3 py-1 text-xs rounded-full transition-colors ${
          !selectedTag
            ? 'bg-apple-accent text-white'
            : 'bg-apple-divider dark:bg-apple-divider-dark text-apple-muted dark:text-apple-muted-dark hover:text-apple-accent'
        }`}
      >
        全部
      </a>
      {allTags.map(tag => (
        <a
          href={`/articles?tag=${tag}`}
          class={`inline-block px-3 py-1 text-xs rounded-full transition-colors ${
            selectedTag === tag
              ? 'bg-apple-accent text-white'
              : 'bg-apple-divider dark:bg-apple-divider-dark text-apple-muted dark:text-apple-muted-dark hover:text-apple-accent'
          }`}
        >
          {tag}
        </a>
      ))}
    </div>
  )}

  <div class="space-y-8">
    {articles.map(article => <ArticleCard article={article} />)}
    {articles.length === 0 && (
      <p class="text-center text-apple-muted py-20">暂无文章</p>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 2: 创建文章详情页 src/pages/articles/[...slug].astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../components/layout/BaseLayout.astro';
import TagBadge from '../../components/ui/TagBadge.astro';
import SubscribeForm from '../../components/ui/SubscribeForm.astro';
import { formatDate, estimateReadingTime } from '../../lib/utils';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map(article => ({ params: { slug: article.slug } }));
}

const { slug } = Astro.params;
const article = (await getCollection('articles', ({ data }) => !data.draft))
  .find(a => a.slug === slug);

if (!article) {
  return Astro.redirect('/404');
}

const { Content } = await article.render();
const readingTime = article.data.readingTime || estimateReadingTime(article.body || '');
---

<BaseLayout title={article.data.title} description={article.data.description} containerClass="prose">
  <article>
    <header class="mb-12">
      <time class="text-sm text-apple-muted dark:text-apple-muted-dark">
        {formatDate(article.data.publishedAt)}
      </time>
      <h1 class="mt-3">{article.data.title}</h1>
      <div class="mt-4 flex items-center gap-3">
        {article.data.tags?.map((tag: string) => <TagBadge tag={tag} href={`/tags/${tag}`} />)}
        <span class="text-sm text-apple-muted dark:text-apple-muted-dark ml-auto">{readingTime} 分钟阅读</span>
      </div>
    </header>

    <div class="prose-lg leading-relaxed">
      <Content />
    </div>
  </article>

  <hr class="my-16 border-apple-divider dark:border-apple-divider-dark" />

  <div class="max-w-md mx-auto">
    <SubscribeForm />
  </div>

  <div class="mt-16" id="comments">
    <script is:inline src="https://giscus.app/client.js"
      data-repo="your-username/your-repo"
      data-repo-id="R_kgYOUR_REPO_ID"
      data-category="Announcements"
      data-category-id="DIC_kwYOUR_CATEGORY_ID"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="preferred_color_scheme"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async>
    </script>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/articles/
git commit -m "feat: add article list and detail pages"
```

---

## Task 8: 图文日志、短思考、项目页面

**Files:**
- Create: `src/pages/journal/index.astro`
- Create: `src/pages/journal/[...slug].astro`
- Create: `src/pages/thoughts/index.astro`
- Create: `src/pages/thoughts/[...slug].astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[...slug].astro`

- [ ] **Step 1: 创建日志列表页 src/pages/journal/index.astro**

```astro
---
import BaseLayout from '../../components/layout/BaseLayout.astro';
import JournalCard from '../../components/ui/JournalCard.astro';
import { getCollection } from 'astro:content';

const entries = (await getCollection('journal', ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<BaseLayout title="图文日志" description="旅行与摄影日志" containerClass="wide">
  <h1 class="mb-4">日志</h1>
  <p class="text-apple-muted dark:text-apple-muted-dark mb-10">用镜头记录的瞬间</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {entries.map(entry => <JournalCard {entry} />)}
    {entries.length === 0 && (
      <p class="col-span-full text-center text-apple-muted py-20">暂无日志</p>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 2: 创建日志详情页 src/pages/journal/[...slug].astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../components/layout/BaseLayout.astro';
import Gallery from '../../components/content/Gallery.astro';
import { formatDate } from '../../lib/utils';

export async function getStaticPaths() {
  const entries = await getCollection('journal', ({ data }) => !data.draft);
  return entries.map(e => ({ params: { slug: e.slug } }));
}

const { slug } = Astro.params;
const entry = (await getCollection('journal', ({ data }) => !data.draft))
  .find(e => e.slug === slug);

if (!entry) return Astro.redirect('/404');

const { Content } = await entry.render();
---

<BaseLayout title={entry.data.title} description={entry.data.description} containerClass="prose">
  <article>
    <header class="mb-12">
      <div class="flex items-center gap-2 text-sm text-apple-muted dark:text-apple-muted-dark">
        <time>{formatDate(entry.data.publishedAt)}</time>
        {entry.data.location && <><span>&middot;</span><span>{entry.data.location}</span></>}
      </div>
      <h1 class="mt-3">{entry.data.title}</h1>
    </header>

    {entry.data.gallery && entry.data.gallery.length > 0 && (
      <Gallery images={entry.data.gallery} />
    )}

    <div class="prose-lg leading-relaxed mt-12">
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: 创建思考列表页 src/pages/thoughts/index.astro**

```astro
---
import BaseLayout from '../../components/layout/BaseLayout.astro';
import ThoughtCard from '../../components/ui/ThoughtCard.astro';
import { getCollection } from 'astro:content';

const entries = (await getCollection('thoughts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<BaseLayout title="短思考" description="碎片化思考与灵感" containerClass="prose">
  <h1 class="mb-4">思考</h1>
  <p class="text-apple-muted dark:text-apple-muted-dark mb-10">一些不成熟的碎碎念</p>

  <div class="space-y-6">
    {entries.map(entry => <ThoughtCard {entry} />)}
    {entries.length === 0 && (
      <p class="text-center text-apple-muted py-20">还没有思考记录</p>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 4: 创建思考详情页 src/pages/thoughts/[...slug].astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../components/layout/BaseLayout.astro';
import { formatDate } from '../../lib/utils';

export async function getStaticPaths() {
  const entries = await getCollection('thoughts', ({ data }) => !data.draft);
  return entries.map(e => ({ params: { slug: e.slug } }));
}

const { slug } = Astro.params;
const entry = (await getCollection('thoughts', ({ data }) => !data.draft))
  .find(e => e.slug === slug);

if (!entry) return Astro.redirect('/404');
---

<BaseLayout title={entry.data.title || '思考'} description={entry.body.slice(0, 160)} containerClass="prose">
  <article class="py-20">
    <blockquote class="text-2xl leading-relaxed text-apple-text dark:text-apple-text-dark">
      {entry.body}
    </blockquote>
    <time class="mt-8 block text-sm text-apple-muted dark:text-apple-muted-dark">
      {formatDate(entry.data.publishedAt)}
    </time>
  </article>
</BaseLayout>
```

- [ ] **Step 5: 创建项目列表页 src/pages/projects/index.astro**

```astro
---
import BaseLayout from '../../components/layout/BaseLayout.astro';
import ProjectCard from '../../components/ui/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects', ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<BaseLayout title="项目" description="作品集" containerClass="wide">
  <h1 class="mb-4">项目</h1>
  <p class="text-apple-muted dark:text-apple-muted-dark mb-10">我做过的项目和作品</p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map(p => <ProjectCard project={p} />)}
    {projects.length === 0 && (
      <p class="col-span-full text-center text-apple-muted py-20">暂无项目</p>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 6: 创建项目详情页 src/pages/projects/[...slug].astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../components/layout/BaseLayout.astro';
import TagBadge from '../../components/ui/TagBadge.astro';

export async function getStaticPaths() {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return entries.map(e => ({ params: { slug: e.slug } }));
}

const { slug } = Astro.params;
const project = (await getCollection('projects', ({ data }) => !data.draft))
  .find(p => p.slug === slug);

if (!project) return Astro.redirect('/404');

const { Content } = await project.render();
---

<BaseLayout title={project.data.title} description={project.data.description} containerClass="prose">
  <article>
    <header class="mb-12">
      <h1>{project.data.title}</h1>
      <p class="mt-3 text-apple-muted dark:text-apple-muted-dark">{project.data.description}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        {project.data.tech?.map((t: string) => <TagBadge tag={t} />)}
      </div>
      {project.data.url && (
        <a href={project.data.url} target="_blank" rel="noopener noreferrer"
           class="inline-block mt-4 text-sm text-apple-accent hover:underline">
          访问项目 &rarr;
        </a>
      )}
    </header>

    <div class="prose-lg leading-relaxed">
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/journal/ src/pages/thoughts/ src/pages/projects/
git commit -m "feat: add journal, thoughts, and projects pages"
```

---

## Task 9: 关于页、标签聚合页 & 404 页

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/tags/[tag].astro`
- Create: `src/pages/404.astro`

- [ ] **Step 1: 创建 src/pages/about.astro**

```astro
---
import BaseLayout from '../components/layout/BaseLayout.astro';
---

<BaseLayout title="关于" description="关于我和这个博客" containerClass="prose">
  <section class="py-10">
    <h1>关于</h1>

    <div class="mt-10 space-y-6 leading-relaxed">
      <p class="text-lg">
        你好，欢迎来到我的博客。
      </p>
      <p>
        这里记录了我的技术思考、生活见闻和项目实践。喜欢简洁的设计和高质量的内容。
      </p>
      <p>
        如有任何问题或建议，欢迎通过 GitHub 联系我。
      </p>
    </div>

    <div class="mt-16">
      <h2 class="text-xl mb-4">联系方式</h2>
      <div class="flex gap-4 text-apple-accent">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:underline">GitHub</a>
        <a href="/rss.xml" class="hover:underline">RSS</a>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: 创建 src/pages/tags/[tag].astro**

```astro
---
import BaseLayout from '../../components/layout/BaseLayout.astro';
import ArticleCard from '../../components/ui/ArticleCard.astro';
import JournalCard from '../../components/ui/JournalCard.astro';
import ProjectCard from '../../components/ui/ProjectCard.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const journal = await getCollection('journal', ({ data }) => !data.draft);
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const allTags = new Set([
    ...articles.flatMap(a => a.data.tags || []),
    ...journal.flatMap(j => j.data.tags || []),
    ...projects.flatMap(p => p.data.tags || []),
  ]);
  return [...allTags].map(tag => ({ params: { tag } }));
}

const { tag } = Astro.params;

const articles = (await getCollection('articles', ({ data }) => !data.draft && (data.tags || []).includes(tag!)))
  .map(e => ({ ...e, type: 'article' as const }))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

const journal = (await getCollection('journal', ({ data }) => !data.draft && (data.tags || []).includes(tag!)))
  .map(e => ({ ...e, type: 'journal' as const }))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

const projects = (await getCollection('projects', ({ data }) => !data.draft && (data.tags || []).includes(tag!)))
  .map(e => ({ ...e, type: 'project' as const }))
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

const allEntries = [...articles, ...journal, ...projects]
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<BaseLayout title={`标签: ${tag}`} description={`查看所有标记为 ${tag} 的内容`} containerClass="prose">
  <h1 class="mb-2">#{tag}</h1>
  <p class="text-apple-muted dark:text-apple-muted-dark mb-10">{allEntries.length} 篇相关内容</p>

  <div class="space-y-8">
    {allEntries.map((entry) => {
      switch (entry.type) {
        case 'article': return <ArticleCard article={entry} />;
        case 'journal': return <JournalCard entry={entry} />;
        case 'project': return <ProjectCard project={entry} />;
      }
    })}
  </div>
</BaseLayout>
```

- [ ] **Step 3: 创建 src/pages/404.astro**

```astro
---
import BaseLayout from '../components/layout/BaseLayout.astro';
---

<BaseLayout title="404 Not Found" description="页面未找到" containerClass="prose">
  <div class="py-32 text-center">
    <h1 class="text-8xl font-light text-apple-divider dark:text-apple-divider-dark">404</h1>
    <p class="mt-4 text-apple-muted">页面不存在</p>
    <a href="/" class="inline-block mt-8 text-apple-accent hover:underline">返回首页</a>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/pages/tags/ src/pages/404.astro
git commit -m "feat: add about, tag aggregation, and 404 pages"
```

---

## Task 10: 图片画廊 & 订阅表单 & Lightbox

**Files:**
- Create: `src/components/content/Lightbox.astro`
- Create: `src/components/content/Gallery.astro`
- Create: `src/components/ui/SubscribeForm.astro`

- [ ] **Step 1: 创建 Lightbox.astro**

```astro
<dialog id="lightbox" class="fixed inset-0 z-[110] w-full h-full max-w-none max-h-none bg-black/95 backdrop:bg-black/95 open:flex items-center justify-center p-4">
  <div class="relative max-w-5xl w-full">
    <button id="lightbox-close" class="absolute -top-12 right-0 text-white/70 hover:text-white text-sm transition-colors" autofocus>
      关闭 (Esc)
    </button>
    <img id="lightbox-img" src="" alt="" class="w-full h-auto max-h-[80vh] object-contain" />
    <button id="lightbox-prev" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white text-2xl transition-colors">&larr;</button>
    <button id="lightbox-next" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white text-2xl transition-colors">&rarr;</button>
  </div>
</dialog>

<script>
  const dialog = document.getElementById('lightbox') as HTMLDialogElement;
  const img = document.getElementById('lightbox-img') as HTMLImageElement;
  let images: string[] = [];
  let currentIdx = 0;

  function showLightbox(imageUrls: string[], idx: number) {
    images = imageUrls;
    currentIdx = idx;
    updateImage();
    dialog.showModal();
  }

  function updateImage() {
    img.src = images[currentIdx];
  }

  function next() { currentIdx = (currentIdx + 1) % images.length; updateImage(); }
  function prev() { currentIdx = (currentIdx - 1 + images.length) % images.length; updateImage(); }

  document.getElementById('lightbox-close')?.addEventListener('click', () => dialog.close());
  document.getElementById('lightbox-next')?.addEventListener('click', next);
  document.getElementById('lightbox-prev')?.addEventListener('click', prev);

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dialog.close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  (window as any).showLightbox = showLightbox;
</script>
```

- [ ] **Step 2: 创建 Gallery.astro**

```astro
---
interface Props {
  images: string[];
}

const { images } = Astro.props;
---

<div class="gallery flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-4">
  {images.map((src, idx) => (
    <div class="snap-start shrink-0 w-4/5 md:w-3/5 lg:w-1/2 cursor-pointer">
      <img
        src={src}
        alt={`Gallery image ${idx + 1}`}
        class="w-full h-64 md:h-80 object-cover rounded-card shadow-sm"
        loading="lazy"
        onclick={`window.showLightbox(${JSON.stringify(images)}, ${idx})`}
      />
    </div>
  ))}
</div>

<style>
  .gallery {
    scrollbar-width: none;
  }
  .gallery::-webkit-scrollbar {
    display: none;
  }
</style>
```

- [ ] **Step 3: 创建 SubscribeForm.astro**

```astro
<div class="text-center p-8 card">
  <h3 class="text-lg font-medium">订阅更新</h3>
  <p class="mt-2 text-sm text-apple-muted dark:text-apple-muted-dark">收到新文章时邮件通知你</p>
  <form id="subscribe-form" class="mt-4 flex gap-2 max-w-sm mx-auto">
    <input
      type="email"
      name="email"
      placeholder="your@email.com"
      required
      class="flex-1 px-4 py-2 text-sm rounded-lg border border-apple-divider dark:border-apple-divider-dark bg-transparent text-apple-text dark:text-apple-text-dark placeholder:text-apple-muted outline-none focus:border-apple-accent transition-colors"
    />
    <button
      type="submit"
      class="px-5 py-2 text-sm font-medium text-white bg-apple-accent rounded-lg hover:bg-apple-accent/90 transition-colors"
    >
      订阅
    </button>
  </form>
  <p id="subscribe-message" class="mt-3 text-sm text-apple-accent hidden">订阅成功！</p>
</div>

<script>
  document.getElementById('subscribe-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get('email') as string;

    try {
      const res = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: 'YOUR_API_KEY', email }),
      });
      if (res.ok) {
        form.classList.add('hidden');
        document.getElementById('subscribe-message')?.classList.remove('hidden');
      }
    } catch {
      // Silent fail
    }
  });
</script>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/content/ src/components/ui/SubscribeForm.astro
git commit -m "feat: add gallery, lightbox, and subscribe form"
```

---

## Task 11: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.js`

- [ ] **Step 1: 创建 src/pages/rss.xml.js**

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const journal = await getCollection('journal', ({ data }) => !data.draft);
  const thoughts = await getCollection('thoughts', ({ data }) => !data.draft);
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  const allItems = [
    ...articles.map(a => ({ ...a, type: 'articles' })),
    ...journal.map(j => ({ ...j, type: 'journal' })),
    ...thoughts.map(t => ({ ...t, type: 'thoughts' })),
    ...projects.map(p => ({ ...p, type: 'projects' })),
  ].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: 'My Blog',
    description: '个人博客 - 记录思考、分享生活',
    site: context.site || 'https://your-domain.com',
    items: allItems.map(entry => ({
      title: entry.data.title || entry.body?.slice(0, 50) || '无标题',
      description: entry.data.description || entry.body?.slice(0, 200) || '',
      pubDate: entry.data.publishedAt,
      link: `/${entry.type}/${entry.slug}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/rss.xml.js
git commit -m "feat: add RSS feed"
```

---

## Task 12: TinaCMS 配置 & Admin 路由

**Files:**
- Create: `tina/config.ts`

- [ ] **Step 1: 创建 tina/config.ts**

```typescript
import { defineConfig } from 'tinacms';

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'articles',
        label: '文章',
        path: 'src/content/articles',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: '标题', isTitle: true, required: true },
          { type: 'datetime', name: 'publishedAt', label: '发布日期', required: true },
          { type: 'string', name: 'description', label: '摘要', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'tags', label: '标签', list: true },
          { type: 'image', name: 'image', label: '封面图' },
          { type: 'boolean', name: 'draft', label: '草稿' },
          { type: 'number', name: 'readingTime', label: '阅读时长（分钟）' },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },
      {
        name: 'journal',
        label: '日志',
        path: 'src/content/journal',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: '标题', isTitle: true, required: true },
          { type: 'datetime', name: 'publishedAt', label: '日期', required: true },
          { type: 'string', name: 'description', label: '摘要', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'tags', label: '标签', list: true },
          { type: 'image', name: 'image', label: '封面图' },
          { type: 'boolean', name: 'draft', label: '草稿' },
          { type: 'image', name: 'gallery', label: '图片组', list: true },
          { type: 'string', name: 'location', label: '地点' },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },
      {
        name: 'thoughts',
        label: '思考',
        path: 'src/content/thoughts',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: '标题（可选）' },
          { type: 'datetime', name: 'publishedAt', label: '日期', required: true },
          { type: 'string', name: 'tags', label: '标签', list: true },
          { type: 'boolean', name: 'draft', label: '草稿' },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },
      {
        name: 'projects',
        label: '项目',
        path: 'src/content/projects',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: '项目名称', isTitle: true, required: true },
          { type: 'datetime', name: 'publishedAt', label: '日期', required: true },
          { type: 'string', name: 'description', label: '简介', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'tags', label: '标签', list: true },
          { type: 'image', name: 'image', label: '封面图' },
          { type: 'boolean', name: 'draft', label: '草稿' },
          { type: 'string', name: 'url', label: '项目链接' },
          { type: 'string', name: 'tech', label: '技术栈', list: true },
          { type: 'boolean', name: 'featured', label: '精选展示' },
          { type: 'rich-text', name: 'body', label: '项目介绍', isBody: true },
        ],
      },
    ],
  },
});
```

- [ ] **Step 2: 初始化 TinaCMS**

Run: `cd "E:/个人博客网站项目" && npx @tinacms/cli init`

根据提示完成初始化，确认生成 admin 页面。

- [ ] **Step 3: Commit**

```bash
git add tina/
git commit -m "feat: configure TinaCMS collections and admin route"
```

---

## Task 13: 构建验证与部署

**Files:**
- Modify: `package.json` (build script 确认)
- Create: `vercel.json` (可选)

- [ ] **Step 1: 确认 build 脚本**

`package.json` 中的 build 脚本应为：

```json
"build": "astro check && astro build && npx pagefind --site dist"
```

- [ ] **Step 2: 运行完整构建**

Run: `cd "E:/个人博客网站项目" && npm run build`
Expected: astro check 通过 → astro build 成功 → Pagefind 索引生成

- [ ] **Step 3: 本地预览验证**

Run: `cd "E:/个人博客网站项目" && npx astro preview`
在浏览器中验证：
- 首页内容混排显示
- 四种内容列表和详情页正常
- 暗黑模式切换正常
- 搜索模态框弹出
- 关于页和标签聚合页正常
- 404 页显示

- [ ] **Step 4: 初始化 Git 仓库**

Run:
```bash
cd "E:/个人博客网站项目"
git init
git add -A
git commit -m "feat: complete personal blog implementation"
```

- [ ] **Step 5: 创建 GitHub 仓库并推送**

如果有 `gh` CLI:
```bash
gh repo create personal-blog --public --source=. --remote=origin --push
```

否则手动创建后：
```bash
git remote add origin https://github.com/<username>/personal-blog.git
git push -u origin main
```

- [ ] **Step 6: 部署到 Vercel**

1. 访问 [vercel.com](https://vercel.com)，GitHub 登录
2. New Project → 选择 `personal-blog` 仓库
3. Vercel 自动识别 Astro，直接 Deploy
4. 设置自定义域名（可选）

- [ ] **Step 7: 配置 Tina Cloud（生产环境）**

1. 访问 [app.tina.io](https://app.tina.io) 注册
2. 创建项目，连接 GitHub 仓库
3. 在 Vercel Dashboard 添加环境变量：
   - `TINA_CLIENT_ID` = Tina Cloud 提供的 Client ID
   - `TINA_TOKEN` = Tina Cloud 提供的 Token

- [ ] **Step 8: 验证线上博客**

访问 Vercel 域名，确认所有页面正常。访问 `/admin` 确认 TinaCMS 可用。

- [ ] **Step 9: Final commit (if any final tweaks)**

```bash
git add -A
git commit -m "chore: final deployment configuration"
git push
```
