import { songs } from "@/data/songs"
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
  const [order, setOrder] = useState<TOrder>("")

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as TOrder)
  }

  return (
    <main>
      <Container>
        <Showcase
          type="playlist"
          title="Cools"
          author="Bunny"
          createdAt="2021"
          numberOfSongs={8}
          timeLength={100}
        />
        <PlaylistControls
          type="playlist"
          order={order}
          handleChange={handleChange}
        />
      </Container>
      <Listing tracks={[]} type="playlist" />
    </main>
  )
}

export default Playlist
