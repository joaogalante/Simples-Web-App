import { Form, Modal } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import {
  goToShowIndividualEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import { setIndividualEntitiesForm } from '../_common/individualEntities.actions'
import CreateOrSelectEntityFlow from
  '../../entities/form/CreateOrSelectEntityFlow'

const IndividualEntityCodeForm = ({ form: { getFieldDecorator }, redirectAction, returnTo, form }) => (
	<CreateOrSelectEntityFlow  
		returnTo={returnTo}
		entityType='individual'
		form={form}
		getFieldDecorator={getFieldDecorator}
		redirectAction={redirectAction} />
)

const confirm = Modal.confirm

const mapActions = (dispatch, { redirectTo }) => ({
  redirectAction: (entity, handleError) => {
		if(!!entity.code && !!entity.id) {
			confirm({
				title: 'CPF já cadastrado no sistema!',
				content: 'Deseja ver a pessoa juridica cadastrada com esse CPF?',
				okText: 'Sim',
				cancelText: 'Não',
				onOk() {
					goToShowIndividualEntity(dispatch, entity)
				},
			})
			return
		}
		if(!!entity.name && !!entity.id) {
			goToShowIndividualEntity(dispatch, entity)
			return
		}
		dispatch(setIndividualEntitiesForm(entity))
		dispatch(push(redirectTo))
  }
})

const enhace = compose(
  connect(null, mapActions),
  Form.create()
)

export default enhace(IndividualEntityCodeForm)
