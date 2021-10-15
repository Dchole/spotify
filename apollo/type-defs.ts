import { gql } from "apollo-server-micro"

export const typeDefs = gql`
  type Query {
    user: User!
    track(id: ID!): Track!
    liked_songs: [Track!]!
    recently_played: [Track!]!
    top_tracks: [Track!]!
    recommendation: [Track!]!
    album(id: ID!): Album!
    new_releases: [Album!]!
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
    album: Album
    artists: [Artist!]!
    duration: Int!
    cover_image: String
    popularity: Int
    type: EType!
  }

  type Album {
    id: ID!
    name: String!
    genres: [String!]
    popularity: Int
    duration: Int!
    album_type: String!
    artists: [Artist!]!
    cover_image: String
    release_date: String!
    tracks: [Track!]
    type: EType!
    numberOfTracks: Int
  }

  type Playlist {
    id: ID!
    name: String!
    cover_image: String
    owner: User!
    public: Boolean
    type: EType!
    duration: Int!
    followers: Int
    tracks: [PlaylistTrack!]!
    total: Int!
  }

  type Artist {
    id: ID!
    name: String!
    type: EType!
    popularity: Int
    cover_image: String
    tracks: [Track!]!
    albums: [Album!]!
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
