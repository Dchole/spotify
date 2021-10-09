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
  ThemeProvider
} from "@mui/material"
import { green, red } from "@mui/material/colors"

import Layout from "~/Layout"
import Home from "#/Home"
import PageSpinner from "~/PageSpinner"
import SearchProvider from "~/context/SearchContext"
import AuthProvider from "~/context/AuthContext"

const Song = lazy(() => import("#/Song"))
const Auth = lazy(() => import("#/Auth"))
const Album = lazy(() => import("#/Album"))
const Artist = lazy(() => import("#/Artist"))
const Library = lazy(() => import("#/Library"))
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
              main: green[400]
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
        <SearchProvider>
          <Layout>
            <CssBaseline />
            <Suspense fallback={<PageSpinner />}>
              <Switch>
                <Route path="/auth" component={Auth} />
                <AuthProvider>
                  <Route path="/" component={Home} exact />
                  <Route path="/search" component={Search} />
                  <Route path="/library" component={Library} />
                  <Route path="/songs/:slug" component={Song} />
                  <Route path="/albums/:slug" component={Album} />
                  <Route path="/artists/:slug" component={Artist} />
                  <Route path="/playlists/:slug" component={Playlist} />
                </AuthProvider>
              </Switch>
            </Suspense>
          </Layout>
        </SearchProvider>
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
