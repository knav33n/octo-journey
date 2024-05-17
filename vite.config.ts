import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/v1": "http://3.77.150.166:8800/api/",
      },
    },
  };
});
