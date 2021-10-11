import { getAccessToken } from "@/token"
import { QueryFunctionContext } from "react-query"

export const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  const [apiRoute] = queryKey
  const token = getAccessToken()

  return fetch(`/api/${apiRoute}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include"
  }).then(res => res.json())
}
