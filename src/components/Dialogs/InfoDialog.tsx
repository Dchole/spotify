import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"

interface IProps {
  open: boolean
  handleClose: () => void
}

const InfoDialog: React.FC<IProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Premium Spotify Account required for playback</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Premium Spotify Account will be required to play any media
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InfoDialog
