import { redirectUri, spotifyApi } from "@/lib/spotify"
import { createContext, useContext, useEffect, useState } from "react"

interface IContextProps {
  user: unknown
}

const AuthContext = createContext<IContextProps | null>(null)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState("")

  useEffect(() => {
    const scopes = ["user-read-private", "user-read-email"]
    const storedToken = sessionStorage.getItem("token") || ""

    spotifyApi.setRefreshToken(storedToken)

    const refreshToken = spotifyApi.getRefreshToken()

    if (!refreshToken) {
      const authURL = new URL("https://accounts.spotify.com/authorize")
      const params = authURL.searchParams

      params.append("response_type", "code")
      params.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID)
      params.append("scope", encodeURIComponent(scopes.join(" ")))
      params.append("redirect_uri", redirectUri)

      window.location.href = authURL.href
    }

    const fetchUser = async () => {
      try {
       await spotifyApi.refreshAccessToken()
        spotifyApi
          .getMe()
          .then(({ body }) => {
            console.log(body)
          })
          .catch(err => console.log(err.message))
      } catch (error: any) {
        console.log(error.message)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("`useAuth` was called without a Provider")
  }

  return context
}

export default AuthProvider
