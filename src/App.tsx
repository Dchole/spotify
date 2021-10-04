import "@fontsource/nunito"

import { lazy, Suspense } from "react"
import { Route, Switch } from "react-router"
import { CssBaseline } from "@mui/material"
import Layout from "~/Layout"
import Home from "#/Home"

const Search = lazy(() => import("#/Search"))

const App = () => {
  return (
    <Layout>
      <CssBaseline />
      <Switch>
        <Suspense fallback={<div />}>
          <Route path="/" component={Home} exact />
          <Route path="/search" component={Search} />
        </Suspense>
      </Switch>
    </Layout>
  )
}

export default App
