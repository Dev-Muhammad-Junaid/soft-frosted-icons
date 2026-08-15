import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project Pages: https://dev-muhammad-junaid.github.io/soft-frosted-icons/
export default defineConfig({
  base: "/soft-frosted-icons/",
  plugins: [react()],
});
