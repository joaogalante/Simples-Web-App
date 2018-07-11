import React from 'react'

import ComposedLegalEntitiesTable from './ComposedLegalEntitiesTable'
import LegalEntityItemTableMenu from './LegalEntityItemTableMenu'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const LegalEntitiesPage = () => (
  <SideMenuTemplate activeMenuItem="legalEntities">
    <PageHeader title="Empresas" sideTitlePath="/legal-entities/new" sideTitleIcon="plus" />
    <Panel noPadding flex={1}>
      <ComposedLegalEntitiesTable ControlCell={LegalEntityItemTableMenu} />
    </Panel>
  </SideMenuTemplate>
)

export default LegalEntitiesPage
