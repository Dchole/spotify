import { card } from "@/data/card"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Tile from "~/Tile"
import usePlaylists from "@/hooks/usePlaylists"
import useRecent from "@/hooks/useRecent"

const Home = () => {
  const { playlists } = usePlaylists()
  const { playHistory } = useRecent()

  return (
    <Box component="main" width="100%">
      {Boolean(playlists?.length) && (
        <Box component="section" sx={{ mb: 3 }} aria-labelledby="my-playlists">
          <Typography
            id="my-playlists"
            variant="h4"
            component="h2"
            sx={{ pl: 2 }}
          >
            My Playlists
          </Typography>
          <Box display="flex" gap={3} overflow="scroll" px={3} pt={2} pb={3}>
            {playlists?.map(({ id, name, type, images }) => (
              <Tile key={id} title={name} type={type} cover={images[1]?.url} />
            ))}
          </Box>
        </Box>
      )}
      {Boolean(playHistory?.length) && (
        <Box
          component="section"
          sx={{ mb: 3 }}
          aria-labelledby="recently-played"
        >
          <Typography
            id="recently-played"
            variant="h4"
            component="h2"
            sx={{ pl: 2 }}
          >
            Recently Played
          </Typography>
          <Box display="flex" gap={3} overflow="scroll" px={3} pt={2} pb={3}>
            {playHistory?.map(({ track }) => (
              <Tile
                key={track.id}
                title={track.name}
                cover={track.album.images[1].url}
                type={track.type}
              />
            ))}
          </Box>
        </Box>
      )}
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
