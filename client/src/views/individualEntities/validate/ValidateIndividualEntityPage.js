import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {VALIDATE_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {clearRedirect} from '../../../logicContainers/redirects/redirects.actions'
import {redirectTo} from '../../../logicContainers/redirects/redirectHelpers'
import {refreshEntityRevisedAtApi} from '../../../api/saveEntityApi'
import Button from '../../../components/actions/Button'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import IndividualEntityInfo from '../show/IndividualEntityInfo'
import LoadIndividualEntitySingle from '../../../logicContainers/loading/LoadIndividualEntitySingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import ValidateIndividualEntityInfoSideBar from './ValidateIndividualEntityInfoSideBar'

const ValidateIndividualEntityPage = ({
  individualEntity,
  participations,
  validate,
  redirectAction,
  loading,
  match: {params},
}) => (
  <LoadIndividualEntitySingle id={params.id}>
    <FullWidthTemplate activeMenuItem="individualEntities">
      <PageHeader
        title={`Validando - ${individualEntity.name}`}
        returnAction={redirectAction}
        sideContent={
          <Button onClick={validate} small>
            Atualizar data de validade
          </Button>
        }
      />
      <Panel stretch noPadding flex={1}>
        <FlexGrid flex={1}>
          <FlexGridItem flex={19} scroll basicPadding>
            <IndividualEntityInfo hideExpirationDate />
          </FlexGridItem>
          <FlexGridItem flex={6} borderLeft>
            <ValidateIndividualEntityInfoSideBar />
          </FlexGridItem>
        </FlexGrid>
      </Panel>
    </FullWidthTemplate>
  </LoadIndividualEntitySingle>
)

const REDIRECT_KEY = VALIDATE_ENTITY_REDIRECT_KEY

const willUnmount = lifecycle({
  componentWillUnmount() {
    this.props.clearRedirect()
  },
})

const mapState = state => ({
  individualEntity: state.individualEntities.single,
})

const mapActions = (dispatch, {match: {params}}) => ({
  redirectAction: () => redirectTo(dispatch, REDIRECT_KEY, `/individual-entities/${params.id}/show`),
  validate: () => {
    refreshEntityRevisedAtApi(params.id).then(() =>
      redirectTo(dispatch, REDIRECT_KEY, `/individual-entities/${params.id}/show`),
    )
  },
  clearRedirect: () => dispatch(clearRedirect(REDIRECT_KEY)),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willUnmount)

export default enhace(ValidateIndividualEntityPage)
