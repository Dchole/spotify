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
import coverFallback from "@/assets/song.svg"
import { GetPlaylistQuery } from "@/generated/graphql"
import { slugify } from "@/utils"

interface IProps {
  tracks?: SpotifyApi.TrackObjectSimplified[]
  playlistTracks?: GetPlaylistQuery["playlist"]["tracks"]
  type: "playlist" | "album" | "singles"
  gutters?: number
}

const Listing: React.FC<IProps> = ({
  type,
  tracks,
  playlistTracks,
  gutters
}) => {
  return (
    <List>
      {playlistTracks?.map(track => (
        <ListItem
          key={track.id}
          sx={{ py: gutters, gap: type === "album" ? 1 : undefined }}
        >
          <ListItemAvatar>
            <Avatar
              component={Link}
              to={`/tracks/${track.id}`}
              variant="square"
              src={track.track.cover_image || coverFallback}
              alt={track.track.name}
              sx={type === "album" ? { width: 60, height: 60 } : undefined}
              imgProps={{
                width: "50",
                height: "50",
                loading: "lazy"
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={track.track.name}
            primaryTypographyProps={{
              component: Link,
              color: "textPrimary",
              to: `/tracks/${track.id}`,
              sx: { textTransform: "capitalize", textDecoration: "none" }
            }}
            secondary={
              type === "playlist" ? (
                <>
                  <span>{track.track.artists[0].name}</span>&bull;
                  <span>{track.track.album?.name}</span>
                </>
              ) : type === "singles" ? (
                <>
                  <span>
                    {new Date(track.track.album.release_date).getFullYear()}
                  </span>
                  &bull;
                  <span>{track.track.album?.name}</span>
                </>
              ) : undefined
            }
            secondaryTypographyProps={{
              component: Link,
              color: "textSecondary",
              to: `/artists/${track.track.artists[0].id}#${slugify(
                track.track.album.name
              )}`,
              sx: { display: "flex", gap: 0.6, textDecoration: "none" }
            }}
          />
          <IconButton aria-label={`play ${track.track.name}`}>
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
