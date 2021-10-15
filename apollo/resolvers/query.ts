import type { QueryResolvers } from "../types/generated/graphql"
import type { IContext } from "apollo/types/context"

export const Query: QueryResolvers<IContext> = {
  user: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getUser()
  },
  playlist: async (_parent, { id }, { dataSources }) => {
    return dataSources.spotifyAPI.getPlaylist(id)
  },
  playlists: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getUserPlaylists()
  },
  album: async (_parent, { id }, { dataSources }) => {
    return dataSources.spotifyAPI.getAlbum(id)
  },
  saved_albums: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getSavedAlbums()
  },
  artist: async (_parent, { id }, { dataSources }) => {
    return dataSources.spotifyAPI.getArtist(id)
  },
  followed_artists: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getFollowedArtists()
  },
  track: async (_parent, { id }, { dataSources }) => {
    return dataSources.spotifyAPI.getTrack(id)
  },
  top_tracks: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getTopTracks()
  },
  liked_songs: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getSavedTracks()
  },
  recently_played: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getPlayHistory()
  },
  recommendation: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getRecommendations()
  },
  new_releases: async (_parent, _args, { dataSources }) => {
    return dataSources.spotifyAPI.getNewReleases()
  }
}
