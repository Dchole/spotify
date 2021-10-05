import { slugify } from "@/utils"

export const card = {
  id: Math.random().toString(),
  title: "Dummy Title",
  cover: new URL(`/src/assets/album.svg`, import.meta.url).href,
  get path() {
    return "/playlists/" + slugify(this.title)
  }
}
