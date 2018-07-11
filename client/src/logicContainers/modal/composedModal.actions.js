import {
  CONTROLS_FOR_LEGAL_ENTITY_MODAL_KEY,
  EDIT_INDIVIDUAL_ENTITY_INFO_MODAL_KEY,
  EDIT_LEGAL_ENTITY_INFO_MODAL_KEY,
  EDIT_PARTICIPATION_JOB_TITLE_MODAL_KEY,
  EDIT_PARTICIPATION_PERCENTAGE_MODAL_KEY,
  EDIT_PARTICIPATION_TYPE_MODAL_KEY,
  NEW_CONTROL_LEGAL_ENTITY_CODE_MODAL_KEY,
  NEW_INDIVIDUAL_ENTITY_INFO_MODAL_KEY,
  NEW_LEGAL_ENTITY_INFO_MODAL_KEY,
  NEW_PARTICIPATION_ASSOCIATED_ENTITY_CODE_MODAL_KEY,
} from './modal.keys'
import { ENTITY_TYPES, SHAREHOLDER_TYPES } from '../../config/vars'
import { closeAllModals, openModal } from './modal.actions'
import { setControlsForm } from '../../views/controls/_common/controls.actions'
import {
  setIndividualEntitiesForm,
} from '../../views/individualEntities/_common/individualEntities.actions'
import {
  setLegalEntitiesForm,
  setLegalEntitiesSingle,
} from '../../views/legalEntities/_common/legalEntities.actions'
import {
  setParticipationsForm,
} from '../../views/participations/_common/participations.actions'

export const openNewParticipationAndClearState = (dispatch, legalEntity) => {
  dispatch(setParticipationsForm({ legalEntity }))
  dispatch(openModal(NEW_PARTICIPATION_ASSOCIATED_ENTITY_CODE_MODAL_KEY))
}

export const setStateCloseAllModalsAndOpenIndividualInfoModal = (dispatch, individualEntity) => {
  dispatch(setIndividualEntitiesForm(individualEntity))
  dispatch(closeAllModals())
  dispatch(openModal(NEW_INDIVIDUAL_ENTITY_INFO_MODAL_KEY))
}

export const setIndividualEntityAndOpenEditModal = (dispatch, individualEntity) => {
  dispatch(setIndividualEntitiesForm(individualEntity))
  dispatch(openModal(EDIT_INDIVIDUAL_ENTITY_INFO_MODAL_KEY))
}

export const setStateCloseAllModalsAndOpenLegalInfoModal = (dispatch, legalEntity) => {
  dispatch(setLegalEntitiesForm(legalEntity))
  dispatch(closeAllModals())
  dispatch(openModal(NEW_LEGAL_ENTITY_INFO_MODAL_KEY))
}

export const setLegalEntityAndOpenEditModal = (dispatch, legalEntity) => {
  dispatch(setLegalEntitiesForm(legalEntity))
  dispatch(openModal(EDIT_LEGAL_ENTITY_INFO_MODAL_KEY))
}

export const setParticipationAndOpenEditModal = (dispatch, participation) => {
  dispatch(setParticipationsForm(participation))
  if(participation.shareholderType !== SHAREHOLDER_TYPES.ENTITY
			|| participation.associatedEntity.entityType === ENTITY_TYPES.LEGAL) {
    dispatch(openModal(EDIT_PARTICIPATION_PERCENTAGE_MODAL_KEY))
  } else {
    dispatch(openModal(EDIT_PARTICIPATION_TYPE_MODAL_KEY))
  }
}

export const closeAllModalsAndOpenPercentageModal = (dispatch) => {
  dispatch(closeAllModals())
  dispatch(openModal(EDIT_PARTICIPATION_PERCENTAGE_MODAL_KEY))
}

export const closeAllModalsAndOpenParticipationTypeModal = (dispatch) => {
  dispatch(closeAllModals())
  dispatch(openModal(EDIT_PARTICIPATION_TYPE_MODAL_KEY))
}

export const closeAllModalsAndOpenParticipationJobTitleModal = (dispatch) => {
  dispatch(closeAllModals())
  dispatch(openModal(EDIT_PARTICIPATION_JOB_TITLE_MODAL_KEY))
}


export const openNewControlAndClearState = (dispatch) => {
  dispatch(setControlsForm({}))
  dispatch(openModal(NEW_CONTROL_LEGAL_ENTITY_CODE_MODAL_KEY))
}

export const closeAllModalsSetStateAndOpenControlsForLegalEntityModal = (dispatch, legalEntity) => {
  dispatch(closeAllModals())
  dispatch(setLegalEntitiesSingle(legalEntity))
  dispatch(openModal(CONTROLS_FOR_LEGAL_ENTITY_MODAL_KEY))
}
