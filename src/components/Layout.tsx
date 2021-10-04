import { Container } from "@mui/material"
import Header from "./Header"
import Navigation from "./Navigation"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 8 }}>{children}</Container>
      <Navigation />
    </>
  )
}

export default Layout
