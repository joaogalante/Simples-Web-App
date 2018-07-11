import {CLEAR_REDIRECT, SET_REDIRECT} from './redirects.actions'

const defaultState = {}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_REDIRECT:
      const {key, url} = action.payload
      return {...state, [key]: url}

    case CLEAR_REDIRECT:
      return {...state, [action.payload]: false}

    default:
      return state
  }
}

export default reducer
