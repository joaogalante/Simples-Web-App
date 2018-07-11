import './Retangle.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Retangle = (props) => (
  <div className={getDefaultClassName(props, 'retangle')} />
)

export default Retangle 
