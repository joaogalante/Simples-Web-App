import {
  MERGE_SEARCH_FORM,
  SET_SEARCH_FORM,
  SET_SEARCH_RESULT,
} from './search.actions'

const defaultState = { form: {}, result: { legalEntities: [], individualEntities: [], controls: [], unregisteredEntity: {} } }

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      const { legalEntities, individualEntities, controls, unregisteredEntity } = action.payload
      return { ...state, result: { 
        legalEntities: legalEntities || [],  
        individualEntities: individualEntities || [],  
        controls: controls || [],  
        unregisteredEntity: unregisteredEntity || {},  
      } }
      
    case SET_SEARCH_FORM:
      return { ...state, form: action.payload }

    case MERGE_SEARCH_FORM:
      return { ...state, form: { ...state.form, ...action.payload } }


    default:
      return state
  }
}

export default reducer
