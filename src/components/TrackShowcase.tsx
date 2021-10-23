import { Typography, TypographyTypeMap } from "@mui/material"
import { Box } from "@mui/system"
import { forwardRef } from "react"
import classes from "@/styles/full-width.module.css"
import coverFallback from "@/assets/track.svg"
import { Track } from "@/generated/graphql"

interface IProps extends Pick<Track, "name" | "cover_image"> {
  albumName: string
  artistName: string
}

type TTypography = TypographyTypeMap["props"] & {
  component?: React.ReactNode & React.ElementType
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

const TrackShowcase: React.FC<IProps> = ({
  name,
  cover_image,
  albumName,
  artistName
}) => {
  return (
    <Box
      id="showcase"
      component="section"
      aria-label="showcase"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1.5}
      mb={2}
    >
      <Text>{albumName}</Text>
      <Box width="100%" height="calc(100vw - 32px)">
        <img
          src={cover_image || coverFallback}
          alt={name}
          className={classes["full-width"]}
        />
      </Box>
      <div>
        <Text variant="h4" component="p">
          {name}
        </Text>
        <Text variant="body2" color="textSecondary">
          {artistName}
        </Text>
      </div>
    </Box>
  )
}

export default TrackShowcase
