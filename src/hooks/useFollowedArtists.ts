import { fetcher } from "@/utils"
import { useQuery } from "react-query"

interface IArtists {
  artists: SpotifyApi.ArtistObjectFull[]
  cursors: SpotifyApi.CursorObject
  next: string | null
  total: number | undefined
}

const useFollowedArtists = () => {
  const { data, error, isFetching } = useQuery<IArtists>(
    "followed-artists",
    fetcher
  )

  return {
    artists: data?.artists,
    cursors: data?.cursors,
    next: data?.next,
    total: data?.total,
    error,
    isFetching
  }
}

export default useFollowedArtists
