import { fetcher } from "@/utils/react-query-fetcher"
import { useQuery } from "react-query"
import { useAuth } from "~/context/AuthContext"

interface IUser {
  id: string
  name: string
  accountURL: string
  photoURL: string
}

const useUser = () => {
  const { token } = useAuth()
  const {
    data: user,
    error,
    isFetching
  } = useQuery("user", fetcher<IUser>(token))

  return { user, error, isFetching }
}

export default useUser
