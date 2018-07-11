import './InputDate.css'

import { DatePicker } from 'antd'
import React from 'react'

import { getInputRules } from '../../helpers/formHelpers'
import FormItem from './FormItem'

const InternalInputDate = (props) => {
  const { field, type, placeholder, getFieldDecorator, ...restProps } = props

  return (
    <FormItem {...restProps}>
      {getFieldDecorator(field, {
        rules: getInputRules(props),
      })(
        <DatePicker className="input-date" format='DD/MM/YYYY' />
      )}
    </FormItem>
  )
}

export default InternalInputDate 
