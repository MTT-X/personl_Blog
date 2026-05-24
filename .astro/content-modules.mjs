
export default new Map([
["src/content/articles/hello-world.mdx", () => import("astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Farticles%2Fhello-world.mdx&astroContentModuleFlag=true")],
["src/content/journal/test-journal.mdx", () => import("astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fjournal%2Ftest-journal.mdx&astroContentModuleFlag=true")],
["src/content/projects/test-project.mdx", () => import("astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fprojects%2Ftest-project.mdx&astroContentModuleFlag=true")]]);
		