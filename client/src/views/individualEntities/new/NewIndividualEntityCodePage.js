import React from 'react'

import IndividualEntityCodeForm from '../form/IndividualEntityCodeForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const returnTo = '/'
const redirectTo = '/individual-entities/new-info'

const NewIndividualEntityCodePage = () => (
  <SideMenuTemplate activeMenuItem='individualEntities'>
    <PageHeader title="Nova Pessoa Física" returnTo={returnTo} />
    <Panel stretch scroll noPadding flex={1}>
      <IndividualEntityCodeForm redirectTo={redirectTo} returnTo={returnTo} />
    </Panel>
  </SideMenuTemplate>
)

export default NewIndividualEntityCodePage
