import { useEffect } from "react"
import { useHistory } from "react-router"

const Auth = () => {
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
        .then(({ access_token }) => console.log(access_token))
    }
  }, [])

  return <></>
}

export default Auth
