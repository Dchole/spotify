import { Container, Grid, IconButton, Slider } from "@mui/material"
import {
  FastForward,
  FastRewind,
  FavoriteBorder,
  PlayCircle,
  SkipNext,
  SkipPrevious,
  VolumeUp
} from "@mui/icons-material"
import SongShowcase from "~/SongShowcase"
import { songs } from "@/data/songs"
import { lazy, useState } from "react"

const Volume = lazy(() => import("~/Volume"))

const [song] = songs

const Song = () => {
  const [volumeEl, setVolumeEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVolumeEl(event.currentTarget)
  }

  const handleClose = () => setVolumeEl(null)

  return (
    <Container component="main">
      <SongShowcase
        title="still feel"
        artist="half life"
        album="Now, Not yet"
      />
      <Grid
        component="section"
        id="timeline"
        aria-label="timeline"
        display="flex"
        alignItems="center"
        gap={1.5}
        wrap="nowrap"
        container
        sx={{ mb: 2 }}
      >
        <IconButton aria-label="rewind ten seconds">
          <FastRewind fontSize="large" />
        </IconButton>
        <Slider
          color="secondary"
          size="small"
          defaultValue={70}
          aria-label="Small"
          valueLabelDisplay="auto"
          sx={{ "& .MuiSlider-rail": { bgcolor: "gray" } }}
        />
        <IconButton aria-label="fast forward ten seconds">
          <FastForward fontSize="large" />
        </IconButton>
      </Grid>
      <Grid
        component="section"
        id="player-controls"
        aria-label="player controls"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        container
        sx={{ mt: 2 }}
      >
        <IconButton aria-label={`add ${song.title} to liked songs`}>
          <FavoriteBorder />
        </IconButton>
        <IconButton aria-label="go to previous song">
          <SkipPrevious fontSize="large" />
        </IconButton>
        <IconButton aria-label={`play ${song.title}`}>
          <PlayCircle color="primary" sx={{ fontSize: "4rem" }} />
        </IconButton>
        <IconButton aria-label="skip to next song">
          <SkipNext fontSize="large" />
        </IconButton>
        <IconButton aria-label="control audio volume" onClick={handleOpen}>
          <VolumeUp />
        </IconButton>
      </Grid>
      <Volume anchorEl={volumeEl} handleClose={handleClose} volume={50} />
    </Container>
  )
}

export default Song
