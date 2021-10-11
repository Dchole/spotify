import { fetcher } from "@/utils"
import { useQuery } from "react-query"

interface ISavedAlbums {
  albums: SpotifyApi.SavedAlbumObject[]
  next: string | null
  previous: string | null
  total: number | undefined
}

const useSavedAlbums = () => {
  const { data, error, isFetching } = useQuery<ISavedAlbums>(
    "saved-albums",
    fetcher
  )

  return {
    albums: data?.albums,
    next: data?.next,
    previous: data?.previous,
    total: data?.total,
    error,
    isFetching
  }
}

export default useSavedAlbums
