import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    testTimeout: 1000 * 60,
  },
} as UserConfig);
