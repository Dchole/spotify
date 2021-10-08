import { Fade } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
  leaving: JSX.Element
  entering: JSX.Element
  startTransition: boolean
}

const FadeThrough: React.FC<IProps> = ({
  leaving,
  entering,
  startTransition
}) => {
  const [showLeaving, setShowLeaving] = useState(true)
  const [showEntering, setShowEntering] = useState(false)

  useEffect(() => {
    setShowEntering(startTransition)
  }, [startTransition])

  return (
    <>
      <Fade
        in={showLeaving}
        onEnter={() => {
          setShowEntering(false)
        }}
        onExited={() => {
          setShowEntering(true)
        }}
        timeout={100}
        mountOnEnter
        unmountOnExit
      >
        {leaving}
      </Fade>
      <Fade
        in={showEntering}
        onEnter={() => {
          setShowLeaving(false)
        }}
        onExited={() => {
          setShowLeaving(true)
        }}
        mountOnEnter
        unmountOnExit
      >
        {entering}
      </Fade>
    </>
  )
}

export default FadeThrough
