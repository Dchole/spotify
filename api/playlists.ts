import { withAuth } from "../middleware"
import { spotifyApi } from "../spotify-api.config"

const handler = withAuth(async (_req, res) => {
  const { body } = await spotifyApi.getUserPlaylists({ limit: 10 })

  return res.json({
    playlists: body.items,
    total: body.total,
    next: body.next,
    previous: body.previous
  })
})

export default handler
