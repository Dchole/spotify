import { lazy, Suspense, useState } from "react"
import { useHistory, useLocation } from "react-router"
import { Box } from "@mui/system"
import {
  AppBar,
  Avatar,
  Fade,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  useTheme
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useGetUserQuery } from "@/generated/graphql"
import { usePlayback } from "~/context/Playback"
import Search from "./Search"

const AccountMenu = lazy(() => import("./AccountMenu"))
const UnsupportedBanner = lazy(() => import("~/UnsupportedBanner"))

const Header = () => {
  const { data } = useGetUserQuery()
  const { showBanner, hideBanner } = usePlayback()
  const { palette } = useTheme()
  const { goBack } = useHistory()
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const deepLevel = pathname.split("/").length > 2

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar
      elevation={palette.mode === "light" ? 0 : 5}
      sx={{ boxShadow: "none" }}
    >
      <Toolbar>
        {pathname !== "/search" && (
          <IconButton aria-label="go back" onClick={goBack} sx={{ zIndex: 0 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Box
          position="relative"
          flexGrow={1}
          zIndex={1}
          bgcolor={palette.mode === "light" ? "primary.main" : "#2a2a2a"}
          sx={{
            transform:
              deepLevel || pathname === "/search"
                ? "translateX(0)"
                : "translateX(-40px)",
            transition: ({ transitions }) => {
              const { create, duration } = transitions as Theme["transitions"]

              return create("transform", {
                duration: duration.shorter
              })
            }
          }}
        >
          <Fade
            in={!deepLevel && pathname !== "/search"}
            mountOnEnter
            unmountOnExit
          >
            <Typography variant="h3" component="h1">
              Spotify
            </Typography>
          </Fade>
          <Search />
        </Box>
        <IconButton aria-label="open menu" onClick={handleOpen}>
          <Avatar
            sx={{ bgcolor: theme => theme.palette.secondary.light }}
            src={data?.user.photoURL || ""}
            alt="profile"
          />
        </IconButton>
      </Toolbar>
      <Suspense fallback={<div />}>
        <UnsupportedBanner show={showBanner} handleClose={hideBanner} />
      </Suspense>
      <Suspense fallback={<div />}>
        <AccountMenu anchorEl={anchorEl} handleClose={handleClose} />
      </Suspense>
    </AppBar>
  )
}

export default Header
