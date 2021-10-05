import "@fontsource/nunito"

import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useMemo,
  useState
} from "react"
import { Route, Switch } from "react-router"
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider /* , useMediaQuery */
} from "@mui/material"
import { green, red } from "@mui/material/colors"

import Layout from "~/Layout"
import Home from "#/Home"

const Song = lazy(() => import("#/Song"))
const Search = lazy(() => import("#/Search"))
const Playlist = lazy(() => import("#/Playlist"))

const defaultContext = {
  mode: "light",
  toggleColorMode: () =>
    console.error("something went wrong with `ColorModeContext`")
}
const ColorModeContext = createContext(defaultContext)

const App = () => {
  const [mode, setMode] = useState<PaletteMode>("light")
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"))
      }
    }),
    [mode]
  )

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode, //: prefersDarkMode ? "dark" : "light"
            primary: {
              main: green[300]
            },
            secondary: {
              main: red[500]
            }
          },
          typography: {
            fontFamily: "'Nunito', sans-serif"
          }
        })
      ),
    [mode /* , prefersDarkMode */]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Layout>
          <CssBaseline />
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/search" component={Search} />
              <Route path="/songs/:slug" component={Song} />
              <Route path="/playlists/:slug" component={Playlist} />
            </Switch>
          </Suspense>
        </Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const colorMode = useContext(ColorModeContext)

  if (!colorMode) {
    throw new TypeError("`useColorMode` was used outside `ColorModeContext`")
  }

  return colorMode
}

export default App
