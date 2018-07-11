import {connect} from 'react-redux'
import React from 'react'

import {ENTITIES_WITH_NAME_MODAL_KEY} from '../../../logicContainers/modal/modal.keys'
import {closeModal} from '../../../logicContainers/modal/modal.actions'
import Alert from '../../../components/notifications/Alert'
import Icon from '../../../components/shapes/Icon'
import Modal from '../../../components/structure/Modal'
import SmallEntitiesTable from '../list/SmallEntitiesTable'
import TableRowButton from '../../../components/table/TableRowButton'

const MODAL_KEY = ENTITIES_WITH_NAME_MODAL_KEY

const AlertMessage = ({name}) => (
  <Alert
    message={`Essas empresas já estão cadastrados no sistema com nome similar a ${name}. Você pode usar uma delas ou cadastrar uma nova.`}
    type="info"
    showIcon
  />
)

const EntitiesWithNameModal = ({onSelect, createNew, entity, list, closeModal, open}) => (
  <Modal title={`Entidades encontradas - ${entity.name}`} visible={open} onCancel={closeModal} noControls width={800}>
    <AlertMessage name={entity.name} />
    <TableRowButton grey onClick={createNew}>
      <Icon name="plus-blue" />
      Criar nova entidade
    </TableRowButton>
    <SmallEntitiesTable list={list} onSelect={onSelect} />
  </Modal>
)

const mapState = state => ({
  open: state.modal[MODAL_KEY],
  list: state.entities.list,
  entity: state.entities.form,
})

const mapActions = dispatch => ({
  closeModal: () => dispatch(closeModal(MODAL_KEY)),
})

const connectState = connect(mapState, mapActions)

export default connectState(EntitiesWithNameModal)
