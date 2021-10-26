export const initialState = {
  context_uri: "",
  started_playing: false,
  is_paused: false,
  current_track: "",
  next_track: "",
  prev_track: "",
  volume: 50,
  progress: 0,
  duration: 0
}

export type TState = typeof initialState

interface IAction {
  payload?: Partial<
    Pick<
      TState,
      | "current_track"
      | "next_track"
      | "prev_track"
      | "progress"
      | "duration"
      | "context_uri"
      | "volume"
    >
  >
  type:
    | "PLAY"
    | "PAUSE"
    | "RESUME"
    | "NEXT"
    | "PREV"
    | "PROGRESS"
    | "SET_VOLUME"
    | "SET_PLAYBACK"
}

export const playbackReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        started_playing: true,
        is_paused: false
      }

    case "SET_VOLUME":
      return { ...state, ...action.payload }

    case "SET_PLAYBACK":
      return { ...state, ...action.payload }

    case "PAUSE":
      return { ...state, is_paused: true }

    case "RESUME":
      return { ...state, is_paused: false }

    case "NEXT":
    case "PREV":
      return { ...state, started_playing: false, is_paused: true }

    case "PROGRESS":
      return { ...state, ...action.payload }

    default:
      return state
  }
}
