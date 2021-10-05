import { card } from "@/data/card"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"

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
            <Box
              component={Link}
              to={card.path}
              key={i}
              width="fit-content"
              display="flex"
              gap={1.2}
              flexDirection="column"
              sx={{ textDecoration: "none" }}
            >
              <img
                src={card.cover}
                alt={card.title}
                loading="lazy"
                width="140"
                height="140"
              />
              <Typography align="center" color="textSecondary">
                {card.title}
              </Typography>
            </Box>
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
            <Box
              key={i}
              width="fit-content"
              display="flex"
              gap={1.2}
              flexDirection="column"
            >
              <img
                src={card.cover}
                alt={card.title}
                loading="lazy"
                width="140"
                height="140"
              />
              <Typography align="center">{card.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
