import { card } from "@/data/card"
import { Stack, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { Link } from "react-router-dom"
import Tabpanel, { tabs } from "~/Tabpanel"
import Tile from "~/Tile"

const Library = () => {
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
            {[...new Array(8)].map((_, i) => (
              <Box key={i} mb={2.5}>
                <Tile title={card.title} type="playlist" alignLeft />
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
            {[...new Array(8)].map((_, i) => (
              <Box key={i} mb={2.5}>
                <Tile title={card.title} type="album" alignLeft />
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
            {[...new Array(8)].map((_, i) => (
              <Box key={i} mb={2.5}>
                <Tile title={card.title} type="artist" alignLeft />
              </Box>
            ))}
          </Stack>
        </Tabpanel>
      </main>
    </>
  )
}

export default Library
