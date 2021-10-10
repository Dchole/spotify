import { fetcher } from "@/utils"
import { useQuery } from "react-query"

interface IUser {
  id: string
  name: string
  accountURL: string
  photoURL: string
}

const useUser = () => {
  const { data: user, error, isFetching } = useQuery<IUser>("user", fetcher)

  return { user, error, isFetching }
}

export default useUser
