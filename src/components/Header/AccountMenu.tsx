import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material"
import {
  AccountBox,
  DarkMode,
  ExitToApp,
  LightMode,
  OpenInNew
} from "@mui/icons-material"
import { useColorMode } from "~/context/ColorMode"

interface IProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const AccountMenu: React.FC<IProps> = ({ anchorEl, handleClose }) => {
  const { mode, toggleColorMode } = useColorMode()

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{ "& ul": { pb: 0 } }}
    >
      <MenuItem
        component="a"
        href="https://www.spotify.com/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClose}
      >
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText sx={{ "& span": { display: "flex", gap: 1 } }}>
          <span>Account</span>
          <OpenInNew fontSize="small" color="action" />
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose} divider>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
      <ListItem role="menuitem">
        <ListItemText>Theme</ListItemText>
        <IconButton aria-label="toggle theme" onClick={toggleColorMode}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </ListItem>
    </Menu>
  )
}

export default AccountMenu
