import { fetcher } from "@/utils"
import { useQuery } from "react-query"

interface ITopTracks {
  topTracks: SpotifyApi.TrackObjectFull[]
  total: number
  next: string | null
  previous: string | null
}

const useTopTracks = () => {
  const { data, error, isFetching } = useQuery<ITopTracks>(
    "top-tracks",
    fetcher
  )

  return {
    next: data?.next,
    previous: data?.previous,
    total: data?.total,
    topTracks: data?.topTracks,
    error,
    isFetching
  }
}

export default useTopTracks
