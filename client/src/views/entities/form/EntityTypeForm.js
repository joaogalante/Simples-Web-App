import { Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { ENTITY_TYPES_RADIO_OPTIONS } from '../../../config/vars'
import { formSubmitHandler } from '../../../helpers/formHelpers'
import { mergeEntitiesForm } from '../_common/entities.actions'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import Content from '../../../components/structure/Content'
import RadioGroup from '../../../components/form/RadioGroup'
import Separator from '../../../components/helpers/Separator'

const EntityTypeForm = ({ form: { getFieldDecorator }, entity, returnAction, form, submit }) => (
  <Form onSubmit={formSubmitHandler(submit.bind(null, entity), form)}>
    <Separator />
    <Content flex={1} basicPadding centerChild >
      <RadioGroup
        getFieldDecorator={getFieldDecorator} 
        label="Qual o tipo de entidade que deseja cadastrar?"
        fieldName="Tipo de Entidade"
        field="entityType" 
        options={ENTITY_TYPES_RADIO_OPTIONS}
        noMargin
        textCenter
        smallWidth
        required />
    </Content>

    <Separator />

    <ButtonsGroup>
      <Button lightGrey fullWidth onClick={returnAction}>Cancelar</Button>
      <Button submit fullWidth>Avançar</Button>
    </ButtonsGroup>
  </Form>
)

const mapState = state => ({
	entity: state.entities.form
})

const mapActions = (dispatch, { redirectAction }) => ({
	submit: (oldEntity, entity, errorHandler) => {
		const newEntity = { ...oldEntity, ...entity }
		dispatch(mergeEntitiesForm(entity))
    redirectAction(newEntity)
	}
})

const enhace = compose(
  connect(mapState, mapActions), 
  Form.create()
)

export default enhace(EntityTypeForm)
