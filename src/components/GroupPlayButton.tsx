import { PauseCircle, PlayCircle } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { usePlayback } from "./context/Playback"

interface IProps {
  groupPlaying: boolean
  handlePlay: () => Promise<void>
  handlePause: () => Promise<void>
}

const GroupPlayButton: React.FC<IProps> = ({
  handlePlay,
  handlePause,
  groupPlaying
}) => {
  const { loading, playback } = usePlayback()

  return (
    <>
      {groupPlaying ? (
        <IconButton
          color="primary"
          aria-label="pause"
          disabled={loading}
          onClick={handlePause}
        >
          <PauseCircle sx={{ fontSize: "3.5rem" }} />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          disabled={loading}
          onClick={handlePlay}
          aria-label={playback.started_playing ? "resume" : "play all"}
        >
          <PlayCircle sx={{ fontSize: "3.5rem" }} />
        </IconButton>
      )}
    </>
  )
}

export default GroupPlayButton
