import "@fontsource/nunito"

import { lazy, Suspense } from "react"
import { Route, Switch } from "react-router"
import { CssBaseline, ThemeProvider } from "@mui/material"

import Layout from "~/Layout"
import Home from "#/Home"
import PageSpinner from "~/PageSpinner"
import SearchProvider from "~/context/SearchContext"
import AuthProvider from "~/context/AuthContext"
import { useColorMode } from "~/context/ColorMode"

const Track = lazy(() => import("#/Track"))
const Auth = lazy(() => import("#/Auth"))
const Album = lazy(() => import("#/Album"))
const Artist = lazy(() => import("#/Artist"))
const Library = lazy(() => import("#/Library"))
const Search = lazy(() => import("#/Search"))
const Playlist = lazy(() => import("#/Playlist"))

const App = () => {
  const { theme } = useColorMode()

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SearchProvider>
          <Layout>
            <CssBaseline />
            <Suspense fallback={<PageSpinner />}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/auth" component={Auth} />
                <Route path="/search" component={Search} />
                <Route path="/library" component={Library} />
                <Route path="/tracks/:id" component={Track} />
                <Route path="/albums/:id" component={Album} />
                <Route path="/artists/:id" component={Artist} />
                <Route path="/playlists/:id" component={Playlist} />
              </Switch>
            </Suspense>
          </Layout>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
