import SpotifyWebApi from "spotify-web-api-node"

export const redirectUri = "http://localhost:3000/auth"

export const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri
})
