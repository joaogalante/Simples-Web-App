import {connect} from 'react-redux'
import React from 'react'

import {EDIT_INDIVIDUAL_ENTITY_INFO_MODAL_KEY} from '../../../logicContainers/modal/modal.keys'
import {closeModal} from '../../../logicContainers/modal/modal.actions'
import IndividualEntityInfoForm from '../../individualEntities/form/IndividualEntityInfoForm'
import Modal from '../../../components/structure/Modal'

const MODAL_KEY = EDIT_INDIVIDUAL_ENTITY_INFO_MODAL_KEY

const EditIndividualEntityInfoModal = ({individualEntity, submitModal, closeModal, open}) => (
  <Modal title={`Editando ${individualEntity.name}`} visible={open} onCancel={closeModal} noControls width={800}>
    <IndividualEntityInfoForm returnAction={closeModal} redirectAction={submitModal} />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY],
  individualEntity: state.individualEntities.form,
})

const mapActions = (dispatch, {submit}) => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY)),
  submitModal: entity => {
    submit(entity)
    dispatch(closeModal(MODAL_KEY))
  },
})

export default connect(mapState, mapActions)(EditIndividualEntityInfoModal)
