export const SET_LEGAL_ENTITIES_LIST = 'SET_LEGAL_ENTITIES_LIST'
export const setLegalEntitiesList = (list) => ({ type: SET_LEGAL_ENTITIES_LIST, payload: list })

export const SET_LEGAL_ENTITIES_SINGLE = 'SET_LEGAL_ENTITIES_SINGLE'
export const setLegalEntitiesSingle = (value) => ({ type: SET_LEGAL_ENTITIES_SINGLE, payload: value })

export const MERGE_LEGAL_ENTITIES_SINGLE = 'MERGE_LEGAL_ENTITIES_SINGLE'
export const mergeLegalEntitiesSingle = (value) => ({ type: MERGE_LEGAL_ENTITIES_SINGLE, payload: value })

export const SET_LEGAL_ENTITIES_FORM = 'SET_LEGAL_ENTITIES_FORM'
export const setLegalEntitiesForm = (value) => ({ type: SET_LEGAL_ENTITIES_FORM, payload: value })

export const MERGE_LEGAL_ENTITIES_FORM = 'MERGE_LEGAL_ENTITIES_FORM'
export const mergeLegalEntitiesForm = (value) => ({ type: MERGE_LEGAL_ENTITIES_FORM, payload: value })
