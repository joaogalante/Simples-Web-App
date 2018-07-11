import './Table.css'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'
import Link from '../actions/Link'

const getClass = (level) => `dropdown-table-cell level-${level > 5 ? 'up' : level}`
export const TableCell = (props) => (
  <div className={getDefaultClassName(props, 'table-cell ' + (props.className || ''))}>
    {props.children}
  </div>
)

export const TableLinkCell = (props) => (
  <TableCell main {...props}>
    <Link to={props.to} onClick={props.onClick}>
      {props.children}
    </Link>
  </TableCell>
)

const getRowClass = (props) => getDefaultClassName(props, `table-row level-${props.level > 10 ? 'up' : props.level} ${props.className}`)

export const TableRow = (props) => (
  <div className={getRowClass(props)}>
    {props.children}
  </div>
)

const Table = (props) => (
  <div className={getDefaultClassName(props, 'table')}>
    {props.children}
  </div>
)

export const SortableTable = SortableContainer(Table)
export const SortableTableRow = SortableElement(TableRow)


export default Table
