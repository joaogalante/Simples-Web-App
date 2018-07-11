import './InputNumber.css'

import {InputNumber} from 'antd'
import React from 'react'

import {getInputRules} from '../../helpers/formHelpers'
import FormItem from './FormItem'

const InternalInput = props => {
  const {field, min, max, formatter, parser, type, placeholder, getFieldDecorator, precision, ...restProps} = props

  return (
    <FormItem {...restProps}>
      {getFieldDecorator(field, {
        rules: getInputRules(props),
      })(
        <InputNumber
          placeholder={placeholder}
          className="input input-number"
          min={min}
          max={max}
          formatter={formatter}
          parser={parser}
        />,
      )}
    </FormItem>
  )
}

export default InternalInput
