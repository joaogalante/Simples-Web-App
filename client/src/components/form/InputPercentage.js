import { Input } from 'antd'
import React from 'react'

import { getInputRules } from '../../helpers/formHelpers'
import FormItem from './FormItem'

const onChangeHandler = (props) => (e) => {
	const newValue = e.target.value.replace('%', '').replace(',', '.')
	console.log('changing', e.target.value, newValue)
	props.onChange(newValue)
}

const InternalInput = (props) => {
	const value = props.value.toString().replace('.', ',') + '%'
	console.log('setting', props.value, value)
	return (
		<Input placeholder={props.placeholder} className="input" onChange={onChangeHandler(props)} value={value} />
	)
}

const InputPercentage = (props) => {
  const { field, min, max, formatter, parser, type, placeholder, getFieldDecorator, precision, ...restProps } = props

  return (
    <FormItem {...restProps}>
      {getFieldDecorator(field, {
        rules: getInputRules(props),
      })(
				<InternalInput placeholder={placeholder} />
      )}
    </FormItem>
  )
}

export default InputPercentage 
