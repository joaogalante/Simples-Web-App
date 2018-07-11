import './DragButton.css'

import {SortableHandle} from 'react-sortable-hoc'
import React from 'react'

import Icon from '../shapes/Icon'
import Link from './Link'

export const SortButton = SortableHandle(() => (
  <Link className="icon-button drag-button" lightGrey>
    <Icon name="up-down" white />
  </Link>
))

const DragButton = SortableHandle(() => (
  <Link className="icon-button drag-button" lightGrey>
    <Icon name="squares" white />
  </Link>
))

export default DragButton
