import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "react-query"
import { client } from "./lib/query-client"

if (!import.meta.env.PROD) {
  import("@axe-core/react").then(axe => {
    axe.default(React, ReactDOM, 1000)
  })
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
