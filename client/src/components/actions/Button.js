import './Button.css'

import { Button } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const checkAndCreateGoTo = (props) => (props.to ? (() => props.goTo(props.to)) : null)

const InternalButton = (props) => (
  <Button htmlType={props.submit ? "submit" : ""} className={getDefaultClassName(props, 'button')} onClick={checkAndCreateGoTo(props)} {...props}>
    {props.children}
  </Button>
)

const mapActions = dispatch => ({
  goTo: (path) => dispatch(push(path))
})

export default connect(null, mapActions)(InternalButton)
