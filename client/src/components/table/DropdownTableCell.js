import './DropdownTableCell.css'

import React from 'react'

import { TableLinkCell } from './Table'
import Retangle from '../shapes/Retangle'
import Triangle from '../shapes/Triangle'

const DropdownTableCell = ({ collapsed, onClick, level, collapsable, color }) => (
  <TableLinkCell className='dropdown-table-cell' onClick={onClick} > 
    {collapsable && <Triangle down={collapsed} color={color} />}
    {!collapsable && <Retangle color={color} />}
  </TableLinkCell> 
)

export default DropdownTableCell
