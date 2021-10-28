import { Track, useGetLikedSongsQuery } from "@/generated/graphql"
import { spotifyApi } from "@/lib"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"

interface IProps {
  track?: Pick<Track, "id" | "name" | "duration">
}

const SaveTrackButton: React.FC<IProps> = ({ track }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [saved, setSaved] = useState(false)
  const { data, refetch } = useGetLikedSongsQuery()

  const savedTracks = data?.liked_songs

  useEffect(() => {
    const thisTrack = savedTracks?.find(({ id }) => id === track?.id)
    thisTrack && setSaved(true)
  }, [track, savedTracks])

  const addToFavourite = async () => {
    setSaved(true)

    if (track?.id) {
      try {
        await spotifyApi.addToMySavedTracks([track.id])
        refetch()
      } catch (error) {
        enqueueSnackbar("Failed to save track", { variant: "error" })
      }
    }
  }

  const removeFromFavourite = async () => {
    setSaved(false)

    if (track?.id) {
      try {
        await spotifyApi.removeFromMySavedTracks([track.id])
        refetch()
      } catch (error) {
        enqueueSnackbar("Failed to remove saved track", { variant: "error" })
      }
    }
  }

  return (
    <>
      <IconButton
        aria-label={
          saved
            ? `remove ${track?.name} from liked songs`
            : `add ${track?.name} to liked songs`
        }
        onClick={saved ? removeFromFavourite : addToFavourite}
        color={saved ? "secondary" : undefined}
      >
        {saved ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </>
  )
}

export default SaveTrackButton
