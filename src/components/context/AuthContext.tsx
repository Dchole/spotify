import { setAccessToken } from "@/token"
import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"

interface IContextProps {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<IContextProps | null>(null)

const AuthProvider: React.FC = ({ children }) => {
  const { pathname } = useLocation()
  const [token, setToken] = useState("")

  useEffect(() => {
    if (pathname !== "/auth") {
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

          setAccessToken(access_token || "")
          setToken(access_token || "")
        })
    }
  }, [pathname])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
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
