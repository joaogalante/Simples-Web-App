import {  Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import {
  formSubmitHandler,
  generateMapPropsToFields,
} from '../../../helpers/formHelpers'
import { setSearchForm } from '../_common/search.actions'
import HeaderSearchInput from '../../../components/form/HeaderSearchInput'

const HeaderSearchForm = ({ form: { getFieldDecorator }, form, submit }) => (
  <HeaderSearchInput onSubmit={formSubmitHandler(submit, form)} getFieldDecorator={getFieldDecorator} />
)

const mapState = state => ({
  searchObj: state.search.form
})

const mapActions = (dispatch) => ({
  submit: (searchObj, handleError) => {
    dispatch(setSearchForm(searchObj))
    dispatch(push(`/search?q=${encodeURIComponent(searchObj.search)}`))
  }
})

const mapPropsToFields = ({ searchObj }) => (
  generateMapPropsToFields(searchObj)
)

const enhace = compose(
  connect(mapState, mapActions),
  Form.create({ mapPropsToFields })
)

export default enhace(HeaderSearchForm)
