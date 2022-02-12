import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  EType,
  useGetLikedSongsLazyQuery,
  useGetPlaylistQuery,
  useGetUserQuery
} from "@/generated/graphql"
import { Container, SelectChangeEvent } from "@mui/material"
import PlaylistTracks from "~/PlaylistTracks"
import PlaylistControls from "~/PlaylistControls"
import Showcase from "~/Showcase"
import useGroupPlay from "@/hooks/useGroupPlay"
import LikedTracks from "~/LikedTracksListing"
import { sort } from "@/utils"

export type TOrder =
  | ""
  | "title"
  | "album"
  | "artist"
  | "duration"
  | "date added"

const Playlist = () => {
  const { data } = useGetUserQuery()
  const { id } = useParams<{ id: string }>()

  const [getLikedSongs, { data: likedSongsData }] = useGetLikedSongsLazyQuery()
  const { data: playlistsData } = useGetPlaylistQuery({
    variables: { id }
  })

  const playlist = playlistsData?.playlist
  const likedSongs = likedSongsData?.liked_songs

  const [order, setOrder] = useState<TOrder>("")
  const [sortedTracks, setSortedTracks] = useState(playlist?.tracks)
  const [sortedLikedTracks, setSortedLikedTracks] = useState(likedSongs)

  useEffect(() => {
    if (id === "liked-songs") getLikedSongs()
  }, [getLikedSongs])

  useEffect(() => {
    setSortedTracks(playlist?.tracks)
  }, [playlist])

  useEffect(() => {
    const playlistMapping = {
      title: "track.name",
      album: "track.album.name",
      artist: "track.artists[0].name",
      duration: "track.duration",
      "": "added_at",
      "date added": "added_at"
    }

    const likedSongsMapping = {
      title: "name",
      album: "album.name",
      artist: "artists[0].name",
      duration: "duration",
      "": "added_at",
      "date added": "added_at"
    }

    const sortedTracks =
      playlist && sort(playlist.tracks || [], playlistMapping[order])
    const sortedLiked =
      likedSongs && sort(likedSongs || [], likedSongsMapping[order])

    sortedTracks && setSortedTracks(sortedTracks)
    sortedLiked && setSortedLikedTracks(sortedLiked)
  }, [order])

  const {
    groupPlaying,
    handlePlay,
    handlePause,
    playTrack,
    pauseTrack,
    playingTrack,
    isTrackPlaying
  } = useGroupPlay(
    playlist?.uri,
    likedSongs?.map(track => ({ id: track.id, uri: track.uri }))
  )

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as TOrder)
  }

  return (
    <main>
      <Container>
        {id === "liked-songs" ? (
          <Showcase
            type={EType["Playlist"]}
            name="Liked Songs"
            owner={data?.user.name || "Unknown"}
            numberOfTracks={likedSongs?.length || 0}
          />
        ) : (
          <Showcase
            type={EType["Playlist"]}
            cover_image={playlist?.cover_image || ""}
            name={playlist?.name || "Unknown"}
            owner={playlist?.owner.name || "Unknown"}
            numberOfTracks={playlist?.total}
            duration={playlist?.duration || 0}
          />
        )}
        <PlaylistControls
          playlist_id={playlist?.id}
          handlePlay={handlePlay}
          handlePause={handlePause}
          groupPlaying={groupPlaying}
          type={playlist?.type || EType["Playlist"]}
          order={order}
          handleChange={handleChange}
        />
      </Container>
      {id === "liked-songs" ? (
        <LikedTracks
          tracks={sortedLikedTracks}
          playTrack={playTrack}
          pauseTrack={pauseTrack}
          playingTrack={playingTrack}
          isTrackPlaying={isTrackPlaying}
        />
      ) : (
        <PlaylistTracks
          tracks={sortedTracks}
          playTrack={playTrack}
          pauseTrack={pauseTrack}
          playingTrack={playingTrack}
          isTrackPlaying={isTrackPlaying}
        />
      )}
    </main>
  )
}

export default Playlist
