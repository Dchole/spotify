import { fetcher } from "@/utils/react-query-fetcher"
import { useQuery } from "react-query"

interface IRecent {
  playHistory: SpotifyApi.PlayHistoryObject[]
  total: number
  next: string | null
  cursors: SpotifyApi.CursorObject
}

const useRecent = () => {
  const { data, error, isFetching } = useQuery<IRecent>(
    "recently-played",
    fetcher
  )

  return {
    next: data?.next,
    total: data?.total,
    cursors: data?.cursors,
    playHistory: data?.playHistory,
    error,
    isFetching
  }
}

export default useRecent
