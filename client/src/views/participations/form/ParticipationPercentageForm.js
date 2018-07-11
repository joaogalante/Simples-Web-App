import {Form} from 'antd'
import {compose} from 'redux'
import {connect} from 'react-redux'
import React from 'react'

import {PARTICIPATION_OWNERSHIP_TYPES, PARTICIPATION_OWNERSHIP_TYPES_CHECKBOX_OPTIONS} from '../../../config/vars'
import {formSubmitHandler, generateMapPropsToFields} from '../../../helpers/formHelpers'
import {mergeParticipationsForm} from '../_common/participations.actions'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import Content from '../../../components/structure/Content'
import InputNumber from '../../../components/form/InputNumber'
import RadioGroup from '../../../components/form/RadioGroup'
import Separator from '../../../components/helpers/Separator'

const ParticipationPercentageForm = ({
  form: {getFieldDecorator},
  participation,
  redirectAction,
  returnAction,
  form,
  submit,
}) => {
  const oType = form.getFieldValue('ownershipType')
  const isPercentage = oType === PARTICIPATION_OWNERSHIP_TYPES.PERCENTAGE

  return (
    <Form onSubmit={formSubmitHandler(submit.bind(null, participation, redirectAction), form)}>
      <Separator />
      <Content flex={1} basicPadding centerChild>
        <div>
          <InputNumber
            getFieldDecorator={getFieldDecorator}
            placeholder={isPercentage ? '00%' : 'Qtd. de quotas'}
            label="Preencha a participação"
            fieldName="Participação"
            field={isPercentage ? 'percentage' : 'quotas'}
            noMargin
            min={0}
            max={isPercentage ? 100 : undefined}
            formatter={value => (isPercentage ? value.toString().replace('.', ',') + '%' : value)}
            parser={value => (isPercentage ? value.replace('%', '').replace(',', '.') : value)}
            textCenter
            smallWidth
            required
          />

          <RadioGroup
            getFieldDecorator={getFieldDecorator}
            field="ownershipType"
            options={PARTICIPATION_OWNERSHIP_TYPES_CHECKBOX_OPTIONS}
          />
        </div>
      </Content>

      <Separator />

      <ButtonsGroup>
        <Button lightGrey fullWidth onClick={returnAction}>
          Cancelar
        </Button>
        <Button submit fullWidth>
          Avançar
        </Button>
      </ButtonsGroup>
    </Form>
  )
}

const mapState = (state, c) => ({
  participation: state.participations.form,
})

const mapActions = dispatch => ({
  submit: (oldParticipation, redirectAction, participation, handleError) => {
    const newParticipation = {...oldParticipation, ...participation}
    dispatch(mergeParticipationsForm(participation))
    redirectAction(newParticipation)
  },
})

const mapPropsToFields = ({participation}) => generateMapPropsToFields(participation)

const enhace = compose(connect(mapState, mapActions), Form.create({mapPropsToFields}))

export default enhace(ParticipationPercentageForm)
