import './Separator.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Separator = (props) => (
  <div className={getDefaultClassName(props, 'separator')} {...props} />
)

export default Separator
