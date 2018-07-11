import { connect } from 'react-redux'
import React from 'react'

import { closeAllModals } from '../../../logicContainers/modal/modal.actions'
import {
  closeAllModalsSetStateAndOpenControlsForLegalEntityModal,
  setStateCloseAllModalsAndOpenLegalInfoModal,
} from '../../../logicContainers/modal/composedModal.actions'
import NewLegalEntityInfoModal from
  '../../legalEntities/modal/NewLegalEntityInfoModal'
import NewControlLegalEntityCodeModal from './NewControlLegalEntityCodeModal'
import ControlsForLegalEntityModal from './ControlsForLegalEntityModal'

const ControlModalFlow = ({ onSubmitLegalEntityCodeForm, onSubmitLegalEntityInfoForm }) => (
  <div>
    <NewControlLegalEntityCodeModal submit={onSubmitLegalEntityCodeForm} />
    <NewLegalEntityInfoModal submit={onSubmitLegalEntityInfoForm} />
    <ControlsForLegalEntityModal />
  </div>
)

const mapActions = dispatch => ({
  onSubmitLegalEntityCodeForm: (legalEntity, notInTheDB, fromGovApi) => {
    if(notInTheDB) {
      setStateCloseAllModalsAndOpenLegalInfoModal(dispatch, legalEntity)
      return
    }
    closeAllModalsSetStateAndOpenControlsForLegalEntityModal(dispatch, legalEntity)
  },

  onSubmitLegalEntityInfoForm: (legalEntity) => {
    dispatch(closeAllModals())
    closeAllModalsSetStateAndOpenControlsForLegalEntityModal(dispatch, legalEntity)
  }
})

export default connect(null, mapActions)(ControlModalFlow)
