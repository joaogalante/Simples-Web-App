import { connect } from 'react-redux'
import React from 'react'

import {
  NEW_CONTROL_LEGAL_ENTITY_CODE_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import ControlLegalEntityCodeForm from '../form/ControlLegalEntityCodeForm'
import Modal from '../../../components/structure/Modal'

const MODAL_KEY = NEW_CONTROL_LEGAL_ENTITY_CODE_MODAL_KEY 

const NewControlLegalEntityCodeModal = ({ legalEntity, submit, closeModal, open }) => (
  <Modal title='Novo Controle' visible={open} onCancel={closeModal} noControls>
    <ControlLegalEntityCodeForm returnAction={closeModal} redirectAction={submit} />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY]
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

export default connect(mapState, mapActions)(NewControlLegalEntityCodeModal)
