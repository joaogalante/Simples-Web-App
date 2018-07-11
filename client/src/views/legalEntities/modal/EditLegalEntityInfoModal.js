import {connect} from 'react-redux'
import React from 'react'

import {EDIT_LEGAL_ENTITY_INFO_MODAL_KEY} from '../../../logicContainers/modal/modal.keys'
import {closeModal} from '../../../logicContainers/modal/modal.actions'
import LegalEntityInfoForm from '../form/LegalEntityInfoForm'
import Modal from '../../../components/structure/Modal'

const MODAL_KEY = EDIT_LEGAL_ENTITY_INFO_MODAL_KEY

const EditLegalEntityInfoModal = ({legalEntity, submitModal, closeModal, open}) => (
  <Modal title={`Editando ${legalEntity.name}`} visible={open} onCancel={closeModal} noControls width={800}>
    <LegalEntityInfoForm returnAction={closeModal} redirectAction={submitModal} />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY],
  legalEntity: state.legalEntities.form,
})

const mapActions = (dispatch, {submit}) => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY)),
  submitModal: entity => {
    submit(entity)
    dispatch(closeModal(MODAL_KEY))
  },
})

export default connect(mapState, mapActions)(EditLegalEntityInfoModal)
