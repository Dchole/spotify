import { Outlet } from "react-router-dom"
import Box from "@mui/system/Box"
import Header from "./Header"
import Navigation from "./Navigation"

const Layout = () => {
  return (
    <>
      <Header />
      <Box sx={{ my: 9 }}>
        <Outlet />
      </Box>
      <Navigation />
    </>
  )
}

export default Layout
