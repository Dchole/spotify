import { songs } from "@/data/songs"
import { AutocompleteGroupedOption, useAutocomplete } from "@mui/core"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"

interface IAutoComplete {
  inputValue: string
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>
  getInputProps: () => React.HTMLAttributes<HTMLInputElement>
  getListboxProps: () => React.HTMLAttributes<HTMLUListElement>
  getOptionProps: ({
    option,
    index
  }: {
    option: typeof songs[0]
    index: number
  }) => React.HTMLAttributes<HTMLLIElement>
  groupedOptions: typeof songs | AutocompleteGroupedOption<typeof songs[0]>[]
  value: {
    title: string
    cover: string
    album: string
    artist: string
    listeners: number
    dateAdded: string
  } | null
}

interface IContextProps {
  autocompleteProps: IAutoComplete
  searching: boolean
  startSearch: () => void
}

const SearchContext = createContext<IContextProps | undefined>(undefined)

const SearchProvider: React.FC = ({ children }) => {
  const [searching, setSearching] = useState(false)
  const [options, setOptions] = useState<typeof songs>([])
  const {
    value,
    inputValue,
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: "search-combo-box",
    options,
    getOptionLabel: option => option.title
  })

  useEffect(() => {
    const fetchResult = async () => {
      try {
        await sleep(1e3) // For demo purposes.
        setOptions(songs)
      } catch (error) {
        console.log(error)
      } finally {
        setSearching(false)
      }
    }

    searching && fetchResult()
  }, [searching])

  const startSearch = useCallback(() => setSearching(true), [])

  const autocompleteProps = {
    value,
    inputValue,
    getRootProps,
    getInputProps,
    getOptionProps,
    groupedOptions,
    getListboxProps
  }

  return (
    <SearchContext.Provider
      value={{ autocompleteProps, searching, startSearch }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)

  if (context === undefined)
    throw new Error("useSearch must be inside a Provider with a value")

  return context
}

export default SearchProvider

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
