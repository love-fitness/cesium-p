import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入自动导入
import AutoImport from "unplugin-auto-import/vite";
// 自动导入UI组件
import Components from "unplugin-vue-components/vite";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			// 不在需要导入ref，reactive等
			imports: ["vue", "vue-router"],
			// 存放的位置
			dts: "src/auto-import.d.ts",
		}),
		Components({
			// 引入组件的信息存放位置
			dts: "src/components.d.ts",
		}),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	envDir: './env',
	server: {
		host: '0.0.0.0',
		port: 6768,
		open: true,
		base: './',
		strictPort: true
		// proxy: {
		//   '^/Application': {
		//     target: 'http://192.168.0.76:6789',
		//     changeOrigin: true,
		//     rewrite: (t) => t.replace(/^\/Application/, '')
		//   }
		// }
	}
});
