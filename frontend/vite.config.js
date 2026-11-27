
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    server: {
        proxy: {
            "/auth": {
                target: "http://127.0.0.1:5000",
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
});
