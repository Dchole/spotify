import { withAuth } from "../../middleware"
import { spotifyApi } from "../../spotify-api.config"

const handler = withAuth(async (req, res) => {
  const { artist } = req.query
  const artistId = (artist as string) || "1u7kkVrr14iBvrpYnZILJR"

  const infoPromise = spotifyApi.getArtist(artistId)
  const tracksPromise = spotifyApi.getArtistTopTracks(artistId, "GB")
  const albumsPromise = spotifyApi.getArtistAlbums(artistId, {
    limit: 10
  })

  const [{ body: info }, { body }, { body: albums }] = await Promise.all([
    infoPromise,
    tracksPromise,
    albumsPromise
  ])

  return res.json({
    info,
    tracks: body.tracks,
    albums
  })
})

export default handler
