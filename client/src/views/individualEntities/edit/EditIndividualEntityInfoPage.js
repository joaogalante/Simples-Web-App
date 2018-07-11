import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {EDIT_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {clearRedirect} from '../../../logicContainers/redirects/redirects.actions'
import {redirectTo} from '../../../logicContainers/redirects/redirectHelpers'
import IndividualEntityInfoForm from '../form/IndividualEntityInfoForm'
import LoadIndividualEntityForm from '../../../logicContainers/loading/LoadIndividualEntityForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const EditIndividualEntityInfoPage = ({individualEntity, returnAction, redirectAction, match: {params}}) => (
  <LoadIndividualEntityForm id={params.id}>
    <SideMenuTemplate activeMenuItem="individualEntities">
      <PageHeader title={`Editando ${individualEntity.name}`} returnAction={() => returnAction(params.id)} />
      <Panel stretch scroll noPadding flex={1}>
        <IndividualEntityInfoForm redirectAction={redirectAction} returnAction={() => returnAction(params.id)} />
      </Panel>
    </SideMenuTemplate>
  </LoadIndividualEntityForm>
)

const REDIRECT_KEY = EDIT_ENTITY_REDIRECT_KEY

const willUnmount = lifecycle({
  componentWillUnmount() {
    this.props.clearRedirect()
  },
})

const mapState = state => ({
  individualEntity: state.individualEntities.form,
})

const mapActions = dispatch => ({
  returnAction: id => redirectTo(dispatch, REDIRECT_KEY, `/individual-entities/${id}/show`),
  redirectAction: entity => redirectTo(dispatch, REDIRECT_KEY, `/individual-entities/${entity.id}/show`),
  clearRedirect: () => dispatch(clearRedirect(REDIRECT_KEY)),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willUnmount)

export default enhace(EditIndividualEntityInfoPage)
