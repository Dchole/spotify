import { useState } from "react"
import { useParams } from "react-router"
import { EType, useGetPlaylistQuery } from "@/generated/graphql"
import { Container, SelectChangeEvent } from "@mui/material"
import PlaylistTracks from "~/PlaylistTracks"
import PlaylistControls from "~/PlaylistControls"
import Showcase from "~/Showcase"
import useGroupPlay from "@/hooks/useGroupPlay"

export type TOrder =
  | ""
  | "title"
  | "date"
  | "album"
  | "artist"
  | "duration"
  | "date added"

const Playlist = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetPlaylistQuery({ variables: { id } })

  const playlist = data?.playlist
  const [order, setOrder] = useState<TOrder>("")

  const {
    groupPlaying,
    handlePlay,
    handlePause,
    playTrack,
    pauseTrack,
    playingTrack,
    isTrackPlaying
  } = useGroupPlay(playlist?.uri)

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as TOrder)
  }

  return (
    <main>
      <Container>
        <Showcase
          type={EType["Playlist"]}
          cover_image={playlist?.cover_image || ""}
          name={playlist?.name || "Unknown"}
          owner={playlist?.owner.name || "Unknown"}
          numberOfTracks={playlist?.total}
          duration={playlist?.duration || 0}
        />
        <PlaylistControls
          handlePlay={handlePlay}
          handlePause={handlePause}
          groupPlaying={groupPlaying}
          type={playlist?.type || EType["Playlist"]}
          order={order}
          handleChange={handleChange}
        />
      </Container>
      <PlaylistTracks
        tracks={playlist?.tracks || []}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        playingTrack={playingTrack}
        isTrackPlaying={isTrackPlaying}
      />
    </main>
  )
}

export default Playlist
