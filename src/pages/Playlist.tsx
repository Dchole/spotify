import usePlaylist from "@/hooks/usePlaylist"
import { Container, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import Listing from "~/Listing"
import PlaylistControls from "~/PlaylistControls"
import Showcase from "~/Showcase"

export type TOrder =
  | ""
  | "title"
  | "date"
  | "album"
  | "artist"
  | "duration"
  | "date added"

const Playlist = () => {
  const { playlist } = usePlaylist()
  const [order, setOrder] = useState<TOrder>("")
  const playlistDuration =
    playlist?.tracks.items.reduce(
      (acc, cur) => acc + cur.track.duration_ms,
      0
    ) ?? 0

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as TOrder)
  }

  return (
    <main>
      <Container>
        <Showcase
          type="playlist"
          cover={playlist?.images[0]?.url}
          title={playlist?.name}
          author={playlist?.owner.display_name || "Unknown"}
          numberOfSongs={playlist?.tracks.total}
          timeLength={Math.round(playlistDuration / 60_000)}
        />
        <PlaylistControls
          type="playlist"
          order={order}
          handleChange={handleChange}
        />
      </Container>
      <Listing playlistTracks={playlist?.tracks.items} type="playlist" />
    </main>
  )
}

export default Playlist
