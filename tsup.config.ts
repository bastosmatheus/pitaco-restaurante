import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["frontend/src/scripts/index.ts", "frontend/src/scripts/inputs.ts"],
  target: "es2020",
  watch: true,
  outDir: "frontend/dist",
  format: "esm",
});
