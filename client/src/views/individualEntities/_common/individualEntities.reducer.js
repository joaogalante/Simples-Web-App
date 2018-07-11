import moment from 'moment'

import {
  MERGE_INDIVIDUAL_ENTITIES_FORM,
  SET_INDIVIDUAL_ENTITIES_FORM,
  SET_INDIVIDUAL_ENTITIES_LIST,
  SET_INDIVIDUAL_ENTITIES_SINGLE,
} from './individualEntities.actions'

const formatFormBeforeStore = r => {
  return {
    ...r,
    bornAt: !!r.bornAt ? moment.utc(r.bornAt) : r.bornAt,
  }
}

const defaultState = {form: {}, list: [], single: {}}

const reducer = (state = defaultState, action) => {
  let participations

  switch (action.type) {
    case SET_INDIVIDUAL_ENTITIES_LIST:
      return {...state, list: action.payload}

    case SET_INDIVIDUAL_ENTITIES_FORM:
      return {...state, form: formatFormBeforeStore(action.payload)}

    case MERGE_INDIVIDUAL_ENTITIES_FORM:
      return {...state, form: {...state.form, ...action.payload}}

    case SET_INDIVIDUAL_ENTITIES_SINGLE:
      return {...state, single: action.payload}

    default:
      return state
  }
}

export default reducer
