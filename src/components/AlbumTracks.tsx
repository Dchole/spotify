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
import { useEffect, useState } from "react"
import { spotifyApi } from "@/lib"
import { usePlayback } from "./context/Playback"

interface IProps {
  name: string
  album_uri?: string
  album_type?: string
  release_date?: string
  isAlbumPlaying?: boolean
  tracks: GetAlbumQuery["album"]["tracks"]
  gutters?: number
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const AlbumTracks: React.FC<IProps> = ({
  name,
  tracks,
  album_uri,
  album_type,
  isAlbumPlaying,
  release_date,
  gutters = 0,
  setPlaying
}) => {
  const { device_id } = usePlayback()
  const [playingTrack, setPlayingTrack] = useState("")

  const playTrack =
    (track_id: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      try {
        const { dataset } = event.currentTarget
        await spotifyApi.play({
          context_uri: album_uri,
          offset: { uri: String(dataset.track_uri) },
          device_id
        })
        setPlayingTrack(track_id)
        setPlaying(true)
      } catch (error) {
        console.log(error)
      }
    }

  const pauseTrack = async () => {
    try {
      await spotifyApi.pause()
      setPlayingTrack("")
      setPlaying(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then(({ body }) => body.item?.id && setPlayingTrack(body.item.id))
  }, [isAlbumPlaying])

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
            data-track_uri={track.uri}
            aria-label={`play ${track.name}`}
            onClick={
              playingTrack === track.id ? pauseTrack : playTrack(track.id)
            }
          >
            {playingTrack === track.id ? <Pause /> : <PlayArrow />}
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default AlbumTracks
