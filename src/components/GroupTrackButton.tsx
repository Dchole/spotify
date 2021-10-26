import { Track } from "@/generated/graphql"
import { Pause, PlayArrow } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { usePlayback } from "./context/Playback"

interface IProps {
  playingTrack: string
  isTrackPlaying: boolean
  playTrack: (event: React.MouseEvent<HTMLButtonElement>) => void
  pauseTrack: () => void
  track: Pick<Track, "id" | "uri" | "name">
}

const GroupTrackButton: React.FC<IProps> = ({
  track,
  playTrack,
  pauseTrack,
  playingTrack,
  isTrackPlaying
}) => {
  const { playback } = usePlayback()

  return (
    <>
      {playingTrack === track.id && isTrackPlaying ? (
        <IconButton
          data-track={JSON.stringify({ uri: track.uri, id: track.id })}
          aria-label="pause"
          onClick={pauseTrack}
        >
          <Pause />
        </IconButton>
      ) : (
        <IconButton
          data-track={JSON.stringify({ uri: track.uri, id: track.id })}
          aria-label={
            playback.started_playing ? "resume" : `play ${track.name}`
          }
          onClick={playTrack}
        >
          <PlayArrow />
        </IconButton>
      )}
    </>
  )
}

export default GroupTrackButton
