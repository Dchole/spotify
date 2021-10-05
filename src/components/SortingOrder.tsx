import { TOrder } from "#/Playlist"
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material"

interface IProps {
  order: TOrder
  handleChange: (event: SelectChangeEvent) => void
}

const SortingOrder: React.FC<IProps> = ({ order, handleChange }) => {
  return (
    <FormControl margin="dense" sx={{ width: 150 }}>
      <Select
        id="select-sorting-order"
        value={order}
        label="Select Sorting Order"
        input={<OutlinedInput />}
        onChange={handleChange}
        displayEmpty
        sx={{ "& .MuiSelect-select": { py: 1.2 } }}
      >
        <MenuItem value="">
          <em>Custom Order</em>
        </MenuItem>
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="album">Album</MenuItem>
        <MenuItem value="artist">Artist</MenuItem>
        <MenuItem value="duration">Duration</MenuItem>
        <MenuItem value="date added">Date Added</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortingOrder
