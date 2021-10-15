import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import ColorModeProvider from "~/context/ColorMode"
import { client as rqClient } from "@/lib/query-client"
import { QueryClientProvider } from "react-query"

if (!import.meta.env.PROD) {
  import("@axe-core/react").then(axe => {
    axe.default(React, ReactDOM, 1000)
  })
}

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={rqClient}>
        <ApolloProvider client={client}>
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
