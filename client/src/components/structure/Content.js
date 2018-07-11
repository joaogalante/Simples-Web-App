import './Content.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Content = (props) => (
  <div className={getDefaultClassName(props, 'content')}>
    {props.children}
  </div>
)

export default Content
