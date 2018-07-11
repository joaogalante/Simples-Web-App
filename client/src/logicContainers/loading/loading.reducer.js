import { LOADING_START, LOADING_STOP } from './loading.actions'

const defaultState = {}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_START:
      return { ...state, [action.payload]: true } 

    case LOADING_STOP:
      return { ...state, [action.payload]: false }

    default:
      return state
  }
}

export default reducer
