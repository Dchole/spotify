import { TOrder } from "#/Playlist"
import { EType } from "@/generated/graphql"
import { Share } from "@mui/icons-material"
import { Grid, IconButton, SelectChangeEvent, Skeleton } from "@mui/material"
import { lazy, Suspense } from "react"
import GroupPlayButton from "./GroupPlayButton"
import SaveGroupButton from "./SaveGroupButton"

const SortingOrder = lazy(() => import("./SortingOrder"))

interface IProps {
  type: EType
  order: TOrder
  playlist_id?: string
  groupPlaying: boolean
  handleChange: (event: SelectChangeEvent) => void
  handlePlay: () => Promise<void>
  handlePause: () => Promise<void>
}

const PlaylistControls: React.FC<IProps> = ({
  type,
  order,
  playlist_id,
  handlePlay,
  handlePause,
  groupPlaying,
  handleChange
}) => {
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
        {playlist_id && <SaveGroupButton group_id={playlist_id} />}
        {type === EType["Album"] && (
          <IconButton aria-label="share album">
            <Share />
          </IconButton>
        )}
      </Grid>
      <GroupPlayButton
        handlePlay={handlePlay}
        handlePause={handlePause}
        groupPlaying={groupPlaying}
      />
    </Grid>
  )
}

export default PlaylistControls
