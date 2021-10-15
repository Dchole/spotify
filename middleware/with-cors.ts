import { VercelRequest, VercelResponse } from "@vercel/node"
import Cors from "cors"

export const withCors =
  (handler: (req: VercelRequest, res: VercelResponse) => Promise<void>) =>
  (req: VercelRequest, res: VercelResponse, next: VoidFunction) => {
    Cors({
      credentials: true,
      origin: "https://studio.apollographql.com",
      methods: ["POST"]
    })(req, res, next)

    return handler(req, res)
  }
