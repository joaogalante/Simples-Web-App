import {connect} from 'react-redux'
import React from 'react'

import {EDIT_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {
  goToEditLegalEntity,
  goToEditLegalEntityParticipations,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import EntityExpirationLabelValue from '../../entities/_common/EntityExpirationLabelValue'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import SideBar, {SideBarItem, SideBarLinksSection, SideBarSection} from '../../../components/structure/SideBar'

const ValidateLegalEntityInfoSideBar = ({entity, goToEdit, goToEditParticipations}) => (
  <SideBar borderLeft>
    <FlexGridItem flex={1}>
      <SideBarSection>
        <EntityExpirationLabelValue entity={entity} readOnly />
      </SideBarSection>
    </FlexGridItem>

    <FlexGridItem>
      <SideBarLinksSection borderTop>
        <SideBarItem label="Editar Composição" onClick={() => goToEditParticipations(entity)} icon="add-person" />
        <SideBarItem label="Editar Empresa" onClick={() => goToEdit(entity)} icon="pencil" />
      </SideBarLinksSection>
    </FlexGridItem>
  </SideBar>
)

const mapState = state => ({
  entity: state.legalEntities.single,
})

const mapActions = dispatch => ({
  goToEdit: entity => goToEditLegalEntity(dispatch, entity, EDIT_ENTITY_REDIRECT_KEY),
  goToEditParticipations: entity => goToEditLegalEntityParticipations(dispatch, entity, EDIT_ENTITY_REDIRECT_KEY),
})

export default connect(mapState, mapActions)(ValidateLegalEntityInfoSideBar)
