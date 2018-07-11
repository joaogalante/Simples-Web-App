import './FlexGridItem.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const FlexGridItem = (props) => (
  <div className={getDefaultClassName(props, 'flex-grid-item')} {...props}>
    {props.children}
  </div>
)

export default FlexGridItem
