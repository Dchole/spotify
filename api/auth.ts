import { createHash } from "crypto"
import { VercelRequest, VercelResponse } from "@vercel/node"
import { spotifyApi } from "../spotify-api"

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const scopes = [
    "user-read-private",
    "user-follow-read",
    "user-library-read",
    "user-read-email"
  ]

  if (req.cookies.refresh_token) {
    spotifyApi.setRefreshToken(req.cookies.refresh_token)

    const {
      body: { access_token }
    } = await spotifyApi.refreshAccessToken()

    return res.json({ access_token })
  }

  const state = createHash("sha256")
    .update("state", "utf8")
    .digest("hex")
    .substring(0, 11)

  const authURL = spotifyApi.createAuthorizeURL(scopes, state)

  res.json({ authURL })
}

export default handler
