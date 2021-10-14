import clsx from "clsx"
import { Grid, Typography, useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom"
import artistFallback from "@/assets/artist.svg"
import albumFallback from "@/assets/album.svg"
import classes from "@/styles/rounded.module.css"
import styles from "@/styles/cover-image.module.css"

interface IProps {
  id: string
  title: string
  type: "artist" | "playlist" | "album" | "track"
  path?: string
  cover?: string
  alignLeft?: boolean
}

const Tile: React.FC<IProps> = ({
  id,
  type,
  path,
  title,
  cover,
  alignLeft
}) => {
  const iPhone5 = useMediaQuery("(max-width: 320px)")
  const galaxyFold = useMediaQuery("(max-width: 280px)")

  return (
    <Grid
      container
      wrap="nowrap"
      component={Link}
      to={path || `/${type}s/${id}`}
      display="flex"
      flexDirection="column"
      sx={{
        width: galaxyFold ? 100 : iPhone5 ? 124 : 140,
        textDecoration: "none"
      }}
    >
      <Grid item>
        <img
          src={cover}
          alt=""
          loading="lazy"
          className={
            type === "artist"
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
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}

Tile.defaultProps = {
  get cover() {
    return this.type === "artist" ? artistFallback : albumFallback
  }
}

export default Tile
