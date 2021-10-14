import { gql } from "apollo-server-micro"

export const typeDefs = gql`
  type Query {
    user: User!
    track(id: ID!): Track!
    liked_songs: [Track!]!
    recently_played: [Track!]!
    top_tracks: [Track!]!
    album(id: ID!): Album!
    saved_albums: [Album!]!
    playlist(id: ID!): Playlist!
    playlists: [Playlist!]!
    artist(id: ID!): Artist!
    followed_artists: [Artist!]!
  }

  type User {
    id: ID!
    name: String!
    photoURL: String
  }

  type Track {
    id: ID!
    name: String!
    album: Album!
    artists: [Artist!]!
    duration: Int!
    preview_image: String
    popularity: Int
    type: EType!
  }

  type Album {
    id: ID!
    name: String!
    genres: [String!]!
    popularity: Int!
    album_type: String!
    artists: [Artist!]!
    preview_image: String
    release_date: String!
    tracks: [Track!]!
    type: EType!
  }

  type Playlist {
    id: ID!
    name: String!
    collaborative: Boolean!
    description: String
    preview_image: String
    owner: User!
    public: Boolean
    snapshot_id: String!
    type: EType!
    followers: Int!
    tracks: [PlaylistTrack!]!
  }
  type Artist {
    id: ID!
    name: String!
    type: EType!
  }

  type PlaylistTrack {
    id: ID!
    added_at: String!
    added_by: User!
    track: Track!
  }

  enum EType {
    ARTIST
    PLAYLIST
    ALBUM
    TRACK
    USER
    SINGLE
    COMPILATION
  }
`
