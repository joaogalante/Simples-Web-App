import './TitleSubtitle.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const TitleSubtitle = (props) => (
  <div className={getDefaultClassName(props, 'title-subtitle')}>
    <div className='title'>{props.title}</div>
    <div className='subtitle'>{props.subtitle}</div>
  </div>
)

export default TitleSubtitle 
