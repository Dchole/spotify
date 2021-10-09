import { createContext, useContext, useEffect, useState } from "react"

interface IUser {
  id: string
  name: string
  href: string
  images: SpotifyApi.ImageObject[]
}

interface IContextProps {
  user: IUser | null
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<IContextProps | null>(null)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState("")

  useEffect(() => {
    fetch("/api/auth", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(({ authURL, access_token }) => {
        if (authURL) {
          window.location.href = authURL
        }

        setToken(access_token || "")
      })
  }, [])

  useEffect(() => {
    if (token) {
      fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(user => setUser(user))
        .catch(err => console.log(err.message))
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {children}
    </AuthContext.Provider>
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
