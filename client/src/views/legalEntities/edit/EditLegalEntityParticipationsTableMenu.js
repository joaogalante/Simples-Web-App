import {Menu, Modal} from 'antd'
import {connect} from 'react-redux'
import React from 'react'

import {ENTITY_TYPES} from '../../../config/vars'
import {SortButton} from '../../../components/actions/DragButton'
import {
  adjustParticipationListSortAfterRemove,
  removeParticipationsDrilldownList,
} from '../../participations/_common/participations.actions'
import {deleteParticipationApi} from '../../../api/deleteParticipationApi'
import {
  openNewParticipationAndClearState,
  setIndividualEntityAndOpenEditModal,
  setLegalEntityAndOpenEditModal,
  setParticipationAndOpenEditModal,
} from '../../../logicContainers/modal/composedModal.actions'
import IconButton, {IconButtonDropdown} from '../../../components/actions/IconButton'
import Link from '../../../components/actions/Link'

const EditLegalEntityParticipationsTableMenu = ({item, add, editParticipation, editEntity, remove}) => (
  <div className="flex">
    <IconButton
      icon="add-person"
      tooltip={`Add Associado para ${item.name}`}
      onClick={() => add(item)}
      hidden={item.associatedEntity.entityType !== 'legal'}
    />
    <IconButtonDropdown
      yellow
      icon="pencil"
      menu={
        <Menu>
          <Menu.Item>
            <Link small onClick={() => editParticipation(item)}>
              Editar associação
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link small onClick={() => editEntity(item.associatedEntity)}>
              Editar entidade
            </Link>
          </Menu.Item>
        </Menu>
      }
    />

    <IconButton red icon="trash" tooltip={`Remover Associado ${item.name}`} onClick={() => remove(item)} />
    <SortButton />
  </div>
)

const confirm = Modal.confirm

const mapActions = dispatch => ({
  add: participation => openNewParticipationAndClearState(dispatch, participation.associatedEntity),
  editParticipation: participation => setParticipationAndOpenEditModal(dispatch, participation),
  editEntity: entity => {
    if (entity.entityType === ENTITY_TYPES.LEGAL) {
      setLegalEntityAndOpenEditModal(dispatch, entity)
    } else {
      setIndividualEntityAndOpenEditModal(dispatch, entity)
    }
  },
  remove: participation => {
    confirm({
      title: 'Têm certeza que deseja deletar?',
      content: 'A pessoa física/júridica não sera removida do banco de dados, somente a associação entre elas',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(removeParticipationsDrilldownList(participation.id))
        dispatch(adjustParticipationListSortAfterRemove(participation))
        deleteParticipationApi(participation.id)
      },
    })
  },
})

export default connect(null, mapActions)(EditLegalEntityParticipationsTableMenu)
