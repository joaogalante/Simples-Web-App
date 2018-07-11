import './Link.css'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const Link = (props) => {
  const { children, className, goTo, to, onClick, restProps } = props

  return (
    <a className={getDefaultClassName(props, 'link ' + (className || ''))} onClick={onClick || (() => goTo(to))} {...restProps}>
      {children}
    </a>
  )
}

const mapActions = dispatch => ({
  goTo: (path) => dispatch(push(path))
})

export default connect(null, mapActions)(Link)
