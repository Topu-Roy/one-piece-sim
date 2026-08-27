// @ts-check

import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  { ignores: ["dist/", ".astro/", "node_modules/"] },

  { extends: [eslintConfigPrettier] },

  {
    files: ["**/*.{js,ts}"],
    extends: [js.configs.recommended, tseslint.configs.strict],
  },

  {
    files: ["**/*.astro"],
    extends: [eslintPluginAstro.configs.recommended],
    rules: {
      "astro/no-set-html-directive": "error",
      "astro/no-unsafe-inline-scripts": "error",
      "astro/no-set-text-directive": "error",
      "astro/no-unused-css-selector": "error",
      "astro/prefer-class-list-directive": "error",
      "astro/prefer-object-class-list": "error",
      "astro/prefer-split-class-list": "error",
      "astro/sort-attributes": "error",
    },
  },

  {
    files: ["**/*.svelte", "**/*.svelte.js", "**/*.svelte.ts"],
    extends: [svelte.configs.recommended],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
]);
