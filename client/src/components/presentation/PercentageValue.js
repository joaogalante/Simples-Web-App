import {Tooltip} from 'antd'
import React from 'react'

import {PARTICIPATION_TYPES} from '../../config/vars'

const {SHAREHOLDER, ADMINISTRATOR, BOTH} = PARTICIPATION_TYPES

export const convertNumberToBrFormat = value => value.toString().replace('.', ',')

const PercentageValue = ({value, children}) => {
  if (value === false) return children || false

  const brValue = convertNumberToBrFormat(value)
  const fullValue = brValue + '%'
  const shortValue = convertNumberToBrFormat(parseFloat(value).toFixed(2)) + '%'

  return (
    <Tooltip title={fullValue}>
      {shortValue} {children}
    </Tooltip>
  )
}

export default PercentageValue
