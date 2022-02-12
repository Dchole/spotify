import { useSearchLazyQuery } from "@/generated/graphql"
import { SearchRounded } from "@mui/icons-material"
import {
  CircularProgress,
  Collapse,
  InputAdornment,
  OutlinedInput,
  debounce
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

const Search = () => {
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const [search, { loading }] = useSearchLazyQuery()

  useEffect(() => {
    const query = searchParams.get("query")
    if (query) search({ variables: { query } })
  }, [searchParams, search])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const searchParams = new URLSearchParams(window.location.search)
    value ? searchParams.set("query", value) : searchParams.delete("query")
    setSearchParams(searchParams.toString())
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
            defaultValue={searchParams.get("query") || ""}
            placeholder="Songs, Albums, Artists and Playlists"
            onChange={debounce(handleChange, 600)}
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
