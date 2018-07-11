import React from 'react'

import ComposedIndividualEntitiesTable from './ComposedIndividualEntitiesTable'
import IndividualEntityItemTableMenu from './IndividualEntityItemTableMenu'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const IndividualEntitiesPage = () => (
  <SideMenuTemplate activeMenuItem="individualEntities">
    <PageHeader title="Pessoas Físicas" sideTitlePath="/individual-entities/new" sideTitleIcon="plus" />
    <Panel noPadding flex={1}>
      <ComposedIndividualEntitiesTable ControlCell={IndividualEntityItemTableMenu} />
    </Panel>
  </SideMenuTemplate>
)

export default IndividualEntitiesPage
