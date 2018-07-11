export const SET_CONTROLS_LIST = 'SET_CONTROLS_LIST'
export const setControlsList = (list) => ({ type: SET_CONTROLS_LIST, payload: list })

export const SET_CONTROLS_SECONDARY_LIST = 'SET_CONTROLS_SECONDARY_LIST'
export const setControlsSecondaryList = (list) => ({ type: SET_CONTROLS_SECONDARY_LIST, payload: list })

export const SET_CONTROLS_SINGLE = 'SET_CONTROLS_SINGLE'
export const setControlsSingle = (value) => ({ type: SET_CONTROLS_SINGLE, payload: value })

export const MERGE_CONTROLS_SINGLE = 'MERGE_CONTROLS_SINGLE'
export const mergeControlsSingle = (value) => ({ type: MERGE_CONTROLS_SINGLE, payload: value })

export const SET_CONTROLS_FORM = 'SET_CONTROLS_FORM'
export const setControlsForm = (value) => ({ type: SET_CONTROLS_FORM, payload: value })

export const MERGE_CONTROLS_FORM = 'MERGE_CONTROLS_FORM'
export const mergeControlsForm = (value) => ({ type: MERGE_CONTROLS_FORM, payload: value })
