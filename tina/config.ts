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
