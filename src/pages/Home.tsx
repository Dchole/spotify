import {
  Recent,
  useGetNewReleasesQuery,
  useGetPlaylistsQuery,
  useGetRecentlyPlayedQuery,
  useGetRecommendationsQuery,
  useGetTopTracksQuery
} from "@/generated/graphql"
import { slugify } from "@/utils"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Tile from "~/Tile"

const collections = [
  "my playlists",
  "top tracks",
  "recently played",
  "new releases",
  "my recommendations"
]

const Home = () => {
  const recommendations = useGetRecommendationsQuery().data?.recommendation
  const newReleases = useGetNewReleasesQuery().data?.new_releases
  const playlists = useGetPlaylistsQuery().data?.playlists
  const recentlyPlayed = useGetRecentlyPlayedQuery().data?.recently_played
  const topTracks = useGetTopTracksQuery().data?.top_tracks

  return (
    <Box component="main" width="100%">
      {[playlists, topTracks, recentlyPlayed, newReleases, recommendations].map(
        (collection, index) => (
          <Box
            key={index}
            id={`${slugify(collections[index])}`}
            component="section"
            sx={{ mb: 3 }}
            aria-labelledby={`${slugify(collections[index])}-heading`}
          >
            <Typography
              id={`${slugify(collections[index])}-heading`}
              variant="h4"
              component="h2"
              sx={{ pl: 2, textTransform: "capitalize" }}
            >
              {collections[index]}
            </Typography>
            <Box display="flex" gap={3} overflow="scroll" px={3} pt={2} pb={3}>
              {collection?.map(({ id, name, type, cover_image, ...rest }) => {
                const { custom_id } = rest as Recent

                return (
                  <Tile
                    key={custom_id || id}
                    id={id}
                    name={name}
                    type={type}
                    cover_image={cover_image}
                  />
                )
              })}
            </Box>
          </Box>
        )
      )}
    </Box>
  )
}

export default Home
