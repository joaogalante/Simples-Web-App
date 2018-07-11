import './Input.css'

import { Radio } from 'antd'
import React from 'react'

import { getInputRules } from '../../helpers/formHelpers'
import FormItem from './FormItem'

const RadioGroup = Radio.Group

const InternalRadioGroup = (props) => {
  const { field, options, getFieldDecorator, ...restProps } = props

  return (
    <FormItem {...restProps}>
      {getFieldDecorator(field, {
        rules: getInputRules(props),
      })(
        <RadioGroup options={options} />
      )}
    </FormItem>
  )
}

export default InternalRadioGroup 
