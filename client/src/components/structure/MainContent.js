import './MainContent.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const MainContent = (props) => (
  <div className={getDefaultClassName(props, 'main-content')}>
    {props.children}
  </div>
)

export default MainContent
