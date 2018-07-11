import './Icon.css'
import './IconFonts.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Icon = (props) => (
  <span className={getDefaultClassName(props, 'icon icon-' + props.name)} />
)

export default Icon
