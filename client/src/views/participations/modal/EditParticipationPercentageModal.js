import { connect } from 'react-redux'
import React from 'react'

import {
  EDIT_PARTICIPATION_PERCENTAGE_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import {
  getParticipationTitle,
} from '../../../helpers/participationNamesHelpers'
import Modal from '../../../components/structure/Modal'
import ParticipationPercentageForm from '../form/ParticipationPercentageForm'

const MODAL_KEY = EDIT_PARTICIPATION_PERCENTAGE_MODAL_KEY 

const EditParticipationPercentageModal = ({ participation, submit, closeModal, open }) => (
  <Modal title={getParticipationTitle(participation)} visible={open} onCancel={closeModal} noControls>
    <ParticipationPercentageForm returnAction={closeModal} redirectAction={submit} />
  </Modal>
)

const mapState = state => ({
  participation: state.participations.form,
  open: state.modal[MODAL_KEY]
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

export default connect(mapState, mapActions)(EditParticipationPercentageModal )
