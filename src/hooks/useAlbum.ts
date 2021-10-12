import { fetcher } from "@/utils"
import { useQuery } from "react-query"
import { useParams } from "react-router"

interface IAlbum {
  album: SpotifyApi.SingleAlbumResponse
}

const useAlbum = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error, isFetching } = useQuery<IAlbum>(
    import.meta.env.PROD ? `albums/${id}` : "albums/[album]",
    fetcher
  )

  return {
    album: data?.album,
    error,
    isFetching
  }
}

export default useAlbum
