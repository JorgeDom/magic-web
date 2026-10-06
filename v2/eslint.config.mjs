import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  globalIgnores(["out/**", ".astro/**", ".wrangler/**", "node_modules/**"]),
]);
