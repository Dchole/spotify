import { VercelRequest, VercelResponse } from "@vercel/node"
import { spotifyApi } from "../spotify-api.config"

export const withAuth =
  (
    handler: (
      req: VercelRequest,
      res: VercelResponse
    ) => Promise<VercelResponse | undefined>
  ) =>
  async (req: VercelRequest, res: VercelResponse) => {
    const token = req.headers.authorization?.split(" ")[1]
    const { refresh_token } = req.cookies

    if (token) {
      spotifyApi.setAccessToken(token)
    } else {
      if (refresh_token) {
        spotifyApi.setRefreshToken(refresh_token)

        const {
          body: { access_token }
        } = await spotifyApi.refreshAccessToken()

        spotifyApi.setAccessToken(access_token)
      }
    }

    return handler(req, res)
  }
