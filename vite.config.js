import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	base: "",
	build: {
		target: "es2017",
		cssCodeSplit: true,
		assetsDir: "assets",
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
					// lottie-react is deliberately absent: listing it here would force it
					// into this eager chunk and undo Hero's lazy import.
					vendor: ["aos", "react-bootstrap", "react-icons"],
				},
				assetFileNames: "assets/[name]-[hash][extname]",
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
			},
		},
		chunkSizeWarningLimit: 600,
	},
});
