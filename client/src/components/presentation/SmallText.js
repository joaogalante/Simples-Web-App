import './SmallText.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const SmallText = (props) => (
	<div className={getDefaultClassName(props, 'small-text')}>
    {props.children}
  </div>
)

export default SmallText
