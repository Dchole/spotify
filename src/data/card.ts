import { slugify } from "@/utils"

export const card = {
  id: Math.random().toString(),
  title: "Dummy Title",
  cover: new URL(`../assets/cover image-1.svg`, import.meta.url).href,
  get path() {
    return slugify(this.title)
  }
}
