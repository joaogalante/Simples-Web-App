import {
  MERGE_JOB_TITLES_LIST,
  SET_JOB_TITLES_LIST
} from './jobTitles.actions'

const defaultState = { list: [], mainList: [] }

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_JOB_TITLES_LIST:
			return { ...state, list: action.payload }

    case MERGE_JOB_TITLES_LIST:
			const currentValuesNames = state.list.map(item => item.name)
			const newValues = action.payload.filter(item => !currentValuesNames.includes(item && item.name))
			return { ...state, list: [...newValues, ...state.list] }

	  default:
      return state
  }
}

export default reducer
