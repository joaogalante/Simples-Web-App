export const SET_ENTITIES_LIST = 'SET_ENTITIES_LIST'
export const setEntitiesList = list => ({type: SET_ENTITIES_LIST, payload: list})

export const SET_ENTITIES_FOLDER_STRUCTURE = 'SET_ENTITIES_FOLDER_STRUCTURE'
export const setEntitiesFolderStructure = list => ({type: SET_ENTITIES_FOLDER_STRUCTURE, payload: list})

export const SET_ENTITIES_FORM = 'SET_ENTITIES_FORM'
export const setEntitiesForm = value => ({type: SET_ENTITIES_FORM, payload: value})

export const MERGE_ENTITIES_FORM = 'MERGE_ENTITIES_FORM'
export const mergeEntitiesForm = value => ({type: MERGE_ENTITIES_FORM, payload: value})
