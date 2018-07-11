import {connect} from 'react-redux'
import React from 'react'

import {goToShowControl} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import ControlForm from '../form/ControlForm'
import LoadLegalEntitySingleAndControlFormEntity from '../../../logicContainers/loading/LoadLegalEntitySingleAndControlFormEntity'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const returnTo = '/controls'
const redirectTo = id => `/controls/${id}/show`

const NewControlPage = ({redirectAction, legalEntity, match: {params}}) => (
  <LoadLegalEntitySingleAndControlFormEntity id={params.legalEntityID}>
    <SideMenuTemplate activeMenuItem="controls">
      <PageHeader title={`Novo Controle - ${legalEntity.name}`} returnTo={returnTo} />
      <Panel stretch scroll noPadding flex={1}>
        <ControlForm redirectAction={redirectAction} returnTo={returnTo} />
      </Panel>
    </SideMenuTemplate>
  </LoadLegalEntitySingleAndControlFormEntity>
)

const mapState = state => ({
  legalEntity: state.legalEntities.single,
})

const mapActions = dispatch => ({
  redirectAction: control => goToShowControl(dispatch, control),
})

export default connect(mapState, mapActions)(NewControlPage)
