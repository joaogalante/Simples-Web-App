import React from 'react'

import {PARTICIPATION_TYPES} from '../config/vars'
import PercentageValue from './presentation/PercentageValue'

const {SHAREHOLDER, ADMINISTRATOR, BOTH} = PARTICIPATION_TYPES

const ParticipationLabel = ({participation, parent}) => {
  let label = ''
  if (participation.participationType === BOTH) label += '| '
  if (participation.participationType !== SHAREHOLDER) label += `${participation.jobTitles.join(' | ')} `
  if (parent) label += `- ${parent.name}`

  const isQuotas =
    participation.participationType !== ADMINISTRATOR && !participation.calculatedPercentage && participation.quotas > 0

  if (isQuotas) {
    return (
      <span>
        {participation.quotas} cotas {label}
      </span>
    )
  }

  return (
    <PercentageValue value={participation.participationType !== ADMINISTRATOR && participation.calculatedPercentage}>
      {label}
    </PercentageValue>
  )
}

export default ParticipationLabel
