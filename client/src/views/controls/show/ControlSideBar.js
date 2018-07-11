import {Modal} from 'antd'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import React from 'react'

import {deleteControlApi} from '../../../api/deleteControlApi'
import {
  goToEditControl,
  goToShowLegalEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import SideBar, {SideBarItem, SideBarLinksSection} from '../../../components/structure/SideBar'

const ControlInfoSideBar = ({control, goToEdit, goToShowLegalEntity, remove, refreshInstanceDate}) => (
  <SideBar borderLeft>
    <FlexGridItem flex={1} />

    <FlexGridItem>
      <SideBarLinksSection borderTop>
        <SideBarItem label="Editar Controle" onClick={() => goToEdit(control)} icon="pencil" />
        <SideBarItem label="Remover Controle" onClick={() => remove(control)} icon="trash" />
      </SideBarLinksSection>
    </FlexGridItem>
  </SideBar>
)

const mapState = state => ({
  control: state.controls.single,
})

const confirm = Modal.confirm

const mapActions = dispatch => ({
  goToEdit: control => goToEditControl(dispatch, control),
  remove: control => {
    confirm({
      title: 'Têm certeza que deseja deletar?',
      content: 'Esse controle será removido do banco de dados',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        deleteControlApi(control.id).then(() => {
          dispatch(push('/controls'))
        })
      },
    })
  },
})

export default connect(mapState, mapActions)(ControlInfoSideBar)
