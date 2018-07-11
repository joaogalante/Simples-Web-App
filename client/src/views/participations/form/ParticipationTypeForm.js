import { Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { PARTICIPATION_TYPES_CHECKBOX_OPTIONS } from '../../../config/vars'
import {
  formSubmitHandler,
  generateMapPropsToFields,
} from '../../../helpers/formHelpers'
import { mergeParticipationsForm } from '../_common/participations.actions'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import CheckboxGroup from '../../../components/form/CheckboxGroup'
import Content from '../../../components/structure/Content'
import Separator from '../../../components/helpers/Separator'

const ParticipationTypeForm = ({ form: { getFieldDecorator }, participation, redirectAction, returnAction, form, submit }) => (
  <Form onSubmit={formSubmitHandler(submit.bind(null, participation, redirectAction), form)}>
    <Separator />
    <Content flex={1} basicPadding centerChild >
      <CheckboxGroup
        getFieldDecorator={getFieldDecorator} 
        label="Qual o tipo de participação na empresa?"
        fieldName="Tipo de Participação"
        field="participationTypeArray" 
        options={PARTICIPATION_TYPES_CHECKBOX_OPTIONS}
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
  participation: state.participations.form,
})

const mapActions = dispatch => ({
  submit: (oldParticipation, redirectAction, participation, handleError) => {
    const newParticipation = { ...oldParticipation, ...participation }
    dispatch(mergeParticipationsForm(participation))
    redirectAction(newParticipation)
  }
})

const mapPropsToFields = ({ participation }) => (
  generateMapPropsToFields(participation)
)

const enhace = compose(
  connect(mapState, mapActions), 
  Form.create({ mapPropsToFields })
)

export default enhace(ParticipationTypeForm)
