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
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(3px)",
        bgcolor: ({ palette }) =>
          palette.mode === "light" ? "#fff8" : "transparent"
      }}
    >
      <DialogTitle sx={{ fontSize: "1.12rem", fontWeight: 600 }}>
        Premium Spotify Account required for playback
      </DialogTitle>
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
