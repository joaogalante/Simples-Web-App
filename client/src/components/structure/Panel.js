import './Panel.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Panel = (props) => (
  <div className={getDefaultClassName(props, 'panel')} {...props}>
    {props.children}
  </div>
)

export default Panel
