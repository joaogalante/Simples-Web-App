import { connect } from 'react-redux'
import React from 'react'

import {
  NEW_INDIVIDUAL_ENTITY_INFO_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import IndividualEntityInfoForm from
  '../../individualEntities/form/IndividualEntityInfoForm'
import Modal from '../../../components/structure/Modal'

const MODAL_KEY = NEW_INDIVIDUAL_ENTITY_INFO_MODAL_KEY

const NewIndividualEntityInforModal = ({ individualEntity, submit, closeModal, open }) => (
  <Modal title={`Nova Pessoa Física`} visible={open} onCancel={closeModal} noControls width={800}>
    <IndividualEntityInfoForm returnAction={closeModal} redirectAction={submit} />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY]
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

export default connect(mapState, mapActions)(NewIndividualEntityInforModal )
