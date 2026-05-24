import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'E:/个人博客网站项目/tina/__generated__/.cache/1779622442951', url: 'https://content.tinajs.io/1.6/content/test/github/main', token: 'test', queries,  });
export default client;
  