import { spotifyApi } from "@/lib"
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react"
import { useAuth } from "./AuthContext"
import { initialState, playbackReducer, TState } from "./playbackReducer"

interface IContextProps {
  playback: TState
  loading: boolean
  device_id: string
  player: Spotify.Player | null
  play: (params?: SpotifyApi.PlayParameterObject) => Promise<void>
  pause: () => Promise<void>
  next: () => Promise<void>
  prev: () => Promise<void>
  seek: (positionMs: number) => Promise<void>
  fastRewind: () => Promise<void>
  fastForward: () => Promise<void>
  syncProgress: (progress: number) => void
}

const PlaybackContext = createContext<IContextProps | null>(null)

const PlaybackProvider: React.FC = ({ children }) => {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [device_id, setDevice_id] = useState("")
  const [playback, dispatch] = useReducer(playbackReducer, initialState)

  useEffect(() => {
    const spotifyCDN = "https://sdk.scdn.co/spotify-player.js"

    const spotifyPlayerCDN = document.head.querySelector(
      `script[src="${spotifyCDN}"]`
    )

    if (token) {
      if (!spotifyPlayerCDN) {
        const script = document.createElement("script")
        script.setAttribute("src", spotifyCDN)
        document.head.appendChild(script)
      }

      spotifyApi.setAccessToken(token)

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Web Playback",
          getOAuthToken: cb => {
            cb(token)
          },
          volume: 0.5
        })

        player.connect().then(success => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            )
          }
        })

        setPlayer(player)
      }
    }
  }, [token])

  useEffect(() => {
    player?.addListener("ready", ({ device_id }) => {
      setDevice_id(device_id)
    })

    player?.addListener("player_state_changed", state => {
      if (state) {
        dispatch({
          type: "SET_PLAYBACK",
          payload: {
            duration: state.duration,
            context_uri: state.context.uri || "",
            current_track: state.track_window.current_track?.id || "",
            next_track: state.track_window.next_tracks[0]?.id || "",
            prev_track: state.track_window.previous_tracks[0]?.id || ""
          }
        })
      }
    })

    return () => player?.disconnect()
  }, [player])

  /**
   * Play/Resume Track(s).
   * Pass in necessary parameter to start playing.
   * Leave parameters empty to resume already playing track
   * @param params
   */
  const play = async (params?: SpotifyApi.PlayParameterObject) => {
    const options = params ? { ...params, device_id } : undefined

    try {
      setLoading(true)
      await spotifyApi.play(options as Record<string, unknown>)
      dispatch({ type: params ? "PLAY" : "RESUME" })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const pause = async () => {
    try {
      setLoading(true)
      await spotifyApi.pause()
      dispatch({ type: "PAUSE" })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const next = async () => {
    try {
      setLoading(true)
      dispatch({ type: "NEXT" })
      await spotifyApi.skipToNext()
      dispatch({ type: "PLAY" })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const prev = async () => {
    try {
      setLoading(true)
      dispatch({ type: "PREV" })
      await spotifyApi.skipToPrevious()
      dispatch({ type: "PLAY" })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fastForward = async () => {
    try {
      const position = playback.progress + 10_000
      await spotifyApi.seek(position)
      dispatch({ type: "PROGRESS", payload: { progress: position } })
    } catch (error) {
      console.log(error)
    }
  }

  const fastRewind = async () => {
    try {
      const position = playback.progress - 10_000
      await spotifyApi.seek(position)
      dispatch({ type: "PROGRESS", payload: { progress: position } })
    } catch (error) {
      console.log(error)
    }
  }

  const seek = async (positionMs: number) => {
    try {
      await spotifyApi.seek(positionMs)
      dispatch({ type: "PROGRESS", payload: { progress: positionMs } })
    } catch (error) {
      console.log(error)
    }
  }

  const syncProgress = async (progress: number) => {
    dispatch({ type: "PROGRESS", payload: { progress } })
  }

  return (
    <PlaybackContext.Provider
      value={{
        play,
        pause,
        next,
        prev,
        seek,
        fastRewind,
        fastForward,
        syncProgress,
        player,
        loading,
        playback,
        device_id
      }}
    >
      {children}
    </PlaybackContext.Provider>
  )
}

export const usePlayback = () => {
  const context = useContext(PlaybackContext)

  if (!context) {
    throw new Error("usePlayback was called without a Provider")
  }

  return context
}

export default PlaybackProvider
