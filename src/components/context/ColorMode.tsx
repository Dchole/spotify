import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  Theme,
  useMediaQuery
} from "@mui/material"
import { green, red } from "@mui/material/colors"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

interface IContextProps {
  mode: PaletteMode
  theme: Theme
  toggleColorMode: () => void
}

const defaultContext: IContextProps = {
  mode: "light",
  theme: createTheme({}),
  toggleColorMode: () =>
    console.error("something went wrong with `ColorModeContext`")
}

const ColorMode = createContext(defaultContext)

const ColorModeProvider: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState<PaletteMode>(() => {
    const storedMode = localStorage.getItem("color-mode") as PaletteMode | null

    if (storedMode) return storedMode
    return prefersDarkMode ? "dark" : "light"
  })

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
            mode,
            primary: {
              main: green[400]
            },
            secondary: {
              main: red[500]
            }
          },
          typography: {
            fontFamily: "'Nunito', sans-serif"
          },
          components: {
            MuiDialog: {
              styleOverrides: {
                root: {
                  backdropFilter: "blur(3px)",
                  backgroundColor: mode === "light" ? "#fff8" : "transparent"
                }
              }
            },
            MuiDialogTitle: {
              styleOverrides: {
                root: { fontSize: "1.12rem", fontWeight: 600 }
              }
            }
          }
        })
      ),
    [mode, prefersDarkMode]
  )

  useEffect(() => {
    const colorMode = localStorage.getItem("color-mode")
    !colorMode && setMode(prefersDarkMode ? "dark" : "light")
  }, [prefersDarkMode])

  useEffect(() => {
    localStorage.setItem("color-mode", mode)
  }, [mode])

  return (
    <ColorMode.Provider value={{ ...colorMode, theme }}>
      {children}
    </ColorMode.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorMode)

  if (!context) {
    throw new Error("`useColorMode` was called without a Provider")
  }

  return context
}

export default ColorModeProvider
