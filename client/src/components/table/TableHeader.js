import './TableHeader.css'

import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const TableHeader = (props) => (
  <div className={getDefaultClassName(props, 'table-header')}>
    {props.children}
  </div>
)

export default TableHeader
