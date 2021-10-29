import { EType, useSearchLazyQuery } from "@/generated/graphql"
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const Search = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const query = searchParams.get("query") || ""

  const [search, { data }] = useSearchLazyQuery({
    variables: { query },
    fetchPolicy: "cache-only"
  })

  useEffect(() => {
    query && search()
  }, [search])

  return (
    <main>
      {data?.search ? (
        <>
          <h1 style={visuallyHidden}>Search result</h1>
          <List>
            {data.search.map(item => (
              <ListItem
                key={item.id}
                component={Link}
                to={`/${item.type.toLowerCase()}s/${item.id}`}
                button
              >
                <ListItemAvatar>
                  <Avatar
                    variant={
                      item.type === EType["Artist"] ? "circular" : "square"
                    }
                    src={item.cover_image || ""}
                    alt=""
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <span>{item.type.toLowerCase()}</span>
                      {item.artist_name && (
                        <>
                          <span>&bull;</span>
                          <span>{item.artist_name}</span>
                        </>
                      )}
                    </>
                  }
                  secondaryTypographyProps={{
                    sx: {
                      display: "flex",
                      gap: 1,
                      textTransform: "capitalize"
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Container>
          <Typography component="h1" variant="h5">
            Type Something in the search input to search
          </Typography>
        </Container>
      )}
    </main>
  )
}

export default Search
