import {
  MERGE_ENTITIES_FORM,
  SET_ENTITIES_FOLDER_STRUCTURE,
  SET_ENTITIES_FORM,
  SET_ENTITIES_LIST,
} from './entities.actions'

const defaultState = {list: [], form: {}, folderStructure: {}}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ENTITIES_LIST:
      return {...state, list: action.payload}

    case SET_ENTITIES_FOLDER_STRUCTURE:
      return {...state, folderStructure: action.payload}

    case SET_ENTITIES_FORM:
      return {...state, form: action.payload}

    case MERGE_ENTITIES_FORM:
      return {...state, form: {...state.form, ...action.payload}}

    default:
      return state
  }
}

export default reducer
