import { useState } from "react"
import { useParams } from "react-router"
import { useGetPlaylistQuery } from "@/generated/graphql"
import { Container, SelectChangeEvent } from "@mui/material"
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
  const { id } = useParams<{ id: string }>()
  const { data } = useGetPlaylistQuery({ variables: { id } })

  const playlist = data?.playlist
  const [order, setOrder] = useState<TOrder>("")

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as TOrder)
  }

  return (
    <main>
      <Container>
        <Showcase
          type="playlist"
          cover={playlist?.cover_image || ""}
          title={playlist?.name}
          author={playlist?.owner.name || "Unknown"}
          numberOfSongs={playlist?.total}
          timeLength={playlist?.duration}
        />
        <PlaylistControls
          type="playlist"
          order={order}
          handleChange={handleChange}
        />
      </Container>
      <Listing playlistTracks={playlist?.tracks} type="playlist" />
    </main>
  )
}

export default Playlist
