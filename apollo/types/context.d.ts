import SpotifyAPI from "apollo/datasource/Spotify"
import SpotifyWebApi from "spotify-web-api-node"

export interface IContext {
  spotifyApi: SpotifyWebApi
  dataSources: {
    spotifyAPI: SpotifyAPI
  }
}
