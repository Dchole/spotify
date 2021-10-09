import { VercelRequest, VercelResponse } from "@vercel/node"
import { spotifyApi } from "../spotify-api.config"

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const scopes = ["user-read-private", "user-read-email"]

  if (req.cookies.refresh_token) {
    spotifyApi.setRefreshToken(req.cookies.refresh_token)

    const {
      body: { access_token }
    } = await spotifyApi.refreshAccessToken()

    return res.json({ access_token })
  }

  const authURL = spotifyApi.createAuthorizeURL(scopes, "34fFs29kd09")

  res.json({ authURL })
}

export default handler
