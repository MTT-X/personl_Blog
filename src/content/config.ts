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
