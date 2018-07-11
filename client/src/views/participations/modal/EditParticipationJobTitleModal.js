import { connect } from 'react-redux'
import React from 'react'

import {
  EDIT_PARTICIPATION_JOB_TITLE_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import Modal from '../../../components/structure/Modal'
import ParticipationJobTitleForm from '../form/ParticipationJobTitleForm'

const MODAL_KEY = EDIT_PARTICIPATION_JOB_TITLE_MODAL_KEY 

const EditParticipationJobTitleModal = ({ associatedEntity, submit, closeModal, open }) => (
  <Modal title={associatedEntity && associatedEntity.name} visible={open} onCancel={closeModal} noControls maskClosable={false}>
    <ParticipationJobTitleForm returnAction={closeModal} redirectAction={submit} />
  </Modal>
)

const mapState = state => ({
  associatedEntity: state.participations.form.associatedEntity,
  open: state.modal[MODAL_KEY]
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY)),
})

export default connect(mapState, mapActions)(EditParticipationJobTitleModal)
