import { connect } from 'react-redux'
import React from 'react'

import { displayCode } from '../../../helpers/entityCodeHelpers'
import {
  goToEditIndividualEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import LabelValue from '../../../components/presentation/LabelValue'
import SideBar, {
  SideBarItem,
  SideBarLinksSection,
  SideBarSection,
} from '../../../components/structure/SideBar'

const IndividualEntityInfoSideBar = ({ entity, goToEdit }) => (
  <SideBar borderLeft>
    <FlexGridItem flex={1}>
      <SideBarSection>
      </SideBarSection>
    </FlexGridItem>

    <FlexGridItem>
      <SideBarLinksSection borderTop>
        <SideBarItem label='Editar Individuo' onClick={() => goToEdit(entity)} icon='pencil' />
      </SideBarLinksSection>
    </FlexGridItem>
  </SideBar>
)

const mapState = state => ({
  entity: state.individualEntities.single
})

const mapActions = (dispatch) => ({
  goToEdit: (entity) => goToEditIndividualEntity(dispatch, entity),
})

export default connect(mapState, mapActions)(IndividualEntityInfoSideBar)
