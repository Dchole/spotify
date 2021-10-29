import { useSearchLazyQuery } from "@/generated/graphql"
import useDebounce from "@/hooks/useDebounce"
import { SearchRounded } from "@mui/icons-material"
import {
  CircularProgress,
  Collapse,
  InputAdornment,
  OutlinedInput
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"

const Search = () => {
  const { pathname } = useLocation()
  const { replace } = useHistory()

  const searchParams = new URLSearchParams(window.location.search)
  const [input, setInput] = useState(() => searchParams.get("query") || "")

  const searchQuery = useDebounce(input, 500)

  const [search, { loading, networkStatus }] = useSearchLazyQuery({
    variables: { query: searchQuery }
  })

  useEffect(() => {
    searchQuery && search()
  }, [searchQuery, search])

  useEffect(() => {
    if (networkStatus === 7) {
      const url = new URL(window.location.href)
      url.searchParams.set("query", input)

      input ? replace(url.pathname + url.search) : replace(url.pathname)
    } else if (networkStatus === 8) {
      replace("/search")
    }
  }, [networkStatus])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <Box position="absolute" width="100%" top="50%" mt="-20px">
      <Collapse
        in={pathname === "/search"}
        orientation="horizontal"
        mountOnEnter
        unmountOnExit
      >
        <Box height={40}>
          <OutlinedInput
            type="search"
            color="secondary"
            margin="dense"
            value={input}
            placeholder="Songs, Albums, Artists and Playlists"
            onChange={handleChange}
            inputProps={{
              "aria-label": "search for songs, albums, artists and playlists"
            }}
            sx={{
              height: "100%",
              bgcolor: ({ palette }) =>
                palette.mode === "light" ? "#fffa" : "GrayText",
              transition: ({ transitions }) =>
                transitions.create("background-color", {
                  duration: transitions.duration.shortest
                }),
              "&:hover, &:focus-within": {
                bgcolor: ({ palette }) =>
                  palette.mode === "light" ? "#fffc" : "HighlightText"
              }
            }}
            startAdornment={
              loading ? (
                <InputAdornment position="start">
                  <CircularProgress size={24} />
                </InputAdornment>
              ) : (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              )
            }
            fullWidth
          />
        </Box>
      </Collapse>
    </Box>
  )
}

export default Search
