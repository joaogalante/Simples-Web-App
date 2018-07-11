export const SET_PARTICIPATIONS_FORM = 'SET_PARTICIPATIONS_FORM'
export const setParticipationsForm = (value) => ({ type: SET_PARTICIPATIONS_FORM, payload: value })

export const MERGE_PARTICIPATIONS_FORM = 'MERGE_PARTICIPATIONS_FORM'
export const mergeParticipationsForm = (value) => ({ type: MERGE_PARTICIPATIONS_FORM, payload: value })

export const SET_PARTICIPATIONS_DRILLDOWN_LIST = 'SET_PARTICIPATIONS_DRILLDOWN_LIST'
export const setParticipationsDrilldownList = (list, rootEntityID) => ({
  type: SET_PARTICIPATIONS_DRILLDOWN_LIST,
  payload: { rootEntityID, list }
})

export const TOGGLE_PARTICIPATIONS_DRILLDOWN_LIST_COLLAPSE = 'TOGGLE_PARTICIPATIONS_DRILLDOWN_LIST_COLLAPSE'
export const toggleParticipationsDrilldownListCollapse = (id) => ({ type: TOGGLE_PARTICIPATIONS_DRILLDOWN_LIST_COLLAPSE, payload: id })

export const MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ITEM = 'MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ITEM'
export const mergeParticipationsDrilldownListItem = (id, participation) => ({ type: MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ITEM, payload: { id, participation } })

export const MERGE_PARTICIPATIONS_DRILLDOWN_LIST = 'MERGE_PARTICIPATIONS_DRILLDOWN_LIST'
export const mergeParticipationsDrilldownList = (id) => ({ type: MERGE_PARTICIPATIONS_DRILLDOWN_LIST, payload: id })

export const MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ENTITY = 'MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ENTITY'
export const mergeParticipationsDrilldownListEntity = (entity) => ({ type: MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ENTITY, payload: entity })

export const REMOVE_PARTICIPATIONS_DRILLDOWN_LIST = 'REMOVE_PARTICIPATIONS_DRILLDOWN_LIST'
export const removeParticipationsDrilldownList = (id) => ({ type: REMOVE_PARTICIPATIONS_DRILLDOWN_LIST, payload: id })

export const SET_PARTICIPATIONS_LIST = 'SET_PARTICIPATIONS_LIST'
export const setParticipationsList = (list) => ({ type: SET_PARTICIPATIONS_LIST, payload: list })

export const CHANGE_PARTICIPATIONS_LIST_ITEM_SORT = 'CHANGE_PARTICIPATIONS_LIST_ITEM_SORT'
export const changeParticipationsListItemSort = (participationThatMoved, participationOnFinalPosition) => ({ type: CHANGE_PARTICIPATIONS_LIST_ITEM_SORT, payload:{participationThatMoved, participationOnFinalPosition} })

export const ADJUST_PARTICIPATIONS_LIST_SORT_AFTER_REMOVE = 'ADJUST_PARTICIPATIONS_LIST_SORT_AFTER_REMOVE'
export const adjustParticipationListSortAfterRemove = (participation) => ({ type: ADJUST_PARTICIPATIONS_LIST_SORT_AFTER_REMOVE, payload: participation })
