import { EType, GetArtistQuery, useGetArtistQuery } from "@/generated/graphql"
import { ChevronRight, Share } from "@mui/icons-material"
import { Button, Container, IconButton, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import ArtistTracks from "~/ArtistTracks"
import Showcase from "~/Showcase"
import Tile from "~/Tile"
import useGroupPlay from "@/hooks/useGroupPlay"
import GroupPlayButton from "~/GroupPlayButton"

const Artist = () => {
  const { id } = useParams<{ id: string }>()
  const artist = useGetArtistQuery({ variables: { id } }).data?.artist
  const [showingMore, setShowingMore] = useState(false)

  const [showingTracks, setShowingTracks] = useState<
    GetArtistQuery["artist"]["tracks"] | undefined
  >(undefined)

  const {
    groupPlaying,
    handlePlay,
    handlePause,
    playTrack,
    pauseTrack,
    playingTrack,
    isTrackPlaying
  } = useGroupPlay(artist?.id)

  const showMore = () => setShowingMore(!showingMore)

  useEffect(() => {
    setShowingTracks(showingMore ? artist?.tracks : artist?.tracks?.slice(0, 4))
  }, [showingMore, artist?.tracks])

  return (
    <main>
      <Container>
        <Showcase
          type={EType["Artist"]}
          cover_image={artist?.cover_image}
          name={artist?.name || "Unknown"}
          popularity={artist?.popularity}
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
          <GroupPlayButton
            handlePlay={handlePlay}
            handlePause={handlePause}
            groupPlaying={groupPlaying}
          />
        </Stack>
      </Container>
      <Box
        mb={2}
        component="section"
        id="popular-songs"
        aria-label={`top songs by ${artist?.name}`}
      >
        <Typography variant="h4" sx={{ ml: 2 }}>
          Top Tracks
        </Typography>
        <ArtistTracks
          tracks={showingTracks}
          gutters={1}
          playTrack={playTrack}
          pauseTrack={pauseTrack}
          playingTrack={playingTrack}
          isTrackPlaying={isTrackPlaying}
        />
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
        aria-label={`${artist?.name}'s albums'`}
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
          {artist?.albums.map(({ id, name, cover_image }) => (
            <Box key={id} mb={2.5}>
              <Tile
                id={id}
                name={name}
                cover_image={cover_image}
                type={EType["Album"]}
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
