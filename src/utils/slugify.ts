import { unstable_capitalize } from "@mui/utils"

export const slugify = (title: string) =>
  title.toLowerCase().replaceAll(" ", "-")

export const deSlugify = (slug: string) =>
  slug
    .split("-")
    .map(word => unstable_capitalize(word))
    .join(" ")
