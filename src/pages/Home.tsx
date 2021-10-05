import { card } from "@/data/card"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

const Home = () => {
  return (
    <Box component="main" width="100%">
      <section aria-labelledby="recently-played">
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
      </section>
    </Box>
  )
}

export default Home
