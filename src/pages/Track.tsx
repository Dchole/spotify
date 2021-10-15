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
import TrackShowcase from "~/TrackShowcase"
import { songs } from "@/data/songs"
import { lazy, useState } from "react"
import { useGetTrackQuery } from "@/generated/graphql"
import { useParams } from "react-router"

const Volume = lazy(() => import("~/Volume"))

const [song] = songs

const Track = () => {
  const { id } = useParams<{ id: string }>()
  const track = useGetTrackQuery({ variables: { id } }).data?.track
  const [volume, setVolume] = useState(50)
  const [volumeEl, setVolumeEl] = useState<HTMLButtonElement | null>(null)

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number)
  }

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVolumeEl(event.currentTarget)
  }

  const handleClose = () => setVolumeEl(null)

  return (
    <Container component="main">
      <TrackShowcase
        name={track?.name || "Unknown"}
        cover_image={track?.cover_image}
        artistName={
          track?.artists.map(artist => artist.name).join(", ") || "Unknown"
        }
        albumName={track?.album.name || "Unknown"}
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
          defaultValue={0}
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
      <Volume
        volume={volume}
        anchorEl={volumeEl}
        handleClose={handleClose}
        handleChange={handleVolumeChange}
      />
    </Container>
  )
}

export default Track
