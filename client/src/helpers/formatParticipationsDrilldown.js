import {ENTITY_TYPES, PARTICIPATION_TYPES} from '../config/vars'
import {forEachParticipationsDeepLevel} from './loopParticipationsDeepLevel'

const {BOTH, SHAREHOLDER, ADMINISTRATOR} = PARTICIPATION_TYPES

const formatParticipationsDrilldown = (
  parentEntityID,
  participations,
  parentLevel,
  nodeParentsEntitiesIDs,
  nodeParentsIDs,
) => {
  const entitiesIDsInNode = [...nodeParentsEntitiesIDs, parentEntityID]

  return participations.filter(item => item.legalEntityID === parseInt(parentEntityID)).map(item => {
    const key = [...nodeParentsIDs, item.id].join('_')
    const treasury = item.legalEntityID === item.associatedEntityID
    const infiniteNode = entitiesIDsInNode.includes(item.associatedEntityID)
    const level = parentLevel + 1
    const isIndividual = item.associatedEntity.entityType === ENTITY_TYPES.INDIVIDUAL
    const notEntity = item.shareholderType !== 'entity'

    const collapsable = !isIndividual && !treasury && !notEntity

    let associatedParticipations = []
    if (!!collapsable && !infiniteNode) {
      associatedParticipations = formatParticipationsDrilldown(
        item.associatedEntityID,
        participations,
        level,
        entitiesIDsInNode,
        [...nodeParentsIDs, item.id],
      )
    }

    return {
      ...item,
      key,
      treasury,
      isIndividual,
      notEntity,
      infiniteNode,
      level,
      collapsable,
      associatedParticipations,
    }
  })
}

const setIndexForSortAndCalculatePercentage = participations => {
  let index = 0
  return forEachParticipationsDeepLevel(participations, item => {
    item.index = ++index
    item.calculatedPercentage = item.percentage || 0
  })
}

const sortBeforeFormat = (rootEntityID, participations) => {
  const sortedList = participations ? [...participations] : []
  const aFirst = -1
  const bFirst = 1
  sortedList.sort((a, b) => (a.sort > b.sort ? bFirst : aFirst))

  // global.Simples().CalculatePercentageForParticipations(participations)

  const drilldown = formatParticipationsDrilldown(parseInt(rootEntityID), sortedList, -1, [], [])
  setIndexForSortAndCalculatePercentage(drilldown)

  return drilldown
}

export default sortBeforeFormat
