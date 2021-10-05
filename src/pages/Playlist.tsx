import { songs } from "@/data/songs"
import { FavoriteBorder, PlayCircle } from "@mui/icons-material"
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { useState } from "react"
import Listing from "~/Listing"
import Showcase from "~/Showcase"

type TSort =
  | ""
  | "title"
  | "date"
  | "album"
  | "artist"
  | "duration"
  | "date added"

const Playlist = () => {
  const [sortBy, setSortBy] = useState<TSort>("")

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as TSort)
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
        <Grid
          component="section"
          aria-label="controls"
          alignItems="center"
          justifyContent="space-between"
          container
        >
          <Grid
            alignItems="center"
            gap={2}
            container
            sx={{ width: "fit-content" }}
          >
            <FormControl margin="dense" sx={{ width: 150 }}>
              <Select
                id="sort-by"
                value={sortBy}
                label="Sort By"
                input={<OutlinedInput />}
                onChange={handleChange}
                displayEmpty
                sx={{ "& .MuiSelect-select": { py: 1.2 } }}
              >
                <MenuItem value="">
                  <em>Custom Order</em>
                </MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="album">Album</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="date added">Date Added</MenuItem>
              </Select>
            </FormControl>
            <IconButton aria-label="add playlist to favorite">
              <FavoriteBorder />
            </IconButton>
          </Grid>
          <IconButton color="primary" aria-label="Play all">
            <PlayCircle sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Grid>
      </Container>
      <Listing songs={songs} type="playlist" />
    </main>
  )
}

export default Playlist
