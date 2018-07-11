import {connect} from 'react-redux'
import React from 'react'

import R from 'ramda'

import {ENTITY_TYPES, PARTICIPATION_TYPES} from '../../../config/vars'
import {cleanPercentageAndQuotasForParticipation} from '../../../helpers/participationOwnershipHelpers'
import {closeAllModals} from '../../../logicContainers/modal/modal.actions'
import {
  closeAllModalsAndOpenParticipationJobTitleModal,
  closeAllModalsAndOpenParticipationTypeModal,
  closeAllModalsAndOpenPercentageModal,
  setParticipationAndOpenEditModal,
  setStateCloseAllModalsAndOpenIndividualInfoModal,
  setStateCloseAllModalsAndOpenLegalInfoModal,
} from '../../../logicContainers/modal/composedModal.actions'
import {getParticipationsCompositionForLegalEntityApi} from '../../../api/getParticipationsApi'
import {isCPFNumber} from '../../../helpers/entityCodeHelpers'
import {
  mergeParticipationsForm,
  mergeParticipationsDrilldownList,
  mergeParticipationsDrilldownListItem,
} from '../_common/participations.actions'
import {saveParticipationApi} from '../../../api/saveParticipationApi'
import EditParticipationJobTitleModal from './EditParticipationJobTitleModal'
import EditParticipationPercentageModal from './EditParticipationPercentageModal'
import EditParticipationTypeModal from './EditParticipationTypeModal'
import NewIndividualEntityInfoModal from '../../individualEntities/modal/NewIndividualEntityInfoModal'
import NewLegalEntityInfoModal from '../../legalEntities/modal/NewLegalEntityInfoModal'
import NewParticipationAssociatedEntityCodeModal from './NewParticipationAssociatedEntityCodeModal'

const ParticipationModalFlow = ({
  participations,
  participation,
  onSubmitAssociatedEntityCodeForm,
  onSubmitPercentageForm,
  onSubmitParticipationTypeForm,
  onSubmitJobTitleForm,
  onSubmitIndividualEntityInfoForm,
  onSubmitLegalEntityInfoForm,
  onSubmitSpecialShareholderType,
}) => (
  <div>
    <NewParticipationAssociatedEntityCodeModal
      submitSpecialShareholderType={onSubmitSpecialShareholderType}
      submit={onSubmitAssociatedEntityCodeForm.bind(null, participations, participation)}
    />
    <NewIndividualEntityInfoModal submit={onSubmitIndividualEntityInfoForm} />
    <NewLegalEntityInfoModal submit={onSubmitLegalEntityInfoForm} />
    <EditParticipationTypeModal submit={onSubmitParticipationTypeForm} />
    <EditParticipationPercentageModal submit={onSubmitPercentageForm} />
    <EditParticipationJobTitleModal submit={onSubmitJobTitleForm} />
  </div>
)

const mapState = state => ({
  participations: state.participations.rawList,
  participation: state.participations.form,
})

const mapActions = dispatch => ({
  onSubmitAssociatedEntityCodeForm: (participations, participationOnForm, associatedEntity, notInTheDB, fromGovApi) => {
    console.log('f', associatedEntity)
    if (notInTheDB) {
      const isIndividual = !!associatedEntity.code
        ? isCPFNumber(associatedEntity.code)
        : associatedEntity.entityType === 'individual'
      isIndividual
        ? setStateCloseAllModalsAndOpenIndividualInfoModal(dispatch, associatedEntity)
        : setStateCloseAllModalsAndOpenLegalInfoModal(dispatch, associatedEntity)
      return
    }
    // TODO: Refactor logic
    const existingParticipation = participations.find(
      item =>
        item.associatedEntityID === associatedEntity.id && item.legalEntityID == participationOnForm.legalEntity.id,
    )
    if (existingParticipation) {
      setParticipationAndOpenEditModal(dispatch, existingParticipation)
    }
    if (associatedEntity.entityType === ENTITY_TYPES.LEGAL) {
      closeAllModalsAndOpenPercentageModal(dispatch)
      return
    }
    closeAllModalsAndOpenParticipationTypeModal(dispatch)
  },

  onSubmitSpecialShareholderType: shareholderType => {
    dispatch(mergeParticipationsForm({shareholderType, participationType: PARTICIPATION_TYPES.SHAREHOLDER}))
    closeAllModalsAndOpenPercentageModal(dispatch)
  },

  onSubmitIndividualEntityInfoForm: associatedEntity => {
    dispatch(mergeParticipationsForm({associatedEntity}))
    closeAllModalsAndOpenParticipationTypeModal(dispatch)
  },

  onSubmitLegalEntityInfoForm: associatedEntity => {
    dispatch(mergeParticipationsForm({associatedEntity}))
    closeAllModalsAndOpenPercentageModal(dispatch)
  },

  onSubmitParticipationTypeForm: participation => {
    if (R.equals(participation.participationTypeArray, [PARTICIPATION_TYPES.ADMINISTRATOR])) {
      closeAllModalsAndOpenParticipationJobTitleModal(dispatch)
      return
    }
    closeAllModalsAndOpenPercentageModal(dispatch)
  },

  onSubmitPercentageForm: participation => {
    if (participation.participationTypeArray.includes(PARTICIPATION_TYPES.ADMINISTRATOR)) {
      closeAllModalsAndOpenParticipationJobTitleModal(dispatch)
      return
    }
    saveParticipationAndUpdateState(dispatch, participation)
  },

  onSubmitJobTitleForm: saveParticipationAndUpdateState(dispatch),
})

const saveParticipationAndUpdateState = R.curry((dispatch, participation) => {
  saveParticipationApi(participation).then(response => {
    console.log(321, response)
    if (participation.id) {
      dispatch(
        mergeParticipationsDrilldownListItem(participation.id, cleanPercentageAndQuotasForParticipation(participation)),
      )
    } else {
      getParticipationsCompositionForLegalEntityApi(response.legalEntityID).then(list =>
        dispatch(mergeParticipationsDrilldownList(list)),
      )
    }
    dispatch(closeAllModals())
  })
})

export default connect(mapState, mapActions)(ParticipationModalFlow)
