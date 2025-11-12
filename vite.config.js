import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	base: "./", // ✅ crucial for relative paths
	publicDir: "public", // ✅ ensures all images/videos in /public are copied
	build: {
		outDir: "dist",
	},
});
