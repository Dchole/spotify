import {
  EType,
  useGetFollowedArtistsLazyQuery,
  useGetPlaylistsLazyQuery,
  useGetSavedAlbumsLazyQuery
} from "@/generated/graphql"
import { Stack, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { unstable_capitalize } from "@mui/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Tabpanel, { tabs } from "~/Tabpanel"
import Tile from "~/Tile"

const collections: ["playlists", "albums", "artists"] = [
  "playlists",
  "albums",
  "artists"
]

const Library = () => {
  const [getPlaylists, { data: playlistsData }] = useGetPlaylistsLazyQuery()
  const [getAlbums, { data: albumsData }] = useGetSavedAlbumsLazyQuery()
  const [getArtists, { data: artistsData }] = useGetFollowedArtistsLazyQuery()

  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get("tab") || tabs[0]

    return tabs.indexOf(tab)
  })

  useEffect(() => {
    switch (value) {
      case 0:
        getPlaylists()
        break
      case 1:
        getAlbums()
        break
      case 2:
        getArtists()
        break
      default:
        break
    }
  }, [value])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="library items"
        variant="fullWidth"
        sx={{
          mt: -2,
          borderBottom: ({ palette }) => `1px solid ${palette.divider}`
        }}
      >
        {collections.map(collection => (
          <Tab
            key={collection}
            component={Link}
            to={`?tab=${collection}`}
            label={unstable_capitalize(collection)}
            id={`${collection}-tab`}
            aria-controls={collection}
          />
        ))}
      </Tabs>
      <main>
        {[
          playlistsData?.playlists,
          albumsData?.saved_albums,
          artistsData?.followed_artists
        ].map((data, index) => (
          <Tabpanel key={index} value={value} item={collections[index]}>
            <Stack
              sx={{ mx: 2 }}
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {index === 0 && (
                <Box mb={2.5}>
                  <Tile
                    path="/liked-songs"
                    id="liked-songs"
                    name="Liked Songs"
                    type={EType["Playlist"]}
                    alignLeft
                  />
                </Box>
              )}
              {data?.map(({ id, name, type, cover_image }) => (
                <Box key={id} mb={2.5}>
                  <Tile
                    id={id}
                    name={name}
                    type={type}
                    cover_image={cover_image}
                    alignLeft={index !== 2}
                  />
                </Box>
              ))}
            </Stack>
          </Tabpanel>
        ))}
      </main>
    </>
  )
}

export default Library
