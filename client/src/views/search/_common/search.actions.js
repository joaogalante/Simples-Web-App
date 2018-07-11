export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT'
export const setSearchResult = (result) => (
  { type: SET_SEARCH_RESULT, payload: result }
)

export const SET_SEARCH_FORM = 'SET_SEARCH_FORM'
export const setSearchForm = (value) => ({ type: SET_SEARCH_FORM, payload: value })

export const MERGE_SEARCH_FORM = 'MERGE_SEARCH_FORM'
export const mergeSearchForm = (value) => ({ type: MERGE_SEARCH_FORM, payload: value })
