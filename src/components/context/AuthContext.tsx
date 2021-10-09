import { createContext, useContext, useEffect, useState } from "react"

interface IContextProps {
  user: unknown
  token: string
}

const AuthContext = createContext<IContextProps | null>(null)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState("")
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

  return (
    <AuthContext.Provider value={{ user, token }}>
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
