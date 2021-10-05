import { Box } from "@mui/system"
import Header from "./Header"
import Navigation from "./Navigation"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ my: 9 }}>{children}</Box>
      <Navigation />
    </>
  )
}

export default Layout
