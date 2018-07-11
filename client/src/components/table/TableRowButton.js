import './TableRowButton.css'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'
import Link from '../actions/Link'

const TableRowButton = (props) => (
  <Link className={getDefaultClassName(props, 'table-row-button')} {...props}>
    {props.children}
  </Link>
)

const mapActions = dispatch => ({
  goTo: (path) => dispatch(push(path))
})

export default connect(null, mapActions)(TableRowButton)
