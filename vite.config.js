import { defineConfig } from "vite";
import dayjs from "dayjs";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 8008,
    open: true,
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:3000",
    //       // target: "http://admin.youah.cc:3000",
    //       changeOrigin: true,
    //       pathRewrite: { "^/api": "/" },
    //     },
    //   },
  },

  // 定义全局常量替换方式,其中每项在开发环境下会被定义在全局，而在构建时被静态替换
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
});
