import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import {
  goToShowControl,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import ControlForm from '../form/ControlForm'
import LoadControlForm from
  '../../../logicContainers/loading/LoadControlForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const EditControlPage = ({ returnAction, redirectAction, match: { params } }) => (
  <LoadControlForm id={params.id}>
    <SideMenuTemplate activeMenuItem='controls'>
      <PageHeader title='Editando controle' returnAction={() => returnAction(params.id)} />
      <Panel stretch scroll noPadding flex={1}>
        <ControlForm redirectAction={redirectAction} returnAction={() => returnAction(params.id)} />
      </Panel>
    </SideMenuTemplate>
  </LoadControlForm>
)

const mapActions = dispatch => ({
  returnAction: (id) => dispatch(push(`/controls/${id}/show`)),
  redirectAction: (control) => goToShowControl(dispatch, control),
})

export default connect(null, mapActions)(EditControlPage)
