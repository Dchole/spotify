import { withAuth } from "../../middleware"
import { spotifyApi } from "../../spotify-api.config"

const handler = withAuth(async (req, res) => {
  const { playlist } = req.query
  const { body } = await spotifyApi.getPlaylist(playlist as string)

  return res.json({
    playlist: body
  })
})

export default handler
