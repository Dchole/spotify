import clsx from "clsx"
import { Grid, Typography, useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom"
import { Playlist, EType } from "@/generated/graphql"
import artistFallback from "@/assets/artist.svg"
import albumFallback from "@/assets/album.svg"
import trackFallback from "@/assets/track.svg"
import classes from "@/styles/rounded.module.css"
import styles from "@/styles/cover-image.module.css"

interface IProps extends Partial<Playlist> {
  path?: string
  alignLeft?: boolean
}

const Tile: React.FC<IProps> = ({
  id,
  name,
  type,
  path,
  cover_image,
  alignLeft
}) => {
  const iPhone5 = useMediaQuery("(max-width: 320px)")
  const galaxyFold = useMediaQuery("(max-width: 280px)")

  const fallbackImage =
    type === EType["Artist"]
      ? artistFallback
      : type === EType["Track"]
      ? trackFallback
      : albumFallback

  return (
    <Grid
      container
      wrap="nowrap"
      component={Link}
      to={path || `/${type?.toLowerCase()}s/${id}`}
      display="flex"
      flexDirection="column"
      sx={{
        width: galaxyFold ? 100 : iPhone5 ? 124 : 140,
        textDecoration: "none"
      }}
    >
      <Grid item>
        <img
          src={cover_image || fallbackImage}
          alt=""
          loading="lazy"
          className={
            type === EType["Artist"]
              ? clsx(classes.rounded, styles.cover)
              : styles.cover
          }
          width={galaxyFold ? "100" : iPhone5 ? "124" : "140"}
          height={galaxyFold ? "100" : iPhone5 ? "124" : "140"}
        />
      </Grid>
      <Grid xs item zeroMinWidth>
        <Typography
          align={alignLeft ? "left" : "center"}
          color="textSecondary"
          noWrap
        >
          {name}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Tile
