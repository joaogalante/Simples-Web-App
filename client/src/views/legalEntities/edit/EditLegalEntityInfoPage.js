import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {EDIT_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {clearRedirect} from '../../../logicContainers/redirects/redirects.actions'
import {redirectTo} from '../../../logicContainers/redirects/redirectHelpers'
import LegalEntityInfoForm from '../form/LegalEntityInfoForm'
import LoadLegalEntityForm from '../../../logicContainers/loading/LoadLegalEntityForm'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const EditLegalEntityInfoPage = ({legalEntity, returnAction, redirectAction, match: {params}}) => (
  <LoadLegalEntityForm id={params.id}>
    <SideMenuTemplate activeMenuItem="legalEntities">
      <PageHeader title={`Editando ${legalEntity.name}`} returnAction={() => returnAction(params.id)} />
      <Panel stretch scroll noPadding flex={1}>
        <LegalEntityInfoForm redirectAction={redirectAction} returnAction={() => returnAction(params.id)} />
      </Panel>
    </SideMenuTemplate>
  </LoadLegalEntityForm>
)

const REDIRECT_KEY = EDIT_ENTITY_REDIRECT_KEY

const willUnmount = lifecycle({
  componentWillUnmount() {
    this.props.clearRedirect()
  },
})

const mapState = state => ({
  legalEntity: state.legalEntities.form,
})

const mapActions = dispatch => ({
  returnAction: id => redirectTo(dispatch, REDIRECT_KEY, `/legal-entities/${id}/show`),
  redirectAction: entity => redirectTo(dispatch, REDIRECT_KEY, `/legal-entities/${entity.id}/show`),
  clearRedirect: () => dispatch(clearRedirect(REDIRECT_KEY)),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willUnmount)

export default enhace(EditLegalEntityInfoPage)
