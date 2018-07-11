import {connect} from 'react-redux'
import React from 'react'

import {openNewControlAndClearState} from '../../../logicContainers/modal/composedModal.actions'
import ComposedControlsTable from './ComposedControlsTable'
import ControlItemTableMenu from './ControlItemTableMenu'
import ControlModalFlow from '../modal/ControlModalFlow'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const ControlsPage = ({openNewControlModal}) => (
  <SideMenuTemplate activeMenuItem="controls">
    <PageHeader title="Últimos Controles" sideTitleAction={openNewControlModal} sideTitleIcon="plus" />
    <Panel noPadding flex={1}>
      <ComposedControlsTable ControlCell={ControlItemTableMenu} />
    </Panel>
    <ControlModalFlow />
  </SideMenuTemplate>
)

const mapActions = dispatch => ({
  openNewControlModal: () => openNewControlAndClearState(dispatch),
})

export default connect(null, mapActions)(ControlsPage)
