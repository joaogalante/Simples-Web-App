import { Form, Modal } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import {
  goToShowLegalEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import { setLegalEntitiesForm } from '../_common/legalEntities.actions'
import CreateOrSelectEntityFlow from
  '../../entities/form/CreateOrSelectEntityFlow'

const LegalEntityCodeForm = ({ form: { getFieldDecorator }, redirectAction, returnTo, form }) => (
	<CreateOrSelectEntityFlow  
		returnTo={returnTo}
		entityType='legal'
		form={form}
		getFieldDecorator={getFieldDecorator}
		redirectAction={redirectAction} />
)

const confirm = Modal.confirm

const mapActions = (dispatch, { redirectTo }) => ({
  redirectAction: (entity, handleError) => {
		if(!!entity.code && !!entity.id) {
			confirm({
				title: 'CNPJ já cadastrado no sistema!',
				content: 'Deseja ver o empresa cadastrada com esse CNPJ?',
				okText: 'Sim',
				cancelText: 'Não',
				onOk() {
					goToShowLegalEntity(dispatch, entity)
				},
			})
			return
		}
		if(!!entity.name && !!entity.id) {
			goToShowLegalEntity(dispatch, entity)
			return
		}
		dispatch(setLegalEntitiesForm(entity))
		dispatch(push(redirectTo))
  }
})

const enhace = compose(
  connect(null, mapActions),
  Form.create()
)

export default enhace(LegalEntityCodeForm)
