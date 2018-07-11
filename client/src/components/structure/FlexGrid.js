import './FlexGrid.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const FlexGrid = (props) => (
  <div className={getDefaultClassName(props, 'flex-grid')}>
    {props.children}
  </div>
)

export default FlexGrid 
