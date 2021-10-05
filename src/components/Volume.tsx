import { VolumeMute, VolumeUp } from "@mui/icons-material"
import { IconButton, Popover, Slider } from "@mui/material"

interface IProps {
  volume?: number
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const Volume: React.FC<IProps> = ({ volume, anchorEl, handleClose }) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      onClose={handleClose}
      PaperProps={{
        sx: {
          height: 240,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: 1
        }
      }}
    >
      <IconButton aria-label="full volume">
        <VolumeUp />
      </IconButton>
      <Slider
        size="small"
        color="secondary"
        defaultValue={volume}
        aria-label="volume"
        orientation="vertical"
        valueLabelDisplay="auto"
        sx={{ "& .MuiSlider-rail": { bgcolor: "gray" } }}
      />
      <IconButton aria-label="mute">
        <VolumeMute />
      </IconButton>
    </Popover>
  )
}

Volume.defaultProps = {
  volume: 50
}

export default Volume
