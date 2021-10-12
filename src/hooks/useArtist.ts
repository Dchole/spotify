import { fetcher } from "@/utils"
import { useQuery } from "react-query"
import { useParams } from "react-router"

interface IArtist {
  info: SpotifyApi.SingleArtistResponse
  tracks: SpotifyApi.TrackObjectFull[]
  albums: SpotifyApi.ArtistsAlbumsResponse
}

const useArtist = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error, isFetching } = useQuery<IArtist>(
    import.meta.env.PROD ? `artists/${id}` : "artists/[artist]",
    fetcher
  )

  return {
    info: data?.info,
    tracks: data?.tracks,
    albums: data?.albums,
    error,
    isFetching
  }
}

export default useArtist
