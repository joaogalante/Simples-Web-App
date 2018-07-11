import './SideBar.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'
import Icon from '../shapes/Icon'
import Link from '../actions/Link'

export const SideBarItem = (props) => (
  <Link {...props}>
    <div className={getDefaultClassName(props, 'side-bar-item')}>
			<Icon name={props.icon} blue={props.active} />
      <div className='label'>{props.label}</div>
    </div>
  </Link>
)

export const SideBarSection = (props) => (
  <div className={getDefaultClassName(props, 'side-bar-section')}>
    {props.children}
  </div>
)

export const SideBarLinksSection = (props) => (
  <div className={getDefaultClassName(props, 'side-bar-links-section')}>
    {props.children}
  </div>
)

const SideBar = (props) => (
  <div className={getDefaultClassName(props, 'side-bar')}>
    {props.children}
  </div>
)

export default SideBar
