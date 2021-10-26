import { Grid, Typography } from "@mui/material"
import artistFallback from "@/assets/artist.svg"
import albumFallback from "@/assets/album.svg"
import classes from "@/styles/cover-image.module.css"
import { EType, Album } from "@/generated/graphql"

interface IProps
  extends Pick<
    Album,
    "type" | "cover_image" | "popularity" | "numberOfTracks"
  > {
  name: string
  duration?: number
  release_date?: string
  owner?: string
  artistName?: string
}

const Showcase: React.FC<IProps> = ({
  type,
  name,
  cover_image,
  artistName,
  owner,
  release_date,
  duration,
  popularity,
  numberOfTracks
}) => {
  const fallbackImage =
    type === EType["Artist"] ? artistFallback : albumFallback

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
        {type !== EType["Artist"] && (
          <Typography
            align="center"
            variant="body2"
            sx={{ textTransform: "capitalize" }}
          >
            {type.toLowerCase()}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <img
          src={cover_image || fallbackImage}
          alt={name}
          width="200"
          height="200"
          className={classes.cover}
        />
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography title={name} align="center" variant="h4" noWrap>
          {name}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="textSecondary"
          sx={{ display: "flex", justifyContent: "center", gap: 0.6 }}
        >
          {type === EType["Artist"] ? (
            <>{popularity}M monthly listeners</>
          ) : (
            <>
              <span>{owner || artistName}</span>&bull;
              {release_date && (
                <>
                  <span>{new Date(release_date).getFullYear()}</span>&bull;
                </>
              )}
              <span>{numberOfTracks} songs</span>
              {duration && <span>,&nbsp;{duration} mins</span>}
            </>
          )}
        </Typography>
      </Grid>
    </Grid>
  )
}

Showcase.defaultProps = {
  get cover_image() {
    return this.type === EType["Artist"] ? artistFallback : albumFallback
  }
}

export default Showcase
