import { Divider, Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import {
  SHAREHOLDER_TYPES,
  SHAREHOLDER_TYPES_LABELS
} from '../../../config/vars'
import { generateMapPropsToFields } from '../../../helpers/formHelpers'
import { mergeParticipationsForm } from '../_common/participations.actions'
import Content from '../../../components/structure/Content'
import CreateOrSelectEntityFlow from
  '../../entities/form/CreateOrSelectEntityFlow'
import FlexGrid from '../../../components/structure/FlexGrid'
import Link from '../../../components/actions/Link'

const { ENTITY, UNIDENTIFIED, CIRCULATION, OPEN, TREASURY } = SHAREHOLDER_TYPES 

const ParticipationAssociatedEntityCodeForm = ({ form: { getFieldDecorator }, loading, returnAction, form, submit, submitSpecialShareholderType }) => (
  <CreateOrSelectEntityFlow  
		returnAction={returnAction}
		entityType='both'
		form={form}
		getFieldDecorator={getFieldDecorator}
		redirectAction={submit}
	>
		<Content flex={1} centerChild >
			<FlexGrid>
				<Link small onClick={() => submitSpecialShareholderType(CIRCULATION)}>{SHAREHOLDER_TYPES_LABELS[CIRCULATION]}</Link>
				<Divider type="vertical" />
				<Link small onClick={() => submitSpecialShareholderType(UNIDENTIFIED)}>{SHAREHOLDER_TYPES_LABELS[UNIDENTIFIED]}</Link>
			</FlexGrid>
		</Content>
	</CreateOrSelectEntityFlow>
)

const mapState = state => ({
  participation: state.participations.form,
})

const mapActions = (dispatch, { redirectAction, redirectActionWithSpecialShareholderType }) => ({
	// TODO: Remove submit and handle all on redirectAction function
  submit: (entity, handleError) => {
		dispatch(mergeParticipationsForm({ associatedEntity: entity }))
		if(!entity.id) {
			redirectAction({ ...entity }, true, entity.fromGovApi)
		} else {
			redirectAction(entity)
		}
  },
})

const mapPropsToFields = ({ participation }) => (
  generateMapPropsToFields(participation)
)

const enhace = compose(
  connect(mapState, mapActions), 
  Form.create({ mapPropsToFields })
)

export default enhace(ParticipationAssociatedEntityCodeForm)
