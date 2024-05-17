import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
      server: {
        proxy: {
          "/v1": "http://localhost:8800/api/",
        },
      },
    };
  } else {
    return {
      plugins: [react()],
      server: {
        proxy: {
          "/v1": "http://localhost:8800/api/",
        },
      },
    };
  }
});