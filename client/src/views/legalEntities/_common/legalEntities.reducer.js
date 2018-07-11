import moment from 'moment'

import {
  MERGE_LEGAL_ENTITIES_FORM,
  MERGE_LEGAL_ENTITIES_SINGLE,
  SET_LEGAL_ENTITIES_FORM,
  SET_LEGAL_ENTITIES_LIST,
  SET_LEGAL_ENTITIES_SINGLE,
} from './legalEntities.actions'

const formatFormBeforeStore = r => {
  return {
    ...r,
    bornAt: !!r.bornAt ? moment.utc(r.bornAt) : r.bornAt,
  }
}

const defaultState = {form: {}, single: {}, list: []}

const reducer = (state = defaultState, action) => {
  let participations

  switch (action.type) {
    case SET_LEGAL_ENTITIES_LIST:
      return {...state, list: action.payload}

    case SET_LEGAL_ENTITIES_SINGLE:
      return {...state, single: action.payload}

    case MERGE_LEGAL_ENTITIES_SINGLE:
      return {...state, single: {...state.single, ...action.payload}}

    case SET_LEGAL_ENTITIES_FORM:
      return {...state, form: formatFormBeforeStore(action.payload)}

    case MERGE_LEGAL_ENTITIES_FORM:
      return {...state, form: {...state.form, ...action.payload}}

    default:
      return state
  }
}

export default reducer
