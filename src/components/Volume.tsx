import { VolumeMute, VolumeUp } from "@mui/icons-material"
import { IconButton, Popover, Slider } from "@mui/material"
import React from "react"

interface IProps {
  volume?: number
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  handleChange: (event: Event, newValue: number | number[]) => void
}

const Volume: React.FC<IProps> = ({
  volume,
  anchorEl,
  handleClose,
  handleChange
}) => {
  const mute = (event: never) => handleChange(event, 0)
  const fullVolume = (event: never) => handleChange(event, 100)

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
      <IconButton aria-label="full volume" onClick={fullVolume}>
        <VolumeUp />
      </IconButton>
      <Slider
        size="small"
        color="secondary"
        value={volume}
        aria-label="volume"
        orientation="vertical"
        valueLabelDisplay="auto"
        sx={{ "& .MuiSlider-rail": { bgcolor: "gray" } }}
        onChange={handleChange}
      />
      <IconButton aria-label="mute" onClick={mute}>
        <VolumeMute />
      </IconButton>
    </Popover>
  )
}

Volume.defaultProps = {
  volume: 50
}

export default Volume
