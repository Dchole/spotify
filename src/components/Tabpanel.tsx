import { Box } from "@mui/system"

interface IProps {
  value: number
  item: "playlists" | "albums" | "artists"
}

export const tabs = ["playlists", "albums", "artists"]

const Tabpanel: React.FC<IProps> = ({ value, item, children, ...props }) => {
  return (
    <div
      role="tabpanel"
      hidden={tabs.indexOf(item) !== value}
      id={item}
      aria-labelledby={`${item}-tab`}
      {...props}
    >
      {tabs.indexOf(item) === value && (
        <Box sx={{ my: 2, mx: 1 }}>{children}</Box>
      )}
    </div>
  )
}

export default Tabpanel
