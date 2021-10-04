import { lazy, Suspense, useState } from "react"
import {
  AppBar,
  Avatar,
  Collapse,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import { useLocation } from "react-router"
import Search from "./Search"

const AccountMenu = lazy(() => import("./AccountMenu"))

const Header = () => {
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h3" component="h1">
            Spotify
          </Typography>
        </Box>
        <Collapse
          in={pathname === "/search"}
          orientation="horizontal"
          mountOnEnter
          unmountOnExit
        >
          <Search />
        </Collapse>
        <IconButton aria-label="open menu" onClick={handleOpen}>
          <Avatar sx={{ bgcolor: theme => theme.palette.secondary.light }} />
        </IconButton>
      </Toolbar>
      <Suspense fallback={<div />}>
        <AccountMenu anchorEl={anchorEl} handleClose={handleClose} />
      </Suspense>
    </AppBar>
  )
}

export default Header
