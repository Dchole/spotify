import { fetcher } from "@/utils/react-query-fetcher"
import { useQuery } from "react-query"

interface IPlaylists {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
  total: number
  next: string | null
  previous: string | null
}

const usePlaylists = () => {
  const { data, error, isFetching } = useQuery<IPlaylists>("playlists", fetcher)

  return {
    next: data?.next,
    total: data?.total,
    previous: data?.previous,
    playlists: data?.playlists,
    error,
    isFetching
  }
}

export default usePlaylists
