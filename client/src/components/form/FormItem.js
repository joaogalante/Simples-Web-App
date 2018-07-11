import './FormItem.css'

import { Form } from 'antd'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const FormItem = Form.Item

const InternalFormItem = (props) => (
  <FormItem className={getDefaultClassName(props, 'form-item')} {...props}>
    {props.children}
  </FormItem>
)

export default InternalFormItem
