import { Share } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { lazy, Suspense, useState } from "react"

const ShareMenu = lazy(() => import("./ShareMenu"))

const ShareButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton aria-label="share" onClick={handleOpen}>
        <Share />
      </IconButton>
      <Suspense fallback={<div />}>
        <ShareMenu anchorEl={anchorEl} handleClose={handleClose} />
      </Suspense>
    </>
  )
}

export default ShareButton
