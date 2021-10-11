import { withAuth } from "../middleware"
import { spotifyApi } from "../spotify-api.config"

const handler = withAuth(async (_req, res) => {
  const {
    body: { artists }
  } = await spotifyApi.getFollowedArtists()

  return res.json({
    artists: artists.items,
    cursors: artists.cursors,
    next: artists.next,
    total: artists.total
  })
})

export default handler
