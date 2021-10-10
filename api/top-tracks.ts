import { withAuth } from "../middleware"
import { spotifyApi } from "../spotify-api.config"

const handler = withAuth(async (_req, res) => {
  const { body } = await spotifyApi.getMyTopTracks({ limit: 10 })

  return res.json({
    topTracks: body.items,
    next: body.next,
    total: body.total,
    previous: body.previous
  })
})

export default handler
