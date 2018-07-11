import { connect } from 'react-redux'
import React from 'react'

import {
  goToShowIndividualEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import IndividualEntityInfoForm from '../form/IndividualEntityInfoForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const returnTo  = '/individual-entities/new'
const redirectTo = (id) => `/individual-entities/${id}/show`

const NewIndividualEntityInfoPage = ({ redirectAction }) => (
  <SideMenuTemplate activeMenuItem='individualEntities'>
    <PageHeader title="Nova Pessoa Física" returnTo={returnTo} />
    <Panel stretch scroll noPadding flex={1}>
      <IndividualEntityInfoForm redirectAction={redirectAction} returnTo={returnTo} />
    </Panel>
  </SideMenuTemplate>
)

const mapActions = dispatch => ({
  redirectAction: (entity) => goToShowIndividualEntity(dispatch, entity),
})

export default connect(null, mapActions)(NewIndividualEntityInfoPage)
