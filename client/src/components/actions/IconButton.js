import './IconButton.css'

import {Dropdown, Tooltip} from 'antd'
import React from 'react'

import Icon from '../shapes/Icon'
import Link from './Link'

const IconButton = ({path, tip, icon, ...restProps}) => (
  <Tooltip title={tip} placement="left">
    <div>
      <Link className="icon-button" to={path} {...restProps}>
        <Icon name={icon} white />
      </Link>
    </div>
  </Tooltip>
)

export const IconButtonDropdown = ({menu, placement, ...restProps}) => (
  <Dropdown overlay={menu} placement={placement || 'bottomRight'}>
    <div>
      <IconButton {...restProps} />
    </div>
  </Dropdown>
)

export default IconButton
