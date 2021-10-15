import {
  Album,
  Artist,
  EType,
  Playlist,
  PlaylistTrack,
  Track,
  User
} from "../types/generated/graphql"
import type { IContext } from "../types/context"
import { DataSource, DataSourceConfig } from "apollo-datasource"
import SpotifyWebApi from "spotify-web-api-node"

export default class SpotifyAPI extends DataSource<IContext> {
  private spotifyAPI!: SpotifyWebApi

  constructor() {
    super()
  }

  override initialize(config: DataSourceConfig<IContext>) {
    this.spotifyAPI = config.context.spotifyApi
  }

  private artistReducer(
    artist: SpotifyApi.ArtistObjectFull | SpotifyApi.ArtistObjectSimplified,
    albums?: SpotifyApi.AlbumObjectSimplified[],
    tracks?: SpotifyApi.TrackObjectFull[]
  ): Artist {
    const fullObject = artist as SpotifyApi.ArtistObjectFull

    return {
      id: artist.id,
      name: artist.name,
      type: EType["Artist"],
      tracks: tracks?.map(track => this.trackReducer(track)) || [],
      albums: albums?.map(album => this.albumReducer(album)) || [],
      get cover_image() {
        if (Object.prototype.hasOwnProperty.call(fullObject, "images")) {
          return fullObject.images[1]?.url || fullObject.images[0]?.url
        }

        return undefined
      },
      get popularity() {
        if (Object.prototype.hasOwnProperty.call(fullObject, "popularity")) {
          return fullObject.popularity
        }

        return undefined
      }
    }
  }

  private albumReducer(
    album: SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified
  ): Album {
    const fullAlbum = album as SpotifyApi.AlbumObjectFull

    const onlyInFull = Object.getOwnPropertyNames(fullAlbum).includes("genres")
      ? {
          genres: fullAlbum.genres,
          popularity: fullAlbum.popularity,
          tracks: fullAlbum.tracks.items.map(track =>
            this.trackReducer(
              track as SpotifyApi.TrackObjectFull,
              album.images[1].url || album.images[0].url
            )
          )
        }
      : undefined

    return {
      id: album.id,
      album_type: album.album_type,
      artists: album.artists.map(artist => this.artistReducer(artist)),
      name: album.name,
      release_date: album.release_date,
      type: EType["Album"],
      cover_image: album.images[1]?.url || album.images[0]?.url,
      get numberOfTracks() {
        return this.tracks?.length
      },
      get duration() {
        const albumDuration =
          this.tracks?.reduce((acc, cur) => acc + cur.duration, 0) ?? 0

        return Math.round(albumDuration / 60_000)
      },
      genres: undefined,
      tracks: undefined,
      popularity: undefined,
      ...(onlyInFull || {})
    }
  }

  private playlistReducer(
    playlist:
      | SpotifyApi.PlaylistObjectFull
      | SpotifyApi.PlaylistObjectSimplified,
    tracks?: SpotifyApi.PlaylistTrackObject[]
  ): Playlist {
    const ownerReducer = (
      owner: SpotifyApi.UserObjectPublic
    ): Playlist["owner"] => ({
      id: owner.id,
      name: owner.display_name || "Unknown",
      photoURL: owner.images?.[0]?.url
    })

    const fullObject = playlist as SpotifyApi.PlaylistObjectFull

    const parsedTracks: PlaylistTrack[] | undefined = tracks?.map(item => ({
      id: item.track.id,
      added_at: item.added_at,
      added_by: ownerReducer(item.added_by),
      track: this.trackReducer(item.track)
    }))

    const trackFromFullObject: PlaylistTrack[] | undefined = !parsedTracks
      ? fullObject.tracks.items?.map(({ added_at, added_by, ...item }) => {
          const track = this.trackReducer(item.track)

          return {
            id: track.id,
            track,
            added_at,
            added_by: ownerReducer(added_by)
          }
        })
      : undefined

    return {
      id: playlist.id,
      name: playlist.name,
      owner: ownerReducer(playlist.owner),
      type: EType["Playlist"],
      total: playlist.tracks.total,
      cover_image: playlist.images[1]?.url || playlist.images[0]?.url,
      tracks: parsedTracks || trackFromFullObject || [],
      public: playlist.public,
      get duration() {
        const playlistDuration =
          this.tracks.reduce((acc, cur) => acc + cur.track.duration, 0) ?? 0

        return Math.round(playlistDuration / 60_000)
      },
      get followers() {
        if (Object.prototype.hasOwnProperty.call(fullObject, "followers")) {
          return fullObject.followers.total
        }

        return undefined
      }
    }
  }

  private trackReducer(
    track: SpotifyApi.TrackObjectSimplified | SpotifyApi.TrackObjectFull,
    cover_image?: string
  ): Track {
    const fullObject = track as SpotifyApi.TrackObjectFull

    return {
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => this.artistReducer(artist)),
      duration: track.duration_ms,
      type: EType["Track"],
      cover_image:
        track.album?.images[1]?.url ||
        track.album?.images[0]?.url ||
        cover_image,
      album: track.album ? this.albumReducer(track.album) : undefined,
      get popularity() {
        if (Object.prototype.hasOwnProperty.call(fullObject, "popularity")) {
          return fullObject.popularity
        }

        return undefined
      }
    }
  }

  async getUser(): Promise<User> {
    const { body } = await this.spotifyAPI.getMe()

    return {
      id: body.id,
      name: body.display_name || "No Name",
      photoURL: body.images?.[0].url
    }
  }

  async getPlaylist(id: string): Promise<Playlist> {
    const { body } = await this.spotifyAPI.getPlaylist(id)
    return this.playlistReducer(body)
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    const { body } = await this.spotifyAPI.getUserPlaylists()
    return body.items.map(playlist => this.playlistReducer(playlist))
  }

  async getAlbum(id: string): Promise<Album> {
    const { body } = await this.spotifyAPI.getAlbum(id)
    return this.albumReducer(body)
  }

  async getSavedAlbums(): Promise<Album[]> {
    const { body } = await this.spotifyAPI.getMySavedAlbums()
    return body.items.map(item => this.albumReducer(item.album))
  }

  async getPlayHistory(): Promise<Track[]> {
    const { body } = await this.spotifyAPI.getMyRecentlyPlayedTracks()
    return body.items.map(item => this.trackReducer(item.track))
  }

  async getTrack(id: string): Promise<Track> {
    const { body } = await this.spotifyAPI.getTrack(id)
    return this.trackReducer(body)
  }

  async getSavedTracks(): Promise<Track[]> {
    const { body } = await this.spotifyAPI.getMySavedTracks()
    return body.items.map(({ track }) => this.trackReducer(track))
  }

  async getTopTracks(): Promise<Track[]> {
    const { body } = await this.spotifyAPI.getMyTopTracks()
    return body.items.map(track => this.trackReducer(track))
  }

  async getTopArtists(): Promise<Artist[]> {
    const { body } = await this.spotifyAPI.getMyTopArtists()
    return body.items.map(artist => this.artistReducer(artist))
  }

  async getArtist(id: string): Promise<Artist> {
    const artistResponse = this.spotifyAPI.getArtist(id)
    const albumsResponse = this.spotifyAPI.getArtistAlbums(id)
    const tracksResponse = this.spotifyAPI.getArtistTopTracks(id, "US")

    const [
      { body: artist },
      {
        body: { items: albums }
      },
      {
        body: { tracks }
      }
    ] = await Promise.all([artistResponse, albumsResponse, tracksResponse])

    return this.artistReducer(artist, albums, tracks)
  }

  async getNewReleases(): Promise<Album[]> {
    const { body } = await this.spotifyAPI.getNewReleases()
    return body.albums.items.map(albums => this.albumReducer(albums))
  }

  async getRecommendations(): Promise<Track[]> {
    const {
      body: { items: tracks }
    } = await this.spotifyAPI.getMyRecentlyPlayedTracks({ limit: 5 })

    const { body } = await this.spotifyAPI.getRecommendations({
      market: "US",
      seed_genres: ["pop", "indie", "r&b"],
      seed_tracks: tracks[0].track.id,
      seed_artists: tracks[0].track.artists[0].id
    })
    return body.tracks.map(track => this.trackReducer(track))
  }

  async getFollowedArtists(): Promise<Artist[]> {
    const { body } = await this.spotifyAPI.getFollowedArtists()
    return body.artists.items.map(artist => this.artistReducer(artist))
  }
}
