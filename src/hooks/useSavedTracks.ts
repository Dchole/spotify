import { fetcher } from "@/utils"
import { useQuery } from "react-query"

interface ISavedTracks {
  tracks: SpotifyApi.SavedTrackObject[]
  next: string | null
  previous: string | null
  total: number | undefined
}

const useSavedTracks = () => {
  const { data, error, isFetching } = useQuery<ISavedTracks>(
    "saved-tracks",
    fetcher
  )

  return {
    tracks: data?.tracks,
    next: data?.next,
    previous: data?.previous,
    total: data?.total,
    error,
    isFetching
  }
}

export default useSavedTracks
