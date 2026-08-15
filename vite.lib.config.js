import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-dts",
      closeBundle() {
        copyFileSync(
          resolve(root, "src/index.d.ts"),
          resolve(root, "dist/lib/soft-frosted-icons.d.ts")
        );
      },
    },
  ],
  publicDir: false,
  build: {
    outDir: "dist/lib",
    emptyOutDir: true,
    lib: {
      entry: resolve(root, "src/index.js"),
      name: "SoftFrostedIcons",
      formats: ["es"],
      fileName: () => "soft-frosted-icons.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: "soft-frosted-icons.[ext]",
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
});
