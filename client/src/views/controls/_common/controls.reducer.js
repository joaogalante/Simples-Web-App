import moment from 'moment'

import {
  MERGE_CONTROLS_FORM,
  MERGE_CONTROLS_SINGLE,
  SET_CONTROLS_FORM,
  SET_CONTROLS_LIST,
  SET_CONTROLS_SECONDARY_LIST,
  SET_CONTROLS_SINGLE,
} from './controls.actions'

const formatFormBeforeStore = (r) => {
  return {
    ...r,
    deliveryDate: moment(r.deliveryDate),
    requestDate: moment(r.requestDate)
  }
}

// Secondary list is used for the controls modal, sometime it could colide with the main list
const defaultState = { form: {}, single: {}, list: [], secondaryList: [], logs: [] }

const reducer = (state = defaultState, action) => {
  let participations

  switch (action.type) {
    case SET_CONTROLS_LIST:
      return { ...state, list: action.payload }

   case SET_CONTROLS_SECONDARY_LIST:
      return { ...state, secondaryList: action.payload }
      
    case SET_CONTROLS_SINGLE:
      return { ...state, single: action.payload }

    case MERGE_CONTROLS_SINGLE:
      return { ...state, single: { ...state.single, ...action.payload } }

    case SET_CONTROLS_FORM:
      return { ...state, form: formatFormBeforeStore(action.payload) }

    case MERGE_CONTROLS_FORM:
      return { ...state, form: { ...state.form, ...action.payload } }

    default:
      return state
  }
}

export default reducer
