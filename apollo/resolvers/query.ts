import { spotifyApi } from "../../spotify-api.config"
import { Artist, EType, QueryResolvers, Track } from "../../generated/graphql"

export const Query: QueryResolvers = {
  user: async (_parent, _args, context) => {
    console.log(context)
    const { body } = await spotifyApi.getMe()

    return {
      id: body.id,
      name: body.display_name || "No Name",
      photoURL: body.images?.[1]?.url
    }
  },
  album: async (_parent, { id }, _context) => {
    const { body } = await spotifyApi.getAlbum(id)

    const artists: Artist[] = body.artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      type: EType["Artist"]
    }))

    const tracks: Track[] = body.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      album: track.album as any,
      artists: track.artists as any,
      duration: track.duration_ms,
      popularity: null,
      type: EType["Track"],
      preview_image: track.album.images[1]?.url || track.album.images[0]?.url
    }))

    return {
      id: body.id,
      name: body.name,
      genres: body.genres,
      artists,
      popularity: body.popularity,
      album_type: body.album_type,
      preview_image: body.images[1]?.url,
      release_date: body.release_date,
      tracks,
      type: EType["Album"]
    }
  }
}
