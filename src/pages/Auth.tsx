import { useEffect } from "react"
import { useHistory } from "react-router"
import { useAuth } from "~/context/AuthContext"

const Auth = () => {
  const { setToken } = useAuth()
  const { replace } = useHistory()

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")

    if (code) {
      fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(({ access_token }) => {
          if (!access_token) throw new Error("Something went wrong")

          setToken(access_token)
          replace("/")
        })
        .catch(err => console.log(err.message))
    }
  }, [])

  return <></>
}

export default Auth
