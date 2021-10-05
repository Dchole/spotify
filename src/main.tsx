import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

if (import.meta.env.PROD) {
  import("@axe-core/react").then(axe => {
    axe.default(React, ReactDOM, 1000)
  })
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
