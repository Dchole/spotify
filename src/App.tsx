import "@fontsource/nunito"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"
import "@/styles/global.css"

import { lazy, Suspense, useEffect, useState } from "react"
import { Route, Switch } from "react-router"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { useAuth } from "~/context/Auth"
import { useColorMode } from "~/context/ColorMode"
import Layout from "~/Layout"
import PageSpinner from "~/PageSpinner"
import PlaybackProvider from "~/context/Playback"
import Home from "#/Home"

const Track = lazy(() => import("#/Track"))
const Auth = lazy(() => import("#/Auth"))
const Album = lazy(() => import("#/Album"))
const Artist = lazy(() => import("#/Artist"))
const Library = lazy(() => import("#/Library"))
const Search = lazy(() => import("#/Search"))
const Playlist = lazy(() => import("#/Playlist"))
const InfoDialog = lazy(() => import("~/InfoDialog"))

const App = () => {
  const { token } = useAuth()
  const { theme } = useColorMode()
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    token && setShowDialog(true)
  }, [token])

  const handleClose = () => setShowDialog(false)

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <PlaybackProvider>
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
        </PlaybackProvider>
      </SnackbarProvider>
      <Suspense fallback={<div />}>
        <InfoDialog open={showDialog} handleClose={handleClose} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
