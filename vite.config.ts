import { defineConfig, searchForWorkspaceRoot } from "vite"
import react from "@vitejs/plugin-react"
import alias from "@rollup/plugin-alias"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        "/node_modules/@axe-core/react/"
      ]
    }
  },
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
