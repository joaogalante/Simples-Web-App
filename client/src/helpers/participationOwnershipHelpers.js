import {PARTICIPATION_OWNERSHIP_TYPES} from '../config/vars'

export const cleanPercentageAndQuotasForParticipation = p => {
  return {
    ...p,
    percentage: p.ownershipType === PARTICIPATION_OWNERSHIP_TYPES.PERCENTAGE ? p.percentage : undefined,
    quotas: p.ownershipType === PARTICIPATION_OWNERSHIP_TYPES.QUOTAS ? p.quotas : undefined,
  }
}
