import {connect} from 'react-redux'
import React from 'react'

import {EDIT_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {goToEditIndividualEntity} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import EntityExpirationLabelValue from '../../entities/_common/EntityExpirationLabelValue'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import SideBar, {SideBarItem, SideBarLinksSection, SideBarSection} from '../../../components/structure/SideBar'

const ValidateIndividualEntityInfoSideBar = ({entity, goToEdit}) => (
  <SideBar borderLeft>
    <FlexGridItem flex={1}>
      <SideBarSection>
        <EntityExpirationLabelValue entity={entity} readOnly />
      </SideBarSection>
    </FlexGridItem>

    <FlexGridItem>
      <SideBarLinksSection borderTop>
        <SideBarItem label="Editar individuo" onClick={() => goToEdit(entity)} icon="pencil" />
      </SideBarLinksSection>
    </FlexGridItem>
  </SideBar>
)

const mapState = state => ({
  entity: state.individualEntities.single,
})

const mapActions = dispatch => ({
  goToEdit: entity => goToEditIndividualEntity(dispatch, entity, EDIT_ENTITY_REDIRECT_KEY),
})

export default connect(mapState, mapActions)(ValidateIndividualEntityInfoSideBar)
