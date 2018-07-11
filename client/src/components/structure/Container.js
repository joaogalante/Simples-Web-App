import './Container.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Container = (props) => (
  <div className={getDefaultClassName(props, 'container')}>
    {props.children}
  </div>
)

export default Container
