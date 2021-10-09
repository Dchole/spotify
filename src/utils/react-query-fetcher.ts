import { QueryFunctionContext } from "react-query"

export const fetcher =
  <DataType>(token: string) =>
  async ({ queryKey }: QueryFunctionContext<"user">): Promise<DataType> => {
    const [apiRoute] = queryKey

    console.log({ token })

    return fetch(`/api/${apiRoute}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }
