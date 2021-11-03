import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useLocation } from "react-router"

interface IProps {
  open: boolean
  handleClose: () => void
}

const ConfirmDialog: React.FC<IProps> = ({ open, handleClose }) => {
  const { pathname } = useLocation()
  const onArtistPage = pathname.split("/")[1]

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleClose}
          sx={{ borderRadius: "50%" }}
          disableElevation
        >
          {onArtistPage ? "Unfollow" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
