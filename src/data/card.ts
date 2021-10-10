import { slugify } from "@/utils"

export const card = {
  id: Math.random().toString(),
  title: "Dummy Title",
  get path() {
    return "/playlists/" + slugify(this.title)
  }
}
