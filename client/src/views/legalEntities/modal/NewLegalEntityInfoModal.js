import { connect } from 'react-redux'
import React from 'react'

import { branch, renderNothing } from 'recompose'

import {
  NEW_LEGAL_ENTITY_INFO_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import Alert from '../../../components/notifications/Alert'
import LegalEntityInfoForm from '../form/LegalEntityInfoForm'
import Modal from '../../../components/structure/Modal'

const MODAL_KEY = NEW_LEGAL_ENTITY_INFO_MODAL_KEY

const hideIfFromGovApi = branch(
  ({ entity }) => !entity.id && entity.fromGovApi,
  renderNothing
)

const NewEntityDataMessage = hideIfFromGovApi(() => (
  <Alert 
    message="O CNPJ não foi encontrado no banco de dados nem na API da receita federal, preencha o formulário abaixo para criar uma nova empresa"
    type="info" 
    showIcon />
))

const NewLegalEntityInforModal = ({ legalEntity, submit, closeModal, open }) => (
	<Modal title={`Nova Empresa`} visible={open} onCancel={closeModal} noControls width={800}>
    <NewEntityDataMessage entity={legalEntity} />
    <LegalEntityInfoForm returnAction={closeModal} redirectAction={submit} />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY],
  legalEntity: state.legalEntities.form
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

export default connect(mapState, mapActions)(NewLegalEntityInforModal  )
