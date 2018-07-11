import './Input.css'

import {Input} from 'antd'
import React from 'react'

import {getInputRules} from '../../helpers/formHelpers'
import FormItem from './FormItem'

const InternalInput = props => {
  const {field, type, addonBefore, focus, placeholder, getFieldDecorator, ...restProps} = props

  return (
    <FormItem {...restProps}>
      {getFieldDecorator(field, {
        rules: getInputRules(props),
      })(<Input type={type} placeholder={placeholder} className="input" autoFocus={focus} addonBefore={addonBefore} />)}
    </FormItem>
  )
}

export const InputGroup = Input.Group

export default InternalInput
