import { Typography, TypographyTypeMap } from "@mui/material"
import { Box } from "@mui/system"
import { forwardRef } from "react"
import classes from "@/styles/full-width.module.css"

interface IProps {
  title: string
  album: string
  cover?: string
  artist: string
}

type TTypography = TypographyTypeMap["props"] & {
  component?: React.ReactNode | React.ElementType
}

const Text = forwardRef<HTMLParagraphElement | HTMLHeadingElement, TTypography>(
  function Text(props, ref) {
    return (
      <Typography
        {...props}
        ref={ref}
        sx={{ textTransform: "capitalize" }}
        align="center"
      />
    )
  }
)

const SongShowcase: React.FC<IProps> = ({ title, cover, album, artist }) => {
  return (
    <Box
      component="section"
      aria-label="showcase"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1.5}
      mb={4}
    >
      <Text>{album}</Text>
      <Box width="100%" height="calc(100vw - 32px)">
        <img src={cover} alt={title} className={classes["full-width"]} />
      </Box>
      <div>
        <Text variant="h4" component="p">
          {title}
        </Text>
        <Text variant="body2" color="textSecondary">
          {artist}
        </Text>
      </div>
    </Box>
  )
}

SongShowcase.defaultProps = {
  cover: "/src/assets/song.svg"
}

export default SongShowcase
