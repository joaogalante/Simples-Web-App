import { CLOSE_ALL_MODALS, CLOSE_MODAL, OPEN_MODAL } from './modal.actions'

const defaultState = {}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, [action.payload]: true } 

    case CLOSE_MODAL:
      return { ...state, [action.payload]: false }

    case CLOSE_ALL_MODALS:
      return defaultState

    default:
      return state
  }
}

export default reducer
