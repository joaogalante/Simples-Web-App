import {Tooltip} from 'antd'
import React from 'react'
import moment from 'moment'

import {isEntityExpired} from '../../../helpers/entityExpirationDate'
import Icon from '../../../components/shapes/Icon'

const EntityExpirationIcon = ({entity}) => {
  if (!entity || !isEntityExpired(entity)) {
    return false
  }

  return (
    <Tooltip title={`Essa entidade foi validada pela última vêz ${moment(entity.revisedAt).fromNow()} atrás`}>
      <div>
        <Icon name="sand-timer" red />
      </div>
    </Tooltip>
  )
}

export default EntityExpirationIcon
