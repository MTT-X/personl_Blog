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
