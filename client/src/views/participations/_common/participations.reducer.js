import R from 'ramda'

import {
  ADJUST_PARTICIPATIONS_LIST_SORT_AFTER_REMOVE,
  CHANGE_PARTICIPATIONS_LIST_ITEM_SORT,
  MERGE_PARTICIPATIONS_DRILLDOWN_LIST,
  MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ENTITY,
  MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ITEM,
  MERGE_PARTICIPATIONS_FORM,
  REMOVE_PARTICIPATIONS_DRILLDOWN_LIST,
  SET_PARTICIPATIONS_DRILLDOWN_LIST,
  SET_PARTICIPATIONS_FORM,
  SET_PARTICIPATIONS_LIST,
  TOGGLE_PARTICIPATIONS_DRILLDOWN_LIST_COLLAPSE,
} from './participations.actions'
import {PARTICIPATION_OWNERSHIP_TYPES, PARTICIPATION_TYPES} from '../../../config/vars'
import {ajustSortAfterRemoveParticipation, moveSortParticipation} from '../../../helpers/participationSortHelpers'
import formatParticipationsDrilldown from '../../../helpers/formatParticipationsDrilldown'

const {BOTH, SHAREHOLDER, ADMINISTRATOR} = PARTICIPATION_TYPES

const formatFormBeforeStore = p => {
  let participationTypeArray = p.participationTypeArray || []
  let participationType = p.participationType

  let ownershipType = p.ownershipType
  if (!ownershipType) {
    ownershipType = p.quotas > 0 ? PARTICIPATION_OWNERSHIP_TYPES.QUOTAS : PARTICIPATION_OWNERSHIP_TYPES.PERCENTAGE
  }

  if (participationTypeArray.length === 0 && !!p.participationType) {
    participationTypeArray = p.participationType === BOTH ? [SHAREHOLDER, ADMINISTRATOR] : [p.participationType]
  }

  if (participationTypeArray.length > 0) {
    participationType = (participationTypeArray.length === 2 ? BOTH : participationTypeArray[0]) || SHAREHOLDER
  }

  return {
    ...p,
    participationTypeArray,
    participationType,
    ownershipType,
  }
}

const defaultState = {form: {}, drilldownList: [], rawList: [], list: [], rootEntityID: 0}

const reducer = (state = defaultState, action) => {
  let drilldownList, rawList
  switch (action.type) {
    case SET_PARTICIPATIONS_FORM:
      return {...state, form: formatFormBeforeStore(action.payload)}

    case MERGE_PARTICIPATIONS_FORM:
      return {...state, form: formatFormBeforeStore({...state.form, ...action.payload})}

    case SET_PARTICIPATIONS_DRILLDOWN_LIST:
      let {rootEntityID, list} = action.payload
      return {
        ...state,
        rawList: [...list],
        rootEntityID,
        drilldownList: formatParticipationsDrilldown(rootEntityID, list),
      }

    case SET_PARTICIPATIONS_LIST:
      return {...state, list: action.payload}

    case TOGGLE_PARTICIPATIONS_DRILLDOWN_LIST_COLLAPSE:
      rawList = state.rawList.map(item => (item.id === action.payload ? {...item, collapsed: !item.collapsed} : item))
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    case MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ITEM:
      const {participation, id} = action.payload
      rawList = state.rawList.map(item => (item.id === id ? {...item, ...participation} : item))
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    case MERGE_PARTICIPATIONS_DRILLDOWN_LIST:
      rawList = R.uniqBy(R.prop('id'), [...state.rawList, ...action.payload])
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    case MERGE_PARTICIPATIONS_DRILLDOWN_LIST_ENTITY:
      const entity = action.payload
      rawList = state.rawList.map(
        participation =>
          participation.associatedEntityID === entity.id
            ? {...participation, associatedEntity: {...participation.associatedEntity, ...entity}}
            : participation,
      )
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    case REMOVE_PARTICIPATIONS_DRILLDOWN_LIST:
      rawList = state.rawList.filter(item => item.id !== action.payload)
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    case CHANGE_PARTICIPATIONS_LIST_ITEM_SORT:
      const {participationThatMoved, participationOnFinalPosition} = action.payload
      rawList = moveSortParticipation(state.rawList, participationThatMoved, participationOnFinalPosition)
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    case ADJUST_PARTICIPATIONS_LIST_SORT_AFTER_REMOVE:
      const participationRemoved = action.payload
      rawList = ajustSortAfterRemoveParticipation(state.rawList, participationRemoved)
      return {...state, rawList, drilldownList: formatParticipationsDrilldown(state.rootEntityID, rawList)}

    default:
      return state
  }
}

export default reducer
