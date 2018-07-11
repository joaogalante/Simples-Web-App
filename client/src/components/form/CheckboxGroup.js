import './Input.css'

import { Checkbox } from 'antd'
import React from 'react'

import { getInputRules } from '../../helpers/formHelpers'
import FormItem from './FormItem'

const CheckboxGroup = Checkbox.Group

const InternalCheckboxGroup = (props) => {
  const { field, options, getFieldDecorator, ...restProps } = props

  return (
    <FormItem {...restProps}>
      {getFieldDecorator(field, {
        rules: getInputRules(props),
      })(
        <CheckboxGroup options={options} />
      )}
    </FormItem>
  )
}

export default InternalCheckboxGroup 
