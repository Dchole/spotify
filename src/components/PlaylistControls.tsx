import { TOrder } from "#/Playlist"
import { EType } from "@/generated/graphql"
import { FavoriteBorder, PlayCircle, Share } from "@mui/icons-material"
import { Grid, IconButton, SelectChangeEvent, Skeleton } from "@mui/material"
import { lazy, Suspense } from "react"

const SortingOrder = lazy(() => import("./SortingOrder"))

interface IProps {
  type: EType
  order: TOrder
  handleChange: (event: SelectChangeEvent) => void
}

const PlaylistControls: React.FC<IProps> = ({ type, order, handleChange }) => {
  return (
    <Grid
      component="section"
      aria-label="controls"
      alignItems="center"
      justifyContent="space-between"
      container
    >
      <Grid alignItems="center" gap={2} container sx={{ width: "fit-content" }}>
        {type === EType["Playlist"] && (
          <Suspense
            fallback={
              <Skeleton variant="rectangular" width={150} height={42.2} />
            }
          >
            <SortingOrder order={order} handleChange={handleChange} />
          </Suspense>
        )}
        <IconButton aria-label="add playlist to favorite">
          <FavoriteBorder />
        </IconButton>
        {type === EType["Album"] && (
          <IconButton aria-label="share album">
            <Share />
          </IconButton>
        )}
      </Grid>
      <IconButton color="primary" aria-label="Play all">
        <PlayCircle sx={{ fontSize: "3rem" }} />
      </IconButton>
    </Grid>
  )
}

export default PlaylistControls
