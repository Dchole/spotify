import { songs } from "@/data/songs"
import { FavoriteBorder, PlayCircle, Share } from "@mui/icons-material"
import { Container, IconButton, Stack } from "@mui/material"
import Listing from "~/Listing"
import Showcase from "~/Showcase"

const Playlist = () => {
  return (
    <main>
      <Container>
        <Showcase
          type="album"
          title="Scaled and Icy"
          author="Twenty one pilots"
          createdAt="2021"
          numberOfSongs={11}
          timeLength={37}
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
      <Listing songs={songs} type="playlist" />
    </main>
  )
}

export default Playlist
