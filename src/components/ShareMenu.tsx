import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { ContentCopy } from "@mui/icons-material"
import { useSnackbar } from "notistack"

interface IProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const ShareMenu: React.FC<IProps> = ({ anchorEl, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar()

  const copy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => enqueueSnackbar("Link copied"))
      .then(handleClose)
  }

  return (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      sx={{ "& .MuiList-root": { py: 0 } }}
      onClose={handleClose}
    >
      <MenuItem onClick={copy}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copy</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ShareMenu
