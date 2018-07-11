export const SET_REDIRECT = 'SET_REDIRECT'
export const setRedirect = (key, url) => ({type: SET_REDIRECT, payload: {key, url}})

export const CLEAR_REDIRECT = 'CLEAR_REDIRECT'
export const clearRedirect = key => ({type: CLEAR_REDIRECT, payload: key})
