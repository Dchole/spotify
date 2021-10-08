import { Collapse, OutlinedInput } from "@mui/material"
import { Box } from "@mui/system"
import { useLocation } from "react-router"
import { useSearch } from "~/SearchContext"

const Search = () => {
  const { pathname } = useLocation()
  const { autocompleteProps, searching, startSearch } = useSearch()
  const { getRootProps, getInputProps } = autocompleteProps

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getInputProps().onChange?.(event)

    const value = event.target.value
    value && !searching && startSearch()
  }

  return (
    <Box position="absolute" width="100%" top="50%" mt="-20px">
      <Collapse
        in={pathname === "/search"}
        orientation="horizontal"
        mountOnEnter
        unmountOnExit
      >
        <Box {...getRootProps()} height={40}>
          <OutlinedInput
            {...getInputProps()}
            color="secondary"
            margin="dense"
            onChange={handleChange}
            sx={{
              height: "100%",
              bgcolor: "#fffa",
              transition: ({ transitions }) =>
                transitions.create("background-color", {
                  duration: transitions.duration.shortest
                }),
              "&:hover": { bgcolor: "#fffc" }
            }}
            fullWidth
          />
        </Box>
      </Collapse>
    </Box>
  )
}

export default Search
