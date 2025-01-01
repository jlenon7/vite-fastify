import { defineConfig } from "vite";
import { Path } from "@athenna/common";
import PluginRestart from "vite-plugin-restart";

export default defineConfig({
  root: Path.pwd(),
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  build: {
    assetsDir: "",
    manifest: true,
    emptyOutDir: true,
    outDir: "public/assets",
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
      input: [
        Path.pwd("resources/css/app.scss"),
        Path.pwd("resources/js/app.js"),
      ],
    },
  },
  plugins: [PluginRestart({ reload: ["resources/views/**/*.edge"] })],
});
