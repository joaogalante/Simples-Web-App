import React from 'react'
import moment from 'moment'

import {ENTITY_TYPES} from '../../../config/vars'

const {LEGAL} = ENTITY_TYPES

const EntityBornAtInfo = ({entity}) => {
  if (!entity || !entity.bornAt) return false
  return (
    <span>
      {entity.entityType === LEGAL ? 'Constituido' : 'Nascido'} em {moment.utc(entity.bornAt).format('DD/MM/YY')}
    </span>
  )
}

export default EntityBornAtInfo
