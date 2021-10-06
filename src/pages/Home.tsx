import { card } from "@/data/card"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Tile from "~/Tile"

const Home = () => {
  return (
    <Box component="main" width="100%">
      <Box component="section" sx={{ mb: 3 }} aria-labelledby="recently-played">
        <Typography
          id="recently-played"
          variant="h4"
          component="h2"
          sx={{ pl: 2 }}
        >
          Recently Played
        </Typography>
        <Box display="flex" gap={3} overflow="scroll" px={3} pt={2} pb={3}>
          {[1, 2, 3].map(i => (
            <Tile key={i} title={card.title} type="album" />
          ))}
        </Box>
      </Box>
      <Box component="section" sx={{ mb: 3 }} aria-labelledby="top-playlists">
        <Typography
          id="top-playlists"
          variant="h4"
          component="h2"
          sx={{ pl: 2 }}
        >
          Top Playlists
        </Typography>
        <Box display="flex" gap={3} overflow="scroll" px={3} pt={2} pb={3}>
          {[1, 2, 3].map(i => (
            <Tile key={i} title={card.title} type="album" />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
