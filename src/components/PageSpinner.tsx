import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"

const PageSpinner = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 1600)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {show && (
        <Box
          width="100%"
          height="100vh"
          sx={{ display: "grid", placeItems: "center" }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

export default PageSpinner
