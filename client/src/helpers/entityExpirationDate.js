import moment from 'moment'

export const entityExpirationDate = entity => moment(entity.revisedAt).add(6, 'months')

export const expidationDateFromNow = entity => entityExpirationDate(entity).fromNow()

export const formatedEntityExpirationDate = entity => {
  const expirationDate = entityExpirationDate(entity)
  return expirationDate.format('DD/MM/YYYY')
}

export const formatedEntityFullExpirationDate = entity => {
  const expirationDate = entityExpirationDate(entity)
  return `${expirationDate.format('DD/MM/YYYY')} (${expirationDate.fromNow()})`
}

export const isEntityExpired = entity =>
  !!entity && !!entity.revisedAt && moment().isAfter(entityExpirationDate(entity))
