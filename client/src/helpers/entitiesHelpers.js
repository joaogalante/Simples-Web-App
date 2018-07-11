import moment from 'moment'

import {ENTITY_TYPES} from '../config/vars'

export const hasRecentMention = item =>
  !!item.lastMentionAt && moment(item.lastMentionAt).isAfter(moment().subtract(6, 'month'))

export const checkSortForEntitiesOnControlSearch = (a, b) => {
  const aFirst = -1
  const bFirst = 1

  const aRecentMention = hasRecentMention(a)
  const bRecentMention = hasRecentMention(b)
  const aLegal = a.entityType === ENTITY_TYPES.LEGAL
  const bLegal = b.entityType === ENTITY_TYPES.LEGAL

  if (aRecentMention && !bRecentMention) {
    return bFirst
  }
  if (!aRecentMention && bRecentMention) {
    return aFirst
  }

  if (aRecentMention && bRecentMention) {
    if (a.lastControl.id !== b.lastControl.id) {
      return a.lastMentionAt > b.lastMentionAt ? aFirst : bFirst
    }
  }

  if (aLegal && !bLegal) {
    return aFirst
  }
  if (!aLegal && bLegal) {
    return bFirst
  }

  return a.name.toUpperCase() > b.name.toUpperCase()
}
