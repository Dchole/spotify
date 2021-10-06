import { Typography } from "@mui/material"
import { Box } from "@mui/system"

interface IProps {
  type: "album" | "playlist" | "artist"
  name?: string
  title?: string
  cover?: string
  author?: string
  createdAt?: string
  timeLength?: number
  numberOfSongs?: number
  numberOfListeners?: number
}

const Showcase: React.FC<IProps> = ({
  type,
  name,
  title,
  cover,
  author,
  createdAt,
  timeLength,
  numberOfSongs,
  numberOfListeners
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
      {type !== "artist" && (
        <Typography
          align="center"
          variant="body2"
          sx={{ textTransform: "capitalize" }}
        >
          {type}
        </Typography>
      )}
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
          {title || name}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="textSecondary"
          sx={{ display: "flex", gap: 0.6 }}
        >
          {type === "artist" ? (
            <>{numberOfListeners}M monthly listeners</>
          ) : (
            <>
              <span>{author}</span>&bull;<span>{createdAt}</span>&bull;
              <span>
                {numberOfSongs} songs, {timeLength} mins
              </span>
            </>
          )}
        </Typography>
      </div>
    </Box>
  )
}

export default Showcase
