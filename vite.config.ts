import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // stop generating sourcemaps

    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore "use client" and sourcemap errors
        if (
          warning.message.includes('"use client"') ||
          warning.message.includes("sourcemap") ||
          warning.message.includes("Generated an empty chunk")
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["next-themes"], // avoids useless "use client" warnings
  },
});
