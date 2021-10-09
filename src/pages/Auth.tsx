import { spotifyApi, redirectUri } from "@/lib"
import { useEffect } from "react"
import { useHistory } from "react-router"

const Auth = () => {
  const { replace } = useHistory()
  const url = new URL(window.location.href)

  useEffect(() => {
    for (const [key, value] of url.searchParams) {
      if (key === "code") {
        const url = new URL("https://accounts.spotify.com/api/token")
        const params = url.searchParams

        params.append("grant_type", "authorization_code")
        params.append("code", value)
        params.append("redirect_uri", redirectUri)

        const base64Encoded = btoa(
          `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          }`
        )

        fetch(url.href, {
          method: "POST",
          headers: {
            Authorization: `Basic ${base64Encoded}`,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => res.json())
          .then(({ access_token, refresh_token }) => {
            spotifyApi.setAccessToken(access_token)
            spotifyApi.setRefreshToken(refresh_token)

            return refresh_token
          })
          .then(refresh_token => {
            sessionStorage.setItem("token", refresh_token)
            replace("/")
          })
      }
    }
  }, [])

  return <></>
}

export default Auth
