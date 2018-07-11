import { Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import {
  formSubmitHandler,
  generateMapPropsToFields,
} from '../../../helpers/formHelpers'
import { mergeParticipationsForm } from '../_common/participations.actions'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import Content from '../../../components/structure/Content'
import SelectJobTitles from '../../jobTitles/form/SelectJobTitles'
import Separator from '../../../components/helpers/Separator'
import SmallText from '../../../components/presentation/SmallText'

const ParticipationJobTitleForm = ({ form: { getFieldDecorator }, participation, redirectAction, returnAction, form, submit }) => (
  <Form onSubmit={formSubmitHandler(submit.bind(null, participation, redirectAction), form)}>
    <Separator />

    <Content flex={1} basicPadding centerChild >
      <SelectJobTitles
        getFieldDecorator={getFieldDecorator} 
        placeholder="Diretor"
        label="Preencha o(s) cargo(s) do administrador"
        fieldName="Cargo"
        field="jobTitles" 
				value={form.getFieldValue("jobTitles")}
        noMargin
        textCenter
        smallWidth
        required />
			<SmallText textCenter smallWidth>Digite o nome do cargo e aperte enter para adionar mais de 1.</SmallText>
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

export default enhace(ParticipationJobTitleForm)
