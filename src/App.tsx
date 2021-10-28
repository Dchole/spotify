import "@fontsource/nunito"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"
import "@/styles/global.css"

import { lazy, Suspense, useEffect, useState } from "react"
import { Route, Switch } from "react-router"
import { CssBaseline, ThemeProvider } from "@mui/material"
import Layout from "~/Layout"
import Home from "#/Home"
import PageSpinner from "~/PageSpinner"
import SearchProvider from "~/context/SearchContext"
import AuthProvider from "~/context/AuthContext"
import PlaybackProvider from "~/context/Playback"
import { useColorMode } from "~/context/ColorMode"
import { SnackbarProvider } from "notistack"

const Track = lazy(() => import("#/Track"))
const Auth = lazy(() => import("#/Auth"))
const Album = lazy(() => import("#/Album"))
const Artist = lazy(() => import("#/Artist"))
const Library = lazy(() => import("#/Library"))
const Search = lazy(() => import("#/Search"))
const Playlist = lazy(() => import("#/Playlist"))
const InfoDialog = lazy(() => import("~/InfoDialog"))

const App = () => {
  const { theme } = useColorMode()
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowDialog(true), 10_000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setShowDialog(false)

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SnackbarProvider maxSnack={2}>
          <PlaybackProvider>
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
          </PlaybackProvider>
        </SnackbarProvider>
      </AuthProvider>
      <Suspense fallback={<div />}>
        <InfoDialog open={showDialog} handleClose={handleClose} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
