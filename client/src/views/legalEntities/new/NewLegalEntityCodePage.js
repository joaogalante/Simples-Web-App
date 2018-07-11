import React from 'react'

import LegalEntityCodeForm from '../form/LegalEntityCodeForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const returnTo = '/'
const redirectTo = '/legal-entities/new-info'

const NewLegalEntityCodePage = () => (
  <SideMenuTemplate activeMenuItem='legalEntities'>
    <PageHeader title="Nova Empresa" returnTo={returnTo} />
    <Panel stretch scroll noPadding flex={1}>
      <LegalEntityCodeForm redirectTo={redirectTo} returnTo={returnTo} />
    </Panel>
  </SideMenuTemplate>
)

export default NewLegalEntityCodePage
