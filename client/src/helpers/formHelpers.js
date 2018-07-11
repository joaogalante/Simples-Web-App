import {Form} from 'antd'

import R from 'ramda'

const handleFormSubmitErrors = R.curry((form, values, err) => {
  if (!!err.validations) {
    const valuesData = Object.keys(err.validations).reduce((data, key) => {
      return {
        ...data,
        [key]: {
          value: values[key],
          errors: [new Error(err.validations[key])],
        },
      }
    }, {})

    form.setFields(valuesData)
  }
})

export const formSubmitHandler = R.curry((action, form, event) => {
  event.preventDefault()
  form.validateFields((err, values) => {
    if (!err) {
      action(values, handleFormSubmitErrors(form, values))
    }
  })
})

export const generateMapPropsToFields = obj => {
  const getKey = (field, prefix) => (prefix ? `${prefix}.${field}` : field)

  const getMapOfFields = (obj, initialMap, prefix) => {
    return Object.keys(obj).reduce((map, key) => {
      let value = obj[key]
      if (value !== null && typeof value === 'object' && value.id > -1) {
        value = getMapOfFields(value, map, key)
      }
      map[getKey(key, prefix)] = Form.createFormField({value})
      return map
    }, initialMap)
  }

  return getMapOfFields(obj, {})
}

export const getInputRules = (props, customRules) => {
  const rules = customRules || []

  if (props.required) rules.push({required: true, message: `Favor inserir um(a) ${props.fieldName}!`})

  return rules
}
