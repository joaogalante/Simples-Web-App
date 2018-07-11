import './Modal.css'

import { Modal } from 'antd'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const getClassName = (props) => {
  let className = 'modal'
  if(props.noControls) className += ' no-controls'
  return getDefaultClassName(props, className)
}

const InternalModal = (props) => (
  <Modal className={getClassName(props)} {...props} />
)

export default InternalModal
