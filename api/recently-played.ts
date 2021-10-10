import { withAuth } from "../middleware"
import { spotifyApi } from "../spotify-api.config"

const handler = withAuth(async (_req, res) => {
  const { body } = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 })

  return res.json({
    playHistory: body.items,
    total: body.total,
    next: body.next,
    cursors: body.cursors
  })
})

export default handler
