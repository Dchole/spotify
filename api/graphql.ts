import { VercelRequest, VercelResponse } from "@vercel/node"
import { ApolloServer } from "apollo-server-micro"
import { BaseRedisCache } from "apollo-server-cache-redis"
import { schema } from "../apollo/schema"
import Redis from "ioredis"
import SpotifyWebApi from "spotify-web-api-node"
import SpotifyAPI from "../apollo/datasource/Spotify"

const server = new ApolloServer({
  schema,
  introspection: true,
  cache: new BaseRedisCache({
    client: new Redis({
      host: "127.0.0.1:6379"
    })
  }),
  context: async ({ req }: { req: VercelRequest; res: VercelResponse }) => {
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

    return { spotifyApi }
  },
  dataSources: () => ({
    spotifyAPI: new SpotifyAPI()
  })
})

const startServer = server.start()

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  )
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )

  if (req.method === "OPTIONS") {
    res.end()
    return false
  }

  await startServer
  await server.createHandler({
    path: "/api/graphql"
  })(req, res)
}
