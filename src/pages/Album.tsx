import useAlbum from "@/hooks/useAlbum"
import { FavoriteBorder, PlayCircle, Share } from "@mui/icons-material"
import { Container, IconButton, Stack } from "@mui/material"
import Listing from "~/Listing"
import Showcase from "~/Showcase"

const Playlist = () => {
  const { album } = useAlbum()
  const albumDuration =
    album?.tracks.items.reduce((acc, cur) => acc + cur.duration_ms, 0) ?? 0

  return (
    <main>
      <Container>
        <Showcase
          type="album"
          cover={album?.images[1]?.url}
          title={album?.name}
          author={album?.artists[0].name}
          createdAt={album?.release_date}
          numberOfSongs={album?.tracks.total}
          timeLength={Math.round(albumDuration / 60_000)}
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
          <IconButton aria-label="play all">
            <PlayCircle color="primary" sx={{ fontSize: "3.5rem" }} />
          </IconButton>
        </Stack>
      </Container>
      <Listing tracks={album?.tracks.items || []} type="playlist" />
    </main>
  )
}

export default Playlist
