import { VercelRequest, VercelResponse } from "@vercel/node"
import { serialize } from "cookie"
import SpotifyWebApi from "spotify-web-api-node"

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: "http://localhost:3000/auth"
    })

    const { body } = await spotifyApi.authorizationCodeGrant(req.body.code)
    const { access_token, refresh_token } = body

    spotifyApi.setAccessToken(access_token)
    spotifyApi.setRefreshToken(refresh_token)

    res.setHeader(
      "Set-Cookie",
      serialize("refresh_token", refresh_token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
      })
    )

    res.json({ access_token })
  } else {
    res.status(404).end()
  }
}

export default handler
