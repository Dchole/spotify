import {
  useGetPlaylistsLazyQuery,
  useGetSavedAlbumsLazyQuery
} from "@/generated/graphql"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { spotifyApi } from "@/lib"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { IconButton } from "@mui/material"

interface IProps {
  group_id?: string
}

const SaveGroupButton: React.FC<IProps> = ({ group_id }) => {
  const { pathname } = useLocation()
  const [type, setType] = useState("")
  const [saved, setSaved] = useState(false)
  const [getAlbums, { data: albumsData }] = useGetSavedAlbumsLazyQuery()
  const [getPlaylists, { data: playlistsData }] = useGetPlaylistsLazyQuery()

  useEffect(() => {
    const type = pathname.split("/")[1]
    setType(type.substring(0, type.length - 1))

    switch (type) {
      case "albums":
        getAlbums()
        break

      case "playlists":
        getPlaylists()
        break

      default:
        break
    }
  }, [getAlbums, getPlaylists, pathname])

  useEffect(() => {
    const albumSaved = albumsData?.saved_albums.find(
      album => album.id === group_id
    )
    const playlistSaved = playlistsData?.playlists.find(
      playlist => playlist.id === group_id
    )

    setSaved(Boolean(albumSaved || playlistSaved))
  }, [albumsData, playlistsData, group_id])

  const addToFavourite = () => {
    setSaved(true)
    try {
      if (group_id) {
        type === "album"
          ? spotifyApi.addToMySavedAlbums([group_id])
          : spotifyApi.followPlaylist(group_id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromFavourite = () => {
    setSaved(false)
    try {
      if (group_id) {
        type === "album"
          ? spotifyApi.removeFromMySavedAlbums([group_id])
          : spotifyApi.unfollowPlaylist(group_id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <IconButton
        aria-label={saved ? `remove ${type}` : `add ${type} to saved ${type}s`}
        onClick={saved ? removeFromFavourite : addToFavourite}
        color={saved ? "secondary" : undefined}
      >
        {saved ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </>
  )
}

export default SaveGroupButton
