export const LOADING_START = 'LOADING_START'
export const startLoading= (key) => ({ type: LOADING_START, payload: key })

export const LOADING_STOP = 'LOADING_STOP'
export const stopLoading= (key) => ({ type: LOADING_STOP, payload: key })
