import { connect } from 'react-redux'
import React from 'react'

import {
  ENTITIES_WITH_NAME_MODAL_KEY,
  ENTITY_TYPE_FORM_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import {
  GLOBAL_FORM_SUBMIT_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import {
  closeAllModals,
  openModal
} from '../../../logicContainers/modal/modal.actions'
import {
  getEntitiesWithNameAndTypeApi,
} from '../../../api/getEntitiesWithNameAndTypeApi'
import {
  getEntityWithCodeFallbackToGovApi,
} from '../../../api/getEntityWithCodeFallbackToGovApi'
import {
  mergeEntitiesForm,
  setEntitiesList
} from '../_common/entities.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import {
  validateCNPJ,
  validateCPF,
  validateCPFOrCNPJ
} from '../../../helpers/entityCodeHelpers'
import EntitiesWithNameModal from '../modal/EntitiesWithNameModal'
import EntityTypeFormModal from '../modal/EntityTypeFormModal'
import LoadingSpinnerWrapper from
  '../../../logicContainers/loading/LoadingSpinnerWrapper'
import NewEntityFormStructure from './NewEntityFormStructure'

const CreateOrSelectEntityFlow = (props) => (
  <LoadingSpinnerWrapper loading={props.loading}>
		<NewEntityFormStructure {...props} />
		<EntitiesWithNameModal onSelect={props.selectEntity} createNew={() => props.goToNewEntityWithName(props.entity)} />
		<EntityTypeFormModal submit={props.submitEntityType} />
	</LoadingSpinnerWrapper>
)

const LOADING_KEY = GLOBAL_FORM_SUBMIT_LOADING_KEY
const NAME_MODAL_KEY = ENTITIES_WITH_NAME_MODAL_KEY  
const TYPE_MODAL_KEY = ENTITY_TYPE_FORM_MODAL_KEY  

const mapState = state => ({
	loading: state.loading[LOADING_KEY],
	entity: state.entities.form
})

const redirectOrOpenTypeModal = (redirectAction, entityType, entity, handleError, dispatch) => {
	dispatch(closeAllModals())
	if(entityType === 'both') {
		dispatch(openModal(TYPE_MODAL_KEY))
	} else {
		redirectAction(entity, handleError)
	}
}

const mapActions = (dispatch, { redirectAction, entityType }) => ({
	submitName: (entity, handleError) => {
		dispatch(startLoading(LOADING_KEY))

		getEntitiesWithNameAndTypeApi(entity.name, entityType).then(response => {
      dispatch(stopLoading(LOADING_KEY))
			if(response.length === 0) {
				redirectOrOpenTypeModal(redirectAction, entityType, entity, handleError, dispatch)
				return
			}
			dispatch(setEntitiesList(response))
			dispatch(openModal(NAME_MODAL_KEY))
		}).catch(() => dispatch(stopLoading(LOADING_KEY)))
	},

	selectEntity: (entity, handleError) => {
		redirectAction(entity, handleError)
	},

	goToNewEntityWithName: (entity) => {
		redirectOrOpenTypeModal(redirectAction, entityType, entity, null, dispatch)
	},

	submitEntityType: (entity, handleError) => {
		console.log('submitting type', entity)
		redirectAction(entity, handleError)
	},

  submitCode: (entity, handleError) => {
		let err
		if(entityType === 'legal') {
			err = validateCNPJ(entity.code)
		} else if(entityType === 'legal') {
			err = validateCPF(entity.code)
		} else {
			err = validateCPFOrCNPJ(entity.code)
		}
    if(err) return handleError(err)

    dispatch(startLoading(LOADING_KEY))
    getEntityWithCodeFallbackToGovApi(entity.code).then(response => {
      dispatch(stopLoading(LOADING_KEY))
			dispatch(redirectAction({...response, code: entity.code}, handleError))
    }).catch(() => dispatch(stopLoading(LOADING_KEY)))
	}
})

const connectState = connect(mapState, mapActions)

export default connectState(CreateOrSelectEntityFlow)
