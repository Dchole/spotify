import { Container, Grid, IconButton, Slider, Typography } from "@mui/material"
import {
  FastForward,
  FastRewind,
  Favorite,
  FavoriteBorder,
  PauseCircle,
  PlayCircle,
  SkipNext,
  SkipPrevious,
  VolumeUp
} from "@mui/icons-material"
import TrackShowcase from "~/TrackShowcase"
import { lazy, useCallback, useEffect, useState } from "react"
import { useGetLikedSongsQuery, useGetTrackQuery } from "@/generated/graphql"
import { useParams } from "react-router"
import { usePlayback } from "~/context/Playback"
import { spotifyApi } from "@/lib"
import { Link } from "react-router-dom"
import useProgress from "@/hooks/useProgress"

const Volume = lazy(() => import("~/Volume"))

const Track = () => {
  const { id } = useParams<{ id: string }>()
  const track = useGetTrackQuery({ variables: { id } }).data?.track
  const savedTracks = useGetLikedSongsQuery().data?.liked_songs
  const [saved, setSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volumeEl, setVolumeEl] = useState<HTMLButtonElement | null>(null)
  const {
    loading,
    playback,
    play,
    pause,
    next,
    prev,
    seek,
    fastForward,
    fastRewind
  } = usePlayback()

  useProgress()

  useEffect(() => {
    const thisTrack = savedTracks?.find(({ id }) => id === track?.id)
    thisTrack && setSaved(true)

    const duration = track?.duration ?? 0
    setDuration(duration / 1000)
  }, [track, savedTracks])

  useEffect(() => {
    if (playback.current_track === track?.id) {
      setIsPlaying(!playback.is_paused)
      setProgress(playback.progress / 1000)
    }
  }, [playback])

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVolumeEl(event.currentTarget)
  }

  const handleClose = () => setVolumeEl(null)

  const handlePlay = async () => {
    playback.started_playing
      ? await play()
      : await play({
          context_uri: track?.album?.uri,
          offset: { uri: track?.uri }
        })

    setIsPlaying(true)
  }

  const handlePause = async () => {
    await pause()
    setIsPlaying(false)
  }

  const updateTimeline = useCallback(
    (event: Event, newValue: number | number[]) => {
      const value = newValue as number
      setProgress(value)
      seek(value * 1000)
    },
    []
  )

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60)
    const secondLeft = Math.round(value - minute * 60)

    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  const addToFavourite = () => {
    setSaved(true)
    track?.id && spotifyApi.addToMySavedTracks([track.id])
  }

  const removeFromFavourite = () => {
    setSaved(false)
    track?.id && spotifyApi.removeFromMySavedTracks([track.id])
  }

  return (
    <Container component="main">
      <TrackShowcase
        name={track?.name || "Unknown"}
        cover_image={track?.cover_image}
        artistName={
          track?.artists.map(artist => artist.name).join(", ") || "Unknown"
        }
        albumName={track?.album?.name || "Unknown"}
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
        <IconButton aria-label="rewind ten seconds" onClick={fastRewind}>
          <FastRewind fontSize="large" />
        </IconButton>
        <Slider
          color="secondary"
          size="small"
          value={progress}
          step={1}
          min={0}
          max={duration}
          onChange={updateTimeline}
          aria-label="timeline"
          sx={{ "& .MuiSlider-rail": { bgcolor: "gray" } }}
        />

        <IconButton aria-label="fast forward ten seconds" onClick={fastForward}>
          <FastForward fontSize="large" />
        </IconButton>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: -3, px: 6 }}
      >
        <Typography component={Grid} variant="caption" item>
          {formatDuration(progress)}
        </Typography>
        <Typography component={Grid} variant="caption" item>
          {formatDuration(duration)}
        </Typography>
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
        <IconButton
          aria-label={`add ${track?.name} to liked songs`}
          onClick={saved ? removeFromFavourite : addToFavourite}
          color={saved ? "secondary" : undefined}
        >
          {saved ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton
          component={Link}
          to={`/tracks/${playback.prev_track}`}
          aria-label="play previous track"
          onClick={prev}
        >
          <SkipPrevious fontSize="large" />
        </IconButton>
        <IconButton
          aria-label={`play ${track?.name}`}
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={loading}
        >
          {isPlaying ? (
            <PauseCircle
              color={loading ? undefined : "primary"}
              sx={{ fontSize: "4rem" }}
            />
          ) : (
            <PlayCircle
              color={loading ? undefined : "primary"}
              sx={{ fontSize: "4rem" }}
            />
          )}
        </IconButton>
        <IconButton
          component={Link}
          to={`/tracks/${playback.next_track}`}
          aria-label="play next track"
          onClick={next}
        >
          <SkipNext fontSize="large" />
        </IconButton>
        <IconButton aria-label="control audio volume" onClick={handleOpen}>
          <VolumeUp />
        </IconButton>
      </Grid>
      <Volume anchorEl={volumeEl} handleClose={handleClose} />
    </Container>
  )
}

export default Track
