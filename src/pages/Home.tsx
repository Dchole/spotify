import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Tile from "~/Tile"
import usePlaylists from "@/hooks/usePlaylists"
import useRecent from "@/hooks/useRecent"
import useTopTracks from "@/hooks/useTopTracks"

const Home = () => {
  const { playlists } = usePlaylists()
  const { playHistory } = useRecent()
  const { topTracks } = useTopTracks()

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
              <Tile
                key={id}
                id={id}
                title={name}
                type={type}
                cover={images[1]?.url}
              />
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
                id={track.id}
                title={track.name}
                cover={track.album.images[1].url}
                type={track.type}
              />
            ))}
          </Box>
        </Box>
      )}
      {Boolean(topTracks?.length) && (
        <Box component="section" sx={{ mb: 3 }} aria-labelledby="top-tracks">
          <Typography
            id="top-tracks"
            variant="h4"
            component="h2"
            sx={{ pl: 2 }}
          >
            Top Tracks
          </Typography>
          <Box display="flex" gap={3} overflow="scroll" px={3} pt={2} pb={3}>
            {topTracks?.map(({ id, name, type, album }) => (
              <Tile
                key={id}
                id={id}
                title={name}
                type={type}
                cover={album.images[0].url}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Home
