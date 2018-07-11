import {Modal} from 'antd'
import {push} from 'react-router-redux'

import {ENTITY_TYPES} from '../../config/vars'
import {setControlsForm, setControlsSingle} from '../../views/controls/_common/controls.actions'
import {setCurrentRouteAsRedirect} from '../redirects/redirectHelpers'
import {
  setIndividualEntitiesForm,
  setIndividualEntitiesSingle,
} from '../../views/individualEntities/_common/individualEntities.actions'
import {setLegalEntitiesForm, setLegalEntitiesSingle} from '../../views/legalEntities/_common/legalEntities.actions'

const confirm = Modal.confirm

export const goToNewLegalEntityInfo = (dispatch, legalEntity) => {
  dispatch(setLegalEntitiesForm(legalEntity))
  dispatch(push('legal-entities/new-info'))
}

export const goToShowLegalEntity = (dispatch, entity) => {
  dispatch(setLegalEntitiesSingle(entity))
  dispatch(push(`/legal-entities/${entity.id}/show`))
}

export const goToValidateEntity = (dispatch, entity, redirectKey) => {
  setCurrentRouteAsRedirect(dispatch, redirectKey)

  if (entity.entityType === ENTITY_TYPES.LEGAL) {
    dispatch(setLegalEntitiesSingle(entity))
    dispatch(push(`/legal-entities/${entity.id}/validate`))
  } else {
    dispatch(setIndividualEntitiesSingle(entity))
    dispatch(push(`/individual-entities/${entity.id}/validate`))
  }
}

export const goToValidateLegalEntityComposition = (dispatch, entity) => {
  dispatch(setLegalEntitiesSingle(entity))
  dispatch(push(`/legal-entities/${entity.id}/validate-composition`))
}

export const goToEditLegalEntity = (dispatch, entity, redirectKey) => {
  setCurrentRouteAsRedirect(dispatch, redirectKey)
  dispatch(setLegalEntitiesForm(entity))
  dispatch(push(`/legal-entities/${entity.id}/edit`))
}

export const goToEditLegalEntityParticipations = (dispatch, entity, redirectKey) => {
  setCurrentRouteAsRedirect(dispatch, redirectKey)
  dispatch(setLegalEntitiesSingle(entity))
  dispatch(push(`/legal-entities/${entity.id}/edit-participations`))
}

export const goToNewControl = (dispatch, entity) => {
  dispatch(setControlsForm({legalEntityID: entity.id}))
  dispatch(setLegalEntitiesSingle(entity))
  dispatch(push(`/legal-entities/${entity.id}/new-control`))
}

export const goToShowControl = (dispatch, control) => {
  dispatch(setControlsSingle(control))
  dispatch(push(`/controls/${control.id}/show`))
}

export const goToEditControl = (dispatch, control) => {
  dispatch(setControlsForm(control))
  dispatch(push(`/controls/${control.id}/edit`))
}

export const goToShowIndividualEntity = (dispatch, entity) => {
  dispatch(setIndividualEntitiesSingle(entity))
  dispatch(push(`/individual-entities/${entity.id}/show`))
}

export const goToEditIndividualEntity = (dispatch, entity, redirectKey) => {
  setCurrentRouteAsRedirect(dispatch, redirectKey)
  dispatch(setIndividualEntitiesForm(entity))
  dispatch(push(`/individual-entities/${entity.id}/edit`))
}
