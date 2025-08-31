import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    sourcemap: false, // disables sourcemap errors
    chunkSizeWarningLimit: 1000, // increase chunk warning limit (default: 500kb)

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          radix: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-progress",
            "@radix-ui/react-label",
          ],
          ui: ["sonner", "next-themes"],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["next-themes"], // avoids useless "use client" warnings
  },
});