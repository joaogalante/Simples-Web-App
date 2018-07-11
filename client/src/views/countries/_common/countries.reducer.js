import {
  SET_COUNTRIES_LIST,
  SET_COUNTRIES_MAIN_LIST,
} from './countries.actions'

const defaultState = { list: [], mainList: [] }

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COUNTRIES_LIST:
     return { ...state, list: action.payload }

    case SET_COUNTRIES_MAIN_LIST:
      return { ...state, mainList: action.payload }
	  default:
      return state
  }
}

export default reducer
