import { useState } from "react"
import { useParams } from "react-router"
import { EType, useGetPlaylistQuery } from "@/generated/graphql"
import { Container, SelectChangeEvent } from "@mui/material"
import PlaylistTracks from "~/PlaylistTracks"
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
          type={EType["Playlist"]}
          cover_image={playlist?.cover_image || ""}
          name={playlist?.name || "Unknown"}
          owner={playlist?.owner.name || "Unknown"}
          numberOfTracks={playlist?.total}
          duration={playlist?.duration || 0}
        />
        <PlaylistControls
          type={playlist?.type || EType["Playlist"]}
          order={order}
          handleChange={handleChange}
        />
      </Container>
      <PlaylistTracks tracks={playlist?.tracks || []} />
    </main>
  )
}

export default Playlist
