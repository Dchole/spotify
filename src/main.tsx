import { ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { theme } from "./lib/theme"

if (import.meta.env.PROD) {
  import("@axe-core/react").then(axe => {
    axe.default(React, ReactDOM, 1000)
  })
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
