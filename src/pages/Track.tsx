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

const Volume = lazy(() => import("~/Volume"))

const Track = () => {
  const { id } = useParams<{ id: string }>()
  const track = useGetTrackQuery({ variables: { id } }).data?.track
  const savedTracks = useGetLikedSongsQuery().data?.liked_songs
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(200)
  const [saved, setSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [volumeEl, setVolumeEl] = useState<HTMLButtonElement | null>(null)
  const {
    next,
    prev,
    device_id,
    currentlyPlayingTrack,
    updateCurrentlyPlaying
  } = usePlayback()

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVolumeEl(event.currentTarget)
  }

  const handleClose = () => setVolumeEl(null)

  const play = async () => {
    try {
      setLoading(true)
      await spotifyApi.play({
        uris: track?.uri ? [track.uri] : undefined,
        device_id
      })

      setIsPlaying(true)

      updateCurrentlyPlaying()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const pause = async () => {
    try {
      setLoading(true)
      await spotifyApi.pause()
      setIsPlaying(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateTimeline = useCallback(
    (event: Event, newValue: number | number[]) => {
      const value = newValue as number
      setProgress(value)
      event && spotifyApi.seek(value * 1000)
    },
    []
  )

  const fastForward = () => {
    const position = progress + 10
    const positionMs = position * 1000
    const durationMs = duration * 1000

    setProgress(position > duration ? duration : position)
    spotifyApi.seek(positionMs > durationMs ? durationMs : positionMs)
  }

  const fastRewind = () => {
    const position = progress - 10
    const positionMs = position * 1000

    setProgress(position < 0 ? 0 : position)
    spotifyApi.seek(positionMs < 0 ? 0 : positionMs)
  }

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60)
    const secondLeft = Math.round(value - minute * 60)

    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  const nextTrack = () => {
    spotifyApi.skipToNext({ device_id })
  }

  const prevTrack = () => {
    spotifyApi.skipToPrevious({ device_id })
  }

  useEffect(() => {
    let timer: number | undefined = undefined

    const thisTrack = savedTracks?.find(({ id }) => id === track?.id)
    thisTrack && setSaved(true)

    const duration = track?.duration ?? 0
    setDuration(duration / 1000)

    if (currentlyPlayingTrack?.item?.uri === track?.uri) {
      const progress = currentlyPlayingTrack?.progress_ms ?? 0

      setProgress(progress / 1000)

      const isPlaying = !currentlyPlayingTrack?.is_paused
      if (isPlaying) {
        setIsPlaying(isPlaying)

        timer = setInterval((event: never) => {
          spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
            const progress = body?.progress_ms ?? 0

            isPlaying && updateTimeline(event, progress / 1000)
          })
        }, 1000)
      }
    }

    return () => clearInterval(timer)
  }, [isPlaying, currentlyPlayingTrack, updateTimeline])

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
          -{formatDuration(duration - progress)}
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
          to={`/tracks/${prev}`}
          aria-label="play previous track"
          onClick={prevTrack}
        >
          <SkipPrevious fontSize="large" />
        </IconButton>
        <IconButton
          aria-label={`play ${track?.name}`}
          onClick={isPlaying ? pause : play}
          disabled={loading}
        >
          {currentlyPlayingTrack?.item?.uri === track?.uri && isPlaying ? (
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
          to={`/tracks/${next}`}
          aria-label="play next track"
          onClick={nextTrack}
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
