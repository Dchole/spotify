import { spotifyApi } from "@/lib"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { useAuth } from "./AuthContext"

type TCurrentlyPlaying = Pick<
  SpotifyApi.CurrentlyPlayingResponse,
  "context" | "is_playing" | "item" | "progress_ms"
> & { is_paused: boolean }

interface IContextProps {
  next: string
  prev: string
  player: Spotify.Player | null
  device_id: string
  updateCurrentlyPlaying: () => void
  currentlyPlayingTrack: TCurrentlyPlaying | null
}

const PlaybackContext = createContext<IContextProps | null>(null)

const PlaybackProvider: React.FC = ({ children }) => {
  const { token } = useAuth()
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] =
    useState<TCurrentlyPlaying | null>(null)
  const [device_id, setDevice_id] = useState("")
  const [{ next, prev }, setNextPrev] = useState({ next: "", prev: "" })

  const updateCurrentlyPlaying = useCallback(() => {
    spotifyApi.getMyCurrentPlayingTrack().then(({ body }) => {
      setCurrentlyPlayingTrack({
        item: body?.item,
        context: body?.context,
        is_playing: body?.is_playing,
        progress_ms: body?.progress_ms,
        is_paused: true
      })
    })
  }, [])

  useEffect(() => {
    const spotifyPlayerCDN = document.head.querySelector(
      'script[src="https://sdk.scdn.co/spotify-player.js"]'
    )

    if (token) {
      if (!spotifyPlayerCDN) {
        const script = document.createElement("script")
        script.setAttribute("src", "https://sdk.scdn.co/spotify-player.js")
        script.setAttribute("defer", "true")
        document.head.appendChild(script)
      }

      spotifyApi.setAccessToken(token)
      updateCurrentlyPlaying()

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
  }, [token, updateCurrentlyPlaying])

  useEffect(() => {
    player?.addListener("ready", ({ device_id }) => {
      console.log("Web Playback")
      setDevice_id(device_id)
    })

    player?.addListener("player_state_changed", state => {
      console.log(state?.paused)
      setCurrentlyPlayingTrack(prevState => {
        if (!prevState) return null

        return {
          ...prevState,
          is_paused: Boolean(state?.paused)
        }
      })

      setNextPrev({
        next: state?.track_window.next_tracks[0]?.id || "",
        prev: state?.track_window.previous_tracks[0]?.id || ""
      })
    })

    return () => player?.disconnect()
  }, [player])

  return (
    <PlaybackContext.Provider
      value={{
        next,
        prev,
        player,
        device_id,
        currentlyPlayingTrack,
        updateCurrentlyPlaying
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
