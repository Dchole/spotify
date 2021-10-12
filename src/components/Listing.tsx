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

interface IProps {
  tracks?: SpotifyApi.TrackObjectSimplified[]
  playlistTracks?: SpotifyApi.PlaylistTrackObject[]
  type: "playlist" | "album" | "singles"
  gutters?: number
}

const Listing: React.FC<IProps> = ({
  type,
  tracks,
  playlistTracks,
  gutters
}) => {
  const tracksFromPlaylist = playlistTracks?.map(track => track.track)

  return (
    <List>
      {[...(tracks || tracksFromPlaylist || [])].map(track => (
        <ListItem
          key={track.name}
          sx={{ py: gutters, gap: type === "album" ? 1 : undefined }}
        >
          <ListItemAvatar>
            <Avatar
              component={Link}
              to={`/tracks/${track.id}`}
              variant="square"
              src={track.album?.images[1]?.url || coverFallback}
              alt={track.name}
              sx={type === "album" ? { width: 60, height: 60 } : undefined}
              imgProps={{
                width: "50",
                height: "50",
                loading: "lazy"
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={track.name}
            primaryTypographyProps={{
              component: Link,
              color: "textPrimary",
              to: `/tracks/${track.id}`,
              sx: { textTransform: "capitalize", textDecoration: "none" }
            }}
            secondary={
              type === "playlist" ? (
                <>
                  <span>{track.artists[0].name}</span>&bull;
                  <span>{track.album?.name}</span>
                </>
              ) : type === "singles" ? (
                <>
                  <span>{new Date().getFullYear()}</span>
                  &bull;
                  <span>{track.album?.name}</span>
                </>
              ) : undefined
            }
            secondaryTypographyProps={{
              component: Link,
              color: "textSecondary",
              to: `/artists/${track.artists[0].id}#${track.album}`,
              sx: { display: "flex", gap: 0.6, textDecoration: "none" }
            }}
          />
          <IconButton aria-label={`play ${track.name}`}>
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
