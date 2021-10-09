import { songs } from "@/data/songs"
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material"
import { useSearch } from "~/context/SearchContext"

const Search = () => {
  const { autocompleteProps } = useSearch()
  const { inputValue, getListboxProps, getOptionProps, groupedOptions } =
    autocompleteProps

  return (
    <main>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textTransform: "capitalize", ml: 2 }}
      >
        {inputValue ? (
          <>
            Result for <q>{inputValue}</q>
          </>
        ) : (
          <>Search for songs, playlists and more...</>
        )}
      </Typography>
      <List {...getListboxProps()}>
        {(groupedOptions as typeof songs).map((option, index) => (
          <ListItem
            key={option.title}
            {...getOptionProps({ option, index })}
            sx={{ py: 0 }}
          >
            <ListItemAvatar>
              <Avatar variant="square" src={option.cover} alt={option.title} />
            </ListItemAvatar>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary={option.title}
              secondary={
                <>
                  <span>{option.album}</span>
                  &bull;
                  <span>{option.artist}</span>
                </>
              }
              secondaryTypographyProps={{
                sx: { display: "flex", gap: 0.6 }
              }}
            />
          </ListItem>
        ))}
      </List>
    </main>
  )
}

export default Search
