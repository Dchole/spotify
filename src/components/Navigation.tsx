import { Home, LibraryBooks, Search } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const navLinks = [
  {
    path: "/",
    label: "Home",
    icon: <Home />
  },
  {
    path: "/search",
    label: "Search",
    icon: <Search />
  },
  {
    path: "/library",
    label: "Your Library",
    icon: <LibraryBooks />
  }
]

const Navigation = () => {
  const { pathname } = useLocation()
  const index = navLinks.findIndex(({ path }) => path === pathname)

  const [value, setValue] = useState(index)

  useEffect(() => {
    const index = navLinks.findIndex(({ path }) => path === pathname)
    setValue(index)
  }, [pathname])

  return (
    <BottomNavigation
      color="red"
      component="nav"
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue)
      }}
      sx={{
        height: 60,
        position: "fixed",
        bottom: 0,
        width: "100%",
        borderTop: "1.5px solid",
        borderTopColor: "divider"
      }}
    >
      {navLinks.map(({ label, path, icon }) => (
        <BottomNavigationAction
          key={path}
          label={label}
          icon={icon}
          component={Link}
          to={path}
          sx={{ "&.Mui-selected": { color: "primary.dark" } }}
        />
      ))}
    </BottomNavigation>
  )
}

export default Navigation
