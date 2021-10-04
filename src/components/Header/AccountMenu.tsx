import { Menu, MenuItem, MenuList } from "@mui/material"
import { Link } from "react-router-dom"

interface IProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const AccountMenu: React.FC<IProps> = ({ anchorEl, handleClose }) => {
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
      <MenuList>
        <MenuItem component={Link} to="/profile">
          Profile
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AccountMenu
