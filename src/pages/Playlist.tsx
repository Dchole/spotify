import { useEffect, useState } from "react"
import { useParams } from "react-router"
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

export type TOrder =
  | ""
  | "title"
  | "date"
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

  useEffect(() => {
    if (id === "liked-songs") getLikedSongs()
  }, [getLikedSongs])

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
          tracks={likedSongs}
          playTrack={playTrack}
          pauseTrack={pauseTrack}
          playingTrack={playingTrack}
          isTrackPlaying={isTrackPlaying}
        />
      ) : (
        <PlaylistTracks
          tracks={playlist?.tracks}
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
