import { VercelRequest, VercelResponse } from "@vercel/node"
import { ApolloServer } from "apollo-server-micro"
import { schema } from "../apollo/schema"
import SpotifyWebApi from "spotify-web-api-node"

const server = new ApolloServer({
  schema,
  introspection: true,
  context: async ({
    req,
    res
  }: {
    req: VercelRequest
    res: VercelResponse
  }) => {
    res.setHeader("access-control-allow-origin", "*")
    res.setHeader("access-control-allow-credentials", "true")
    res.setHeader("access-control-allow-methods", "POST")

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

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

    return spotifyApi
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default server
  .start()
  .then(() => server.createHandler({ path: "/api/graphql" }))
