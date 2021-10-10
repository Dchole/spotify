import SpotifyWebApi from "spotify-web-api-node"

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri:
    process.env.NODE_ENV === "production"
      ? "https://spotify-pied-one.vercel.app/auth"
      : "http://localhost:3000/auth"
})
