import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useLocation } from "react-router-dom"

interface IProps {
  open: boolean
  handleClose: () => void
  confirm: () => void
}

const ConfirmDialog: React.FC<IProps> = ({ open, confirm, handleClose }) => {
  const { pathname } = useLocation()
  const onArtistPage = pathname.split("/")[1] === "artists"

  const handleConfirm = () => {
    confirm()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center", fontSize: "1.6rem" }}>
        Are you sure?
      </DialogTitle>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          sx={{ borderRadius: 5 }}
          disableElevation
        >
          {onArtistPage ? "Unfollow" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
