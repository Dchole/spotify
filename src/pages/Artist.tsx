import useArtist from "@/hooks/useArtist"
import { ChevronRight, PlayCircle, Share } from "@mui/icons-material"
import { Button, Container, IconButton, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Listing from "~/Listing"
import Showcase from "~/Showcase"
import Tile from "~/Tile"

const Artist = () => {
  const { info, tracks, albums } = useArtist()
  const [showingMore, setShowingMore] = useState(false)
  const [showingTracks, setShowingTracks] = useState(tracks?.slice(0, 3))

  const showMore = () => setShowingMore(!showingMore)

  useEffect(() => {
    setShowingTracks(showingMore ? tracks : tracks?.slice(0, 3))
  }, [showingMore])

  return (
    <main>
      <Container>
        <Showcase
          type="artist"
          cover={info?.images[1]?.url}
          name={info?.name}
          numberOfListeners={info?.popularity}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" disableElevation>
              Follow
            </Button>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </Stack>
          <IconButton color="primary" aria-label="play all">
            <PlayCircle sx={{ fontSize: "4rem" }} />
          </IconButton>
        </Stack>
      </Container>
      <Box
        mb={2}
        component="section"
        id="popular-songs"
        aria-label={`top songs by ${info?.name}`}
      >
        <Typography variant="h4" sx={{ ml: 2 }}>
          All Tracks
        </Typography>
        <Listing tracks={showingTracks} type="singles" gutters={1} />
        <Button
          color="inherit"
          endIcon={
            <ChevronRight
              sx={{
                transition: ({ transitions }) =>
                  transitions.create("transform", {
                    duration: transitions.duration.shortest
                  }),
                transform: `rotate(${showingMore ? 270 : 90}deg)`
              }}
            />
          }
          sx={{
            ml: 2,
            width: 109,
            justifyContent: "space-between",
            textTransform: "capitalize"
          }}
          onClick={showMore}
        >
          {showingMore ? "Show less" : "See more"}
        </Button>
      </Box>
      <Container
        component="section"
        id="albums"
        aria-label={`${info?.name}'s albums'`}
      >
        <Typography variant="h4" sx={{ mb: 1.8 }}>
          Albums
        </Typography>
        <Stack
          sx={{ mx: 2 }}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {albums?.items.map(({ id, name, images }) => (
            <Box key={id} mb={2.5}>
              <Tile
                id={id}
                title={name}
                cover={images[1]?.url}
                type="album"
                alignLeft
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </main>
  )
}

export default Artist
