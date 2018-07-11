import { Select } from 'antd'
import React from 'react'

import { getInputRules } from '../../helpers/formHelpers'
import FormItem from './FormItem'

const Option = Select.Option

const InputArray = (props) => {
  const { field, value, placeholder, onChange, options, getFieldDecorator, ...restProps } = props

	return (
		<FormItem {...restProps}>
			{getFieldDecorator(field, {
				rules: getInputRules(props),
			})(
				<Select
					mode="tags"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				>
						{options.map(item => (
							<Option key={item}>{item}</Option>
						))}
				</Select>
			)}
		</FormItem>
	)
}

export default InputArray
