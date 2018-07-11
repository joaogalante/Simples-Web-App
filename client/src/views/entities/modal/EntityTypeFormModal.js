import { connect } from 'react-redux'
import React from 'react'

import {
  ENTITY_TYPE_FORM_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import EntityTypeForm from '../form/EntityTypeForm'
import Modal from '../../../components/structure/Modal'

const MODAL_KEY = ENTITY_TYPE_FORM_MODAL_KEY 

const EntityTypeFormModal = ({ entity, submit, closeModal, open }) => (
  <Modal title={entity.name} visible={open} onCancel={closeModal} noControls>
    <EntityTypeForm returnAction={closeModal} redirectAction={submit} />
  </Modal>
)

const mapState = state => ({
  entity: state.entities.form,
  open: state.modal[MODAL_KEY]
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

export default connect(mapState, mapActions)(EntityTypeFormModal)
