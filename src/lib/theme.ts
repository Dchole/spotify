import { responsiveFontSizes, createTheme } from "@mui/material"
import { green, red } from "@mui/material/colors"

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
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
)
