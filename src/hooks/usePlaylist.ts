import { fetcher } from "@/utils"
import { useQuery } from "react-query"
import { useParams } from "react-router"

interface IPlaylist {
  playlist: SpotifyApi.SinglePlaylistResponse
}

const usePlaylist = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error, isFetching } = useQuery<IPlaylist>(
    import.meta.env.PROD ? `playlists/${id}` : "playlists/[playlist]",
    fetcher
  )

  return {
    playlist: data?.playlist,
    error,
    isFetching
  }
}

export default usePlaylist
