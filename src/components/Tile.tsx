import { slugify } from "@/utils"
import { Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import artistFallback from "@/assets/artist.svg"
import albumFallback from "@/assets/album.svg"

interface IProps {
  cover?: string
  title: string
  type: "artist" | "playlist" | "album"
  alignLeft?: boolean
}

const Tile: React.FC<IProps> = ({ type, title, cover, alignLeft }) => {
  const iPhone5 = useMediaQuery("(max-width: 320px)")
  const galaxyFold = useMediaQuery("(max-width: 280px)")

  return (
    <Box
      component={Link}
      to={`/${type}s/${slugify(title)}`}
      width="fit-content"
      display="flex"
      gap={1.2}
      flexDirection="column"
      sx={{ textDecoration: "none" }}
    >
      <img
        src={cover}
        alt=""
        loading="lazy"
        width={galaxyFold ? "100" : iPhone5 ? "124" : "140"}
        height={galaxyFold ? "100" : iPhone5 ? "124" : "140"}
      />
      <Typography align={alignLeft ? "left" : "center"} color="textSecondary">
        {title}
      </Typography>
    </Box>
  )
}

Tile.defaultProps = {
  get cover() {
    return this.type === "artist" ? artistFallback : albumFallback
  }
}

export default Tile
