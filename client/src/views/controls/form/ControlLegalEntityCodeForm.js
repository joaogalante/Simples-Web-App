import { Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { generateMapPropsToFields } from '../../../helpers/formHelpers'
import CreateOrSelectEntityFlow from
  '../../entities/form/CreateOrSelectEntityFlow'

const ControlLegalEntityCodeForm = ({ form: { getFieldDecorator }, loading, returnAction, form, submit }) => (
	<CreateOrSelectEntityFlow    
		returnAction={returnAction}
		entityType='legal'
		form={form}
		getFieldDecorator={getFieldDecorator}
		redirectAction={submit} />
)

const mapState = state => ({
  control: state.controls.form,
})

const mapActions = (dispatch, { redirectAction }) => ({
	// TODO: Remove submit and handle all on redirectAction function
  submit: (entity, handleError) => {
		if(!entity.id) {
			redirectAction({ ...entity }, true, entity.fromGovApi)
		} else {
			redirectAction(entity)
		}
  }
})

const mapPropsToFields = ({ control }) => (
  generateMapPropsToFields(control)
)

const enhace = compose(
  connect(mapState, mapActions), 
  Form.create({ mapPropsToFields })
)

export default enhace(ControlLegalEntityCodeForm)
