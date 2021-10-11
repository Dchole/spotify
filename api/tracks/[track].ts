import { withAuth } from "../../middleware"
import { spotifyApi } from "../../spotify-api.config"

const handler = withAuth(async (req, res) => {
  const { track } = req.query
  const { body } = await spotifyApi.getTrack(track as string)

  return res.json({
    track: body
  })
})

export default handler
