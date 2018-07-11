import { connect } from 'react-redux'
import React from 'react'

import {
  goToEditLegalEntityParticipations,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import LegalEntityInfoForm from '../form/LegalEntityInfoForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const returnTo  = '/legal-entities/new'
const redirectTo = (id) => `/legal-entities/${id}/edit-participations`

const NewLegalEntityInfoPage = ({ redirectAction }) => (
  <SideMenuTemplate activeMenuItem='legalEntities'>
    <PageHeader title="Nova Empresa" returnTo={returnTo} />
    <Panel stretch scroll noPadding flex={1}>
      <LegalEntityInfoForm redirectAction={redirectAction } returnTo={returnTo} />
    </Panel>
  </SideMenuTemplate>
)

const mapActions = dispatch => ({
  redirectAction: (entity) => goToEditLegalEntityParticipations(dispatch, entity),
})

export default connect(null, mapActions)(NewLegalEntityInfoPage)
