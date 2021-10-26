import { EType, useGetAlbumQuery } from "@/generated/graphql"
import { FavoriteBorder, Share } from "@mui/icons-material"
import { Container, IconButton, Stack } from "@mui/material"
import { useParams } from "react-router"
import AlbumTracks from "~/AlbumTracks"
import Showcase from "~/Showcase"
import useGroupPlay from "@/hooks/useGroupPlay"
import GroupPlayButton from "~/GroupPlayButton"

const Album = () => {
  const { id } = useParams<{ id: string }>()
  const album = useGetAlbumQuery({ variables: { id } }).data?.album

  const {
    playTrack,
    pauseTrack,
    handlePlay,
    handlePause,
    playingTrack,
    groupPlaying,
    isTrackPlaying
  } = useGroupPlay(album?.uri)

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
          <GroupPlayButton
            handlePlay={handlePlay}
            handlePause={handlePause}
            groupPlaying={groupPlaying}
          />
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

export default Album
