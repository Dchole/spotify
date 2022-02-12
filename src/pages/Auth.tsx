import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "~/context/Auth"

const Auth = () => {
  const { code, setToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (code) {
      console.log(code)
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
          navigate("/", { replace: true })
        })
        .catch(err => console.log(err.message))
    }
  }, [])

  return <></>
}

export default Auth
