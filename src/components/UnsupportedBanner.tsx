import { Alert, Collapse } from "@mui/material"
import { Box } from "@mui/system"

interface IProps {
  show: boolean
  handleClose: () => void
}

const UnsupportedBanner: React.FC<IProps> = ({ show, handleClose }) => {
  return (
    <Box width="100%">
      <Collapse in={show}>
        <Alert severity="warning" onClose={handleClose}>
          Playback isn&apos;t supported in this browser, use firefox instead
        </Alert>
      </Collapse>
    </Box>
  )
}

export default UnsupportedBanner
