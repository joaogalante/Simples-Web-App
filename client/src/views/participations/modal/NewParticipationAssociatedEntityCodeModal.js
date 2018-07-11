import { connect } from 'react-redux'
import React from 'react'

import {
  NEW_PARTICIPATION_ASSOCIATED_ENTITY_CODE_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import Modal from '../../../components/structure/Modal'
import ParticipationAssociatedEntityCodeForm from
  '../form/ParticipationAssociatedEntityCodeForm'

const MODAL_KEY = NEW_PARTICIPATION_ASSOCIATED_ENTITY_CODE_MODAL_KEY 

const NewParticipationAssociatedEntityCodeModal = ({ legalEntity, submit, closeModal, open, submitSpecialShareholderType  }) => (
  <Modal title={`Nova Associação`} visible={open} onCancel={closeModal} noControls>
    <ParticipationAssociatedEntityCodeForm returnAction={closeModal} redirectAction={submit} submitSpecialShareholderType={submitSpecialShareholderType } />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY]
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

export default connect(mapState, mapActions)(NewParticipationAssociatedEntityCodeModal)
