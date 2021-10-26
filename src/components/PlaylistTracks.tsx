import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material"
import { Link } from "react-router-dom"
import { GetPlaylistQuery } from "@/generated/graphql"
import { slugify } from "@/utils"
import coverFallback from "@/assets/track.svg"
import GroupTrackButton from "./GroupTrackButton"

interface IProps {
  tracks: GetPlaylistQuery["playlist"]["tracks"]
  gutters?: number
  playingTrack: string
  isTrackPlaying: boolean
  playTrack: (event: React.MouseEvent<HTMLButtonElement>) => void
  pauseTrack: () => void
}

const Listing: React.FC<IProps> = ({
  tracks,
  playingTrack,
  playTrack,
  pauseTrack,
  isTrackPlaying,
  gutters = 0
}) => {
  return (
    <List>
      {tracks?.map(track => (
        <ListItem key={track.id} sx={{ py: gutters }}>
          <ListItemAvatar>
            <Avatar
              component={Link}
              to={`/tracks/${track.id}`}
              variant="square"
              src={track.track.cover_image || coverFallback}
              alt={track.track.name}
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
              <>
                <span>{track.track.artists[0].name}</span>&bull;
                <span>{track.track.album?.name}</span>
              </>
            }
            secondaryTypographyProps={{
              component: Link,
              color: "textSecondary",
              to: `/artists/${track.track.artists[0].id}#${slugify(
                track.track.album?.name || ""
              )}`,
              sx: { display: "flex", gap: 0.6, textDecoration: "none" }
            }}
          />
          <GroupTrackButton
            playTrack={playTrack}
            pauseTrack={pauseTrack}
            playingTrack={playingTrack}
            isTrackPlaying={isTrackPlaying}
            track={{
              id: track.id,
              uri: track.track.uri,
              name: track.track.name
            }}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default Listing
