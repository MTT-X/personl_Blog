// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "articles",
        label: "\u6587\u7AE0",
        path: "src/content/articles",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "\u6807\u9898", isTitle: true, required: true },
          { type: "datetime", name: "publishedAt", label: "\u53D1\u5E03\u65E5\u671F", required: true },
          { type: "string", name: "description", label: "\u6458\u8981", required: true, ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "\u6807\u7B7E", list: true },
          { type: "image", name: "image", label: "\u5C01\u9762\u56FE" },
          { type: "boolean", name: "draft", label: "\u8349\u7A3F" },
          { type: "number", name: "readingTime", label: "\u9605\u8BFB\u65F6\u957F\uFF08\u5206\u949F\uFF09" },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "journal",
        label: "\u65E5\u5FD7",
        path: "src/content/journal",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "\u6807\u9898", isTitle: true, required: true },
          { type: "datetime", name: "publishedAt", label: "\u65E5\u671F", required: true },
          { type: "string", name: "description", label: "\u6458\u8981", required: true, ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "\u6807\u7B7E", list: true },
          { type: "image", name: "image", label: "\u5C01\u9762\u56FE" },
          { type: "boolean", name: "draft", label: "\u8349\u7A3F" },
          { type: "image", name: "gallery", label: "\u56FE\u7247\u7EC4", list: true },
          { type: "string", name: "location", label: "\u5730\u70B9" },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "thoughts",
        label: "\u601D\u8003",
        path: "src/content/thoughts",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "\u6807\u9898\uFF08\u53EF\u9009\uFF09" },
          { type: "datetime", name: "publishedAt", label: "\u65E5\u671F", required: true },
          { type: "string", name: "tags", label: "\u6807\u7B7E", list: true },
          { type: "boolean", name: "draft", label: "\u8349\u7A3F" },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "projects",
        label: "\u9879\u76EE",
        path: "src/content/projects",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "\u9879\u76EE\u540D\u79F0", isTitle: true, required: true },
          { type: "datetime", name: "publishedAt", label: "\u65E5\u671F", required: true },
          { type: "string", name: "description", label: "\u7B80\u4ECB", required: true, ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "\u6807\u7B7E", list: true },
          { type: "image", name: "image", label: "\u5C01\u9762\u56FE" },
          { type: "boolean", name: "draft", label: "\u8349\u7A3F" },
          { type: "string", name: "url", label: "\u9879\u76EE\u94FE\u63A5" },
          { type: "string", name: "tech", label: "\u6280\u672F\u6808", list: true },
          { type: "boolean", name: "featured", label: "\u7CBE\u9009\u5C55\u793A" },
          { type: "rich-text", name: "body", label: "\u9879\u76EE\u4ECB\u7ECD", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
