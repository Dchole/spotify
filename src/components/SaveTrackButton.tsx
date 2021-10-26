import { Track, useGetLikedSongsQuery } from "@/generated/graphql"
import { spotifyApi } from "@/lib"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
  track?: Pick<Track, "id" | "name" | "duration">
}

const SaveTrackButton: React.FC<IProps> = ({ track }) => {
  const [saved, setSaved] = useState(false)
  const savedTracks = useGetLikedSongsQuery().data?.liked_songs

  useEffect(() => {
    const thisTrack = savedTracks?.find(({ id }) => id === track?.id)
    thisTrack && setSaved(true)
  }, [track, savedTracks])

  const addToFavourite = () => {
    setSaved(true)
    track?.id && spotifyApi.addToMySavedTracks([track.id])
  }

  const removeFromFavourite = () => {
    setSaved(false)
    track?.id && spotifyApi.removeFromMySavedTracks([track.id])
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
