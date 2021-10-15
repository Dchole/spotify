import { EType, useGetAlbumQuery } from "@/generated/graphql"
import { FavoriteBorder, PlayCircle, Share } from "@mui/icons-material"
import { Container, IconButton, Stack } from "@mui/material"
import { useParams } from "react-router"
import AlbumTracks from "~/AlbumTracks"
import Showcase from "~/Showcase"

const Playlist = () => {
  const { id } = useParams<{ id: string }>()
  const album = useGetAlbumQuery({ variables: { id } }).data?.album

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
          <IconButton aria-label="play all">
            <PlayCircle color="primary" sx={{ fontSize: "3.5rem" }} />
          </IconButton>
        </Stack>
      </Container>
      <AlbumTracks
        name={album?.name || "Unknown"}
        release_date={album?.release_date}
        tracks={album?.tracks || []}
      />
    </main>
  )
}

export default Playlist
