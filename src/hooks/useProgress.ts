import { useEffect } from "react"
import { usePlayback } from "~/context/Playback"
import { spotifyApi } from "@/lib"

const useProgress = () => {
  const { playback, syncProgress } = usePlayback()

  useEffect(() => {
    let timer: NodeJS.Timer | undefined = undefined

    timer = setInterval(() => {
      spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
        const progress = body?.progress_ms ?? 0

        if (playback.started_playing && !playback.is_paused) {
          syncProgress(progress)
        }
      })
    }, 1000)

    return () => clearInterval(timer as unknown as number)
  }, [playback, syncProgress])
}

export default useProgress
