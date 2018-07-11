import { Form, Select } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { withState } from 'recompose'

import { formSubmitHandler } from '../../../helpers/formHelpers'
import { setEntitiesForm } from '../_common/entities.actions'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import Content from '../../../components/structure/Content'
import Input from '../../../components/form/Input'
import Separator from '../../../components/helpers/Separator'

const Option = Select.Option

const INPUT_TYPES_LABELS = {
	legal: { name: 'Razão Social', code: 'CNPJ' },
	individual: { name: 'Nome', code: 'CPF' },
	both: { name: 'Nome', code: 'CNPJ/CPF' },
}

const INPUT_TYPES_PLACEHOLDERS = {
	legal: { name: 'ex. Pag Seguro', code: '71.293.179/0001-60' },
	individual: { name: 'ex. Marcelo Frias', code: '943.104.032-80' },
	both: { name: 'ex. Pag Seguro ou Marcelo Frias', code: '71.293.179/0001-60' },
}

const NewEntityFormStructure = ({ inputType, form, setInputType, loading, submit, entityType, returnAction, returnTo, getFieldDecorator, children }) => (
	<Form onSubmit={formSubmitHandler(submit.bind(null, inputType), form)}>

		<Separator />

		<Content flex={1} basicPadding centerChild >
			<Input
				addonBefore={(
					<Select defaultValue="code"  onChange={(v) => setInputType(() => v)} value={inputType}>
						<Option value="code">{INPUT_TYPES_LABELS[entityType]["code"]}</Option>
						<Option value="name">{INPUT_TYPES_LABELS[entityType]["name"]}</Option>
					</Select>
				)}
				getFieldDecorator={getFieldDecorator}
				placeholder={INPUT_TYPES_PLACEHOLDERS[entityType][inputType]}
				label={`Preencha ${INPUT_TYPES_LABELS[entityType][inputType]} da entidade`}
				fieldName={INPUT_TYPES_LABELS[entityType][inputType]}
				field={inputType}
				noMargin
				textCenter
				smallWidth
				focus
				required />
		</Content>

		{children}

		<Separator />

		<ButtonsGroup>
			<Button lightGrey fullWidth to={returnTo} onClick={returnAction}>Cancelar</Button>
			<Button submit fullWidth loading={loading}>Avançar</Button>
		</ButtonsGroup>
	</Form>
)

const mapActions = (dispatch, { submitName, submitCode }) => ({
	submit: (inputType, entity, errorHandler) => {
		dispatch(setEntitiesForm(entity))
		const submit = (inputType === 'name' ? submitName : submitCode)
		submit(entity, errorHandler)
	}
})

const connectState = connect(null, mapActions)
const enhance = compose(
	connectState, 
	withState('inputType', 'setInputType', 'code'),
  Form.create()
)

export default enhance(NewEntityFormStructure)
