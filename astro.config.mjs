import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
  ],
  vite: {
    ssr: {
      noExternal: ["carbon-icons-svelte", "firebase"],
    },
  },
});
