import "@fontsource/nunito"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"
import "@/styles/global.css"

import { lazy, Suspense, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
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
const InfoDialog = lazy(() => import("~/Dialogs/Info"))

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
          <CssBaseline />
          <Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route path="/*" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="auth" element={<Auth />} />
                <Route path="search" element={<Search />} />
                <Route path="library" element={<Library />} />
                <Route path="tracks/:id" element={<Track />} />
                <Route path="albums/:id" element={<Album />} />
                <Route path="artists/:id" element={<Artist />} />
                <Route path="playlists/:id" element={<Playlist />} />
              </Route>
            </Routes>
          </Suspense>
        </PlaybackProvider>
      </SnackbarProvider>
      <Suspense fallback={<div />}>
        <InfoDialog open={showDialog} handleClose={handleClose} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
