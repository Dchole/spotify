import { Home, LibraryBooks, Search } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

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
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
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
        borderTopColor: theme => theme.palette.divider
      }}
    >
      {navLinks.map(({ label, path, icon }) => (
        <BottomNavigationAction
          key={path}
          label={label}
          icon={icon}
          component={Link}
          to={path}
        />
      ))}
    </BottomNavigation>
  )
}

export default Navigation
