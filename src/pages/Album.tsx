import { EType, useGetAlbumQuery } from "@/generated/graphql"
import { spotifyApi } from "@/lib"
import {
  FavoriteBorder,
  PauseCircle,
  PlayCircle,
  Share
} from "@mui/icons-material"
import { Container, IconButton, Stack } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router"
import AlbumTracks from "~/AlbumTracks"
import { usePlayback } from "~/context/Playback"
import Showcase from "~/Showcase"

const Playlist = () => {
  const { id } = useParams<{ id: string }>()
  const album = useGetAlbumQuery({ variables: { id } }).data?.album
  const { device_id, player } = usePlayback()
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [isAlbumPlaying, setIsAlbumPlaying] = useState(false)

  const play = async () => {
    try {
      setLoading(true)
      await spotifyApi.play({ context_uri: album?.uri, device_id })
      setStarted(true)
      setPlaying(true)

      spotifyApi
        .getMyCurrentPlayingTrack()
        .then(({ body }) => setIsAlbumPlaying(body.context?.uri === album?.uri))
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
      setPlaying(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const resume = async () => {
    try {
      setLoading(true)
      await player?.resume()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Container>
        <Showcase
          type={EType["Album"]}
          cover_image={album?.cover_image}
          name={album?.name || "Unknown"}
          artistName={album?.artists[0].name}
          release_date={album?.release_date}
          popularity={album?.popularity}
          numberOfTracks={album?.numberOfTracks}
          duration={album?.duration || 0}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={2} direction="row">
            <IconButton aria-label="save album to library">
              <FavoriteBorder />
            </IconButton>
            <IconButton aria-label="share album">
              <Share />
            </IconButton>
          </Stack>
          {playing ? (
            <IconButton aria-label="pause" disabled={loading} onClick={pause}>
              <PauseCircle color="primary" sx={{ fontSize: "3.5rem" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label={started ? "resume playing" : "play all"}
              disabled={loading}
              onClick={started ? resume : play}
            >
              <PlayCircle color="primary" sx={{ fontSize: "3.5rem" }} />
            </IconButton>
          )}
        </Stack>
      </Container>
      <AlbumTracks
        gutters={1}
        album_uri={album?.uri}
        isAlbumPlaying={isAlbumPlaying}
        name={album?.name || "Unknown"}
        release_date={album?.release_date}
        tracks={album?.tracks || []}
        setPlaying={setPlaying}
      />
    </main>
  )
}

export default Playlist
