import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import alias from "@rollup/plugin-alias"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: {
        "@": "/src",
        "#": "/src/pages",
        "~": "/src/components"
      }
    })
  ]
})
