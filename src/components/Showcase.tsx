import { Grid, Typography } from "@mui/material"
import artistFallback from "@/assets/artist.svg"
import albumFallback from "@/assets/album.svg"
import classes from "@/styles/cover-image.module.css"

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
    <Grid
      container
      alignItems="center"
      flexDirection="column"
      component="section"
      aria-label="showcase"
      sx={{
        mb: 2,
        gap: 1.5
      }}
    >
      <Grid item>
        {type !== "artist" && (
          <Typography
            align="center"
            variant="body2"
            sx={{ textTransform: "capitalize" }}
          >
            {type}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <img
          src={cover}
          alt={title}
          width="200"
          height="200"
          className={classes.cover}
        />
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography title={title || name} align="center" variant="h4" noWrap>
          {title || name}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="textSecondary"
          sx={{ display: "flex", justifyContent: "center", gap: 0.6 }}
        >
          {type === "artist" ? (
            <>{numberOfListeners}M monthly listeners</>
          ) : (
            <>
              <span>{author}</span>&bull;
              {createdAt && (
                <>
                  <span>{createdAt}</span>&bull;
                </>
              )}
              <span>
                {numberOfSongs} songs, {timeLength} mins
              </span>
            </>
          )}
        </Typography>
      </Grid>
    </Grid>
  )
}

Showcase.defaultProps = {
  get cover() {
    return this.type === "artist" ? artistFallback : albumFallback
  }
}

export default Showcase
