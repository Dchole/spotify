import { card } from "@/data/card"
import useFollowedArtists from "@/hooks/useFollowedArtists"
import usePlaylists from "@/hooks/usePlaylists"
import useSavedAlbums from "@/hooks/useSavedAlbums"
import { Stack, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { Link } from "react-router-dom"
import Tabpanel, { tabs } from "~/Tabpanel"
import Tile from "~/Tile"

const Library = () => {
  const { playlists } = usePlaylists()
  const { albums } = useSavedAlbums()
  const { artists } = useFollowedArtists()
  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get("tab") || tabs[0]

    return tabs.indexOf(tab)
  })

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
        <Tab
          component={Link}
          to="?tab=playlists"
          label="Playlists"
          id="playlists-tab"
          aria-controls="playlists"
        />
        <Tab
          component={Link}
          to="?tab=albums"
          label="Albums"
          id="albums-tab"
          aria-controls="albums"
        />
        <Tab
          component={Link}
          to="?tab=artists"
          label="Artists"
          id="artists-tab"
          aria-controls="artists"
        />
      </Tabs>
      <main>
        <Tabpanel value={value} item="playlists">
          <Stack
            sx={{ mx: 2 }}
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {playlists?.map(({ id, name, type, images }) => (
              <Box key={id} mb={2.5}>
                <Tile
                  title={name}
                  type={type}
                  cover={images[1]?.url}
                  alignLeft
                />
              </Box>
            ))}
          </Stack>
        </Tabpanel>
        <Tabpanel value={value} item="albums">
          <Stack
            sx={{ mx: 2 }}
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {albums?.map(({ album }) => (
              <Box key={album.id} mb={2.5}>
                <Tile
                  title={album.name}
                  type={album.type}
                  cover={album.images[1]?.url}
                  alignLeft
                />
              </Box>
            ))}
          </Stack>
        </Tabpanel>
        <Tabpanel value={value} item="artists">
          <Stack
            sx={{ mx: 2 }}
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {artists?.map(({ id, name, type, images }) => (
              <Box key={id} mb={2.5}>
                <Tile title={name} type={type} cover={images[1]?.url} />
              </Box>
            ))}
          </Stack>
        </Tabpanel>
      </main>
    </>
  )
}

export default Library
