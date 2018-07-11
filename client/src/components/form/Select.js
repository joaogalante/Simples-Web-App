import { Select } from 'antd'
import React from 'react'

import { getInputRules } from '../../helpers/formHelpers'
import FormItem from './FormItem'

export const Option = Select.Option
export const OptGroup = Select.OptGroup

const InternalSelect = (props) => {
  const { field, placeholder, children, getFieldDecorator, showSearch, value, filterOption, onSearch, ...restProps } = props

	return (
		<FormItem {...restProps}>
			{getFieldDecorator(field, {
				rules: getInputRules(props),
			})(
				<Select
						onSearch={onSearch}
						filterOption={filterOption}
						value={value}
						showSearch={showSearch}
						placeholder={placeholder}>
					{children}
				</Select>
			)}
		</FormItem>
	)
}

export default InternalSelect 
