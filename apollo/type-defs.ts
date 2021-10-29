import { gql } from "apollo-server-micro"

export const typeDefs = gql`
  type Query {
    user: User!
    track(id: ID!): Track!
    liked_songs: [Track!]!
    recently_played: [Recent!]!
    top_tracks: [Track!]!
    recommendation: [Track!]!
    album(id: ID!): Album!
    new_releases: [Album!]!
    saved_albums: [Album!]!
    playlist(id: ID!): Playlist!
    playlists: [Playlist!]!
    artist(id: ID!): Artist!
    search(query: String!): [Search!]!
    followed_artists: [Artist!]!
  }

  interface Tile {
    id: ID!
    name: String!
    type: EType!
    cover_image: String
  }

  type User {
    id: ID!
    name: String!
    photoURL: String
  }

  type Track implements Tile {
    id: ID!
    name: String!
    album: Album
    artists: [Artist!]!
    duration: Int!
    cover_image: String
    popularity: Int
    type: EType!
    uri: String!
  }

  type Album implements Tile {
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
    uri: String!
  }

  type Playlist implements Tile {
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
    uri: String!
  }

  type Artist implements Tile {
    id: ID!
    name: String!
    type: EType!
    popularity: Int
    cover_image: String
    tracks: [Track!]!
    albums: [Album!]!
    uri: String!
  }

  type Recent {
    id: ID!
    name: String!
    album: Album
    artists: [Artist!]!
    duration: Int!
    cover_image: String
    popularity: Int
    type: EType!
    uri: String!
    custom_id: ID!
  }

  type Search implements Tile {
    id: ID!
    name: String!
    type: EType!
    cover_image: String
    artist_name: String
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
