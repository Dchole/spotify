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
import { GetArtistQuery } from "@/generated/graphql"
import { slugify } from "@/utils"
import coverFallback from "@/assets/track.svg"

interface IProps {
  tracks?: GetArtistQuery["artist"]["tracks"]
  gutters?: number
}

const AlbumTracks: React.FC<IProps> = ({ tracks, gutters = 0 }) => {
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
              <>
                {track.album?.release_date && (
                  <span>
                    {new Date(track.album.release_date).getFullYear()}
                  </span>
                )}
                &bull;
                <span>{track.album?.name}</span>
              </>
            }
            secondaryTypographyProps={{
              component: Link,
              color: "textSecondary",
              to: `/albums/${track.album?.id}#${slugify(track.name)}`,
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

export default AlbumTracks
