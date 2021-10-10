import { spotifyApi } from "../spotify-api.config"
import { withAuth } from "../middleware"

const handler = withAuth(async (_req, res) => {
  const { body } = await spotifyApi.getMe()

  return res.json({
    id: body.id,
    name: body.display_name,
    accountURL: body.href,
    photoURL: body.images?.[0].url
  })
})

export default handler
