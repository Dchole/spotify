import { EType, useGetAlbumQuery } from "@/generated/graphql"
import {
  FavoriteBorder,
  PauseCircle,
  PlayCircle,
  Share
} from "@mui/icons-material"
import { Container, IconButton, Stack } from "@mui/material"
import { useParams } from "react-router"
import { usePlayback } from "~/context/Playback"
import AlbumTracks from "~/AlbumTracks"
import Showcase from "~/Showcase"
import useGroupPlay from "@/hooks/useGroupPlay"

const Playlist = () => {
  const { id } = useParams<{ id: string }>()
  const album = useGetAlbumQuery({ variables: { id } }).data?.album
  const { loading, playback } = usePlayback()
  const {
    groupPlaying,
    handlePlay,
    handlePause,
    playTrack,
    pauseTrack,
    playingTrack,
    isTrackPlaying
  } = useGroupPlay(album?.uri || "")

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
          {groupPlaying ? (
            <IconButton
              aria-label="pause"
              disabled={loading}
              onClick={handlePause}
            >
              <PauseCircle color="primary" sx={{ fontSize: "3.5rem" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label={
                playback.started_playing ? "resume playing" : "play all"
              }
              disabled={loading}
              onClick={handlePlay}
            >
              <PlayCircle color="primary" sx={{ fontSize: "3.5rem" }} />
            </IconButton>
          )}
        </Stack>
      </Container>
      <AlbumTracks
        gutters={1}
        name={album?.name || "Unknown"}
        release_date={album?.release_date}
        tracks={album?.tracks || []}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        playingTrack={playingTrack}
        isTrackPlaying={isTrackPlaying}
      />
    </main>
  )
}

export default Playlist
