import { useGetPlaylistsQuery } from "@/generated/graphql"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Tile from "~/Tile"

const Home = () => {
  const { data } = useGetPlaylistsQuery()

  return (
    <Box component="main" width="100%">
      {Boolean(data?.playlists.length) && (
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
            {data?.playlists.map(({ id, name, cover_image }) => (
              <Tile
                key={id}
                id={id}
                name={name}
                type="playlist"
                cover_image={cover_image}
              />
            ))}
          </Box>
        </Box>
      )}
      {/* {Boolean(playHistory?.length) && (
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
      )} */}
    </Box>
  )
}

export default Home
