import { card } from "@/data/card"
import { songs } from "@/data/songs"
import { ChevronRight, PlayCircle, Share } from "@mui/icons-material"
import { Button, Container, IconButton, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Listing from "~/Listing"
import Showcase from "~/Showcase"
import Tile from "~/Tile"

const artist = {
  name: "Image Dragons",
  numberOfListeners: 10
}

const Artist = () => {
  const [showingMore, setShowingMore] = useState(false)
  const [showingSongs, setShowingSongs] = useState(songs.slice(0, 3))

  const showMore = () => setShowingMore(!showingMore)

  useEffect(() => {
    setShowingSongs(showingMore ? songs : songs.slice(0, 3))
  }, [showingMore])

  return (
    <main>
      <Container>
        <Showcase
          type="artist"
          name={artist.name}
          numberOfListeners={artist.numberOfListeners}
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
        aria-label={`top songs by ${artist.name}`}
      >
        <Typography variant="h4" sx={{ ml: 2 }}>
          Popular Songs
        </Typography>
        <Listing songs={showingSongs} type="album" gutters={1} />
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
        aria-label={`${artist.name}'s albums'`}
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
          {[...new Array(8)].map((_, i) => (
            <Box key={i} mb={2.5}>
              <Tile title={card.title} type="album" alignLeft />
            </Box>
          ))}
        </Stack>
      </Container>
      <section id="singles-eps" aria-labelledby="singles-heading">
        <Typography id="singles-heading" variant="h4" sx={{ ml: 2 }}>
          Singles and EPs
        </Typography>
        <Listing type="singles" songs={songs} />
      </section>
    </main>
  )
}

export default Artist
