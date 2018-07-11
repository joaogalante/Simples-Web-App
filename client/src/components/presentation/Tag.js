import './Tag.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Tag = (props) => (
  <span className={getDefaultClassName(props, 'tag')}>
    {props.children}
  </span>
)

export default Tag 
