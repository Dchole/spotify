import { Typography } from "@mui/material"
import { Box } from "@mui/system"

interface IProps {
  type: "album" | "playlist" | "artist"
  title: string
  cover?: string
  author: string
  createdAt: string
  timeLength: number
  numberOfSongs: number
}

const Showcase: React.FC<IProps> = ({
  type,
  title,
  cover,
  author,
  createdAt,
  timeLength,
  numberOfSongs
}) => {
  return (
    <Box
      mb={2}
      gap={1.5}
      display="flex"
      alignItems="center"
      flexDirection="column"
      component="section"
      aria-label="showcase"
    >
      <Typography
        align="center"
        variant="body2"
        sx={{ textTransform: "capitalize" }}
      >
        {type}
      </Typography>
      <img
        src={
          cover || `/src/assets/${type === "artist" ? "artist" : "album"}.svg`
        }
        alt={title}
        width="200"
        height="200"
      />
      <div>
        <Typography align="center" variant="h4">
          {title}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="textSecondary"
          sx={{ display: "flex", gap: 0.6 }}
        >
          <span>{author}</span>&bull;<span>{createdAt}</span>&bull;
          <span>
            {numberOfSongs}, {timeLength}
          </span>
        </Typography>
      </div>
    </Box>
  )
}

Showcase.defaultProps = {
  cover: undefined
}

export default Showcase
