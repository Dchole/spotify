import {
  EType,
  GetArtistQuery,
  useGetArtistQuery,
  useGetFollowedArtistsQuery
} from "@/generated/graphql"
import { ChevronRight } from "@mui/icons-material"
import { Button, Container, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { lazy, Suspense, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistTracks from "~/ArtistTracks"
import Showcase from "~/Showcase"
import Tile from "~/Tile"
import useGroupPlay from "@/hooks/useGroupPlay"
import GroupPlayButton from "~/GroupPlayButton"
import { spotifyApi } from "@/lib"
import { useSnackbar } from "notistack"
import ShareButton from "~/ShareButton"

const ConfirmDialog = lazy(() => import("~/Dialogs/Confirm"))

const Artist = () => {
  const { id } = useParams<{ id: string }>()
  const { enqueueSnackbar } = useSnackbar()
  const artist = useGetArtistQuery({ variables: { id: id || "" } }).data?.artist
  const followedArtists = useGetFollowedArtistsQuery().data?.followed_artists
  const [openConfirm, setOpenConfirm] = useState(false)
  const [showingMore, setShowingMore] = useState(false)
  const [following, setFollowing] = useState(false)
  const [pendingFollow, setPendingFollow] = useState(false)

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

  useEffect(() => {
    setShowingTracks(showingMore ? artist?.tracks : artist?.tracks?.slice(0, 4))
  }, [showingMore, artist?.tracks])

  useEffect(() => {
    const isFollowing = followedArtists?.some(({ id }) => id === artist?.id)
    setFollowing(Boolean(isFollowing))
  }, [followedArtists])

  const showMore = () => setShowingMore(!showingMore)

  const handleOpenConfirm = () => setOpenConfirm(true)
  const handleCloseConfirm = () => setOpenConfirm(false)

  const followArtist = () => {
    try {
      setPendingFollow(true)
      artist && spotifyApi.followArtists([artist.id])
    } catch (error) {
      enqueueSnackbar("Failed to follow artist", { variant: "error" })
    } finally {
      setPendingFollow(false)
    }
  }

  const unfollowArtist = () => {
    try {
      setPendingFollow(true)
      artist && spotifyApi.unfollowArtists([artist.id])
    } catch (error) {
      enqueueSnackbar("Failed to unfollow artist", { variant: "error" })
    } finally {
      setPendingFollow(false)
    }
  }

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
            <Button
              variant={following ? "outlined" : "contained"}
              disableElevation
              onClick={following ? handleOpenConfirm : followArtist}
              disabled={pendingFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
            <ShareButton />
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
      <Suspense fallback={<div />}>
        <ConfirmDialog
          open={openConfirm}
          confirm={unfollowArtist}
          handleClose={handleCloseConfirm}
        />
      </Suspense>
    </main>
  )
}

export default Artist
