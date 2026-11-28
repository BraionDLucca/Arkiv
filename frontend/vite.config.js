
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react()],

        server: {
            proxy: {
                "/auth/": {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                },
            },
        },

        test: {
            environment: "jsdom",
            globals: true,
            setupFiles: ["./src/test/setup.js"],
            css: true,
        },
    };
});
