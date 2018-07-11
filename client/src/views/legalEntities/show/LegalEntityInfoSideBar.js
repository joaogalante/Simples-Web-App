import {connect} from 'react-redux'
import React from 'react'

import {closeAllModalsSetStateAndOpenControlsForLegalEntityModal} from '../../../logicContainers/modal/composedModal.actions'
import {
  goToEditLegalEntity,
  goToEditLegalEntityParticipations,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import ControlsForLegalEntityModal from '../../controls/modal/ControlsForLegalEntityModal'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import SideBar, {SideBarItem, SideBarLinksSection, SideBarSection} from '../../../components/structure/SideBar'

const LegalEntityInfoSideBar = ({entity, goToEdit, goToEditParticipations, goToControl}) => (
  <SideBar borderLeft>
    <FlexGridItem flex={1}>
      <SideBarSection />
    </FlexGridItem>

    <FlexGridItem>
      <SideBarLinksSection borderTop>
        <SideBarItem label="Gerar Controle" onClick={() => goToControl(entity)} icon="download-document" />
        <SideBarItem label="Editar Composição" onClick={() => goToEditParticipations(entity)} icon="add-person" />
        <SideBarItem label="Editar Empresa" onClick={() => goToEdit(entity)} icon="pencil" />
      </SideBarLinksSection>
    </FlexGridItem>

    <ControlsForLegalEntityModal />
  </SideBar>
)

const mapState = state => ({
  entity: state.legalEntities.single,
})

const mapActions = dispatch => ({
  goToEdit: entity => goToEditLegalEntity(dispatch, entity),
  goToControl: entity => closeAllModalsSetStateAndOpenControlsForLegalEntityModal(dispatch, entity),
  goToEditParticipations: entity => goToEditLegalEntityParticipations(dispatch, entity),
})

export default connect(mapState, mapActions)(LegalEntityInfoSideBar)
