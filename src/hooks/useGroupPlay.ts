import { useEffect, useState } from "react"
import { usePlayback } from "~/context/Playback"

const useGroupPlay = (
  group_uri?: string,
  tracks?: { id?: string; uri?: string }[]
) => {
  const { play, pause, playback } = usePlayback()
  const [playingTrack, setPlayingTrack] = useState("")
  const [isTrackPlaying, setIsTrackPlaying] = useState(false)
  const [groupPlaying, setGroupPlaying] = useState(false)

  useEffect(() => {
    if (playback.context_uri === group_uri) {
      setPlayingTrack(playback.current_track)
      setIsTrackPlaying(playback.started_playing && !playback.is_paused)
    }
  }, [playback, group_uri])

  useEffect(() => {
    setGroupPlaying(isTrackPlaying)
  }, [isTrackPlaying])

  useEffect(() => {
    if (tracks?.length && groupPlaying) {
      setPlayingTrack(playback.current_track)
    }
  }, [tracks, groupPlaying])

  const handlePlay = async () => {
    if (tracks) {
      playback.started_playing &&
      tracks.some(track => track.id === playback.current_track)
        ? await play()
        : await play({
            uris: tracks?.map(track => track.uri || "")
          })
    } else {
      playback.context_uri === group_uri && playback.started_playing
        ? await play()
        : await play({
            context_uri: group_uri
          })
    }

    setGroupPlaying(true)
    setIsTrackPlaying(true)
  }

  const handlePause = async () => {
    await pause()
    setGroupPlaying(false)
    setIsTrackPlaying(false)
  }

  const playTrack = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const { dataset } = event.currentTarget

      const track = dataset.track ? JSON.parse(dataset.track) : {}

      playingTrack === track.id && playback.started_playing
        ? await play()
        : await play({
            context_uri: group_uri,
            uris: tracks?.map(track => track.uri || ""),
            offset: { uri: track.uri }
          })

      setIsTrackPlaying(true)
    } catch (error) {
      console.log(error)
    }
  }

  const pauseTrack = async () => {
    try {
      await pause()
      setIsTrackPlaying(false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    groupPlaying,
    handlePlay,
    handlePause,
    playingTrack,
    isTrackPlaying,
    playTrack,
    pauseTrack
  }
}

export default useGroupPlay
