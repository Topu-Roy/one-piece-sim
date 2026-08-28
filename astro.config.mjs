// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  // Required by @astrojs/sitemap; replaced with the real domain at deploy time.
  site: "https://anime-draft.example",
  integrations: [svelte(), sitemap(), partytown()],

  vite: {
    plugins: [tailwindcss()],
  },
});
