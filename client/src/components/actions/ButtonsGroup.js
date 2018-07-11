import './ButtonsGroup.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const ButtonsGroup = (props) => (
  <div className={getDefaultClassName(props, 'buttons-group')}>
    {props.children}
  </div>
)

export default ButtonsGroup
