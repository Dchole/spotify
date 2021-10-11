import { withAuth } from "../../middleware"
import { spotifyApi } from "../../spotify-api.config"

const handler = withAuth(async (req, res) => {
  const { album } = req.query
  const { body } = await spotifyApi.getAlbum(album as string)

  return res.json({
    album: body
  })
})

export default handler
