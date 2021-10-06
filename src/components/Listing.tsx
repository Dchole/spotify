import { slugify } from "@/utils"
import { PlayArrow } from "@mui/icons-material"
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material"
import { Link } from "react-router-dom"

interface ISong {
  title: string
  cover: string
  album: string
  artist: string
  listeners: number
  dateAdded?: string
}

interface IProps {
  songs: ISong[]
  type: "playlist" | "album" | "singles"
  gutters?: number
}

const Listing: React.FC<IProps> = ({ type, songs, gutters }) => {
  return (
    <List>
      {songs.map(song => (
        <ListItem
          key={song.title}
          sx={{ py: gutters, gap: type === "album" ? 1 : undefined }}
        >
          <ListItemAvatar>
            <Avatar
              component={Link}
              to={`/songs/${slugify(song.title)}`}
              variant="square"
              src={song.cover}
              alt={song.title}
              sx={type === "album" ? { width: 60, height: 60 } : undefined}
              imgProps={{
                width: "50",
                height: "50",
                loading: "lazy"
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={song.title}
            primaryTypographyProps={{
              component: Link,
              color: "textPrimary",
              to: `/songs/${slugify(song.title)}`,
              sx: { textTransform: "capitalize", textDecoration: "none" }
            }}
            secondary={
              type === "playlist" ? (
                <>
                  <span>{song.artist}</span>&bull;<span>{song.album}</span>
                </>
              ) : type === "singles" ? (
                <>
                  <span>{new Date(song.dateAdded || "").getFullYear()}</span>
                  &bull;
                  <span>{song.album}</span>
                </>
              ) : undefined
            }
            secondaryTypographyProps={{
              component: Link,
              color: "textSecondary",
              to: `/artists/${slugify(song.artist)}#${song.album}`,
              sx: { display: "flex", gap: 0.6, textDecoration: "none" }
            }}
          />
          <IconButton aria-label={`play ${song.title}`}>
            <PlayArrow />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

Listing.defaultProps = {
  gutters: 0
}

export default Listing
