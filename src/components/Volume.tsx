import { spotifyApi } from "@/lib"
import { VolumeMute, VolumeUp } from "@mui/icons-material"
import { IconButton, Popover, Slider } from "@mui/material"
import React, { useEffect, useState } from "react"

interface IProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const Volume: React.FC<IProps> = ({ anchorEl, handleClose }) => {
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    spotifyApi.setVolume(volume)
  }, [volume])

  const mute = (event: never) => handleChange(event, 0)
  const fullVolume = (event: never) => handleChange(event, 100)

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number)
  }

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

export default Volume
