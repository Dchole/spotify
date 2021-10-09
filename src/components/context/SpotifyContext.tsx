import { createContext, useContext, useEffect, useState } from "react"

interface IContextProps {
  playlists: Record<string, unknown>[]
}

const SpotifyContext = createContext<IContextProps | null>(null)

const SpotifyProvider: React.FC = ({ children }) => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    setPlaylists([])
  }, [])

  return (
    <SpotifyContext.Provider value={{ playlists }}>
      {children}
    </SpotifyContext.Provider>
  )
}

export const useSpotify = () => {
  const context = useContext(SpotifyContext)

  if (!context) {
    throw new Error("useSpotify was called without a Provider")
  }

  return context
}

export default SpotifyProvider
