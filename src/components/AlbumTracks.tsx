import { Pause, PlayArrow } from "@mui/icons-material"
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material"
import { Link } from "react-router-dom"
import { GetAlbumQuery } from "@/generated/graphql"
import { slugify } from "@/utils"
import coverFallback from "@/assets/track.svg"

interface IProps {
  name: string
  album_type?: string
  release_date?: string
  tracks: GetAlbumQuery["album"]["tracks"]
  gutters?: number
  playingTrack: string
  isTrackPlaying: boolean
  playTrack: (event: React.MouseEvent<HTMLButtonElement>) => void
  pauseTrack: () => void
}

const AlbumTracks: React.FC<IProps> = ({
  name,
  tracks,
  album_type,
  release_date,
  gutters = 0,
  playingTrack,
  isTrackPlaying,
  playTrack,
  pauseTrack
}) => {
  return (
    <List>
      {tracks?.map(track => (
        <ListItem key={track.id} sx={{ py: gutters, gap: 1 }}>
          <ListItemAvatar>
            <Avatar
              component={Link}
              to={`/tracks/${track.id}`}
              variant="square"
              src={track.cover_image || coverFallback}
              alt={track.name}
              sx={{ width: 50, height: 50 }}
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
              album_type === "singles" ? (
                <>
                  <span>{new Date(release_date || "").getFullYear()}</span>
                  &bull;
                  <span>{name}</span>
                </>
              ) : undefined
            }
            secondaryTypographyProps={{
              component: Link,
              color: "textSecondary",
              to: `/artists/${track.artists[0].id}#${slugify(name)}`,
              sx: { display: "flex", gap: 0.6, textDecoration: "none" }
            }}
          />
          <IconButton
            data-track={JSON.stringify({ uri: track.uri, id: track.id })}
            aria-label={`play ${track.name}`}
            onClick={
              playingTrack === track.id && isTrackPlaying
                ? pauseTrack
                : playTrack
            }
          >
            {playingTrack === track.id && isTrackPlaying ? (
              <Pause />
            ) : (
              <PlayArrow />
            )}
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default AlbumTracks
