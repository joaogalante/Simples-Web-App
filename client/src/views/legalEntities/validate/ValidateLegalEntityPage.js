import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {VALIDATE_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {
  clearRedirect,
} from '../../../logicContainers/redirects/redirects.actions'
import {redirectTo} from '../../../logicContainers/redirects/redirectHelpers'
import {refreshEntityRevisedAtApi} from '../../../api/saveEntityApi'
import Alert from '../../../components/notifications/Alert'
import Button from '../../../components/actions/Button'
import Content from '../../../components/structure/Content'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import LegalEntityInfo from '../show/LegalEntityInfo'
import LegalEntityParticipationsTable from '../../participations/list/LegalEntityParticipationsTable'
import LoadLegalEntitySingle from '../../../logicContainers/loading/LoadLegalEntitySingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import TableHeader from '../../../components/table/TableHeader'
import ValidateLegalEntityInfoSideBar from './ValidateLegalEntityInfoSideBar'

const ValidateLegalEntityPage = ({legalEntity, redirectAction, loading, validate, match: {params}}) => (
  <LoadLegalEntitySingle id={params.id}>
    <FullWidthTemplate activeMenuItem="legalEntities">
      <PageHeader
        title={`Validando - ${legalEntity.name}`}
        returnAction={redirectAction}
        sideContent={
          <Button onClick={validate} small>
            Atualizar data de validade
          </Button>
        }
      />

      <Panel noPadding flex={1}>
        <FlexGrid flex={1}>
          <FlexGridItem flex={19}>
            <Content scroll>
              <div className="basic-padding">
                <Alert
                  message="Verifique se os dados dessa empresa estão atualizados e clique no botão de validar no topo direito. Caso não estejam, edite antes de validar"
                  type="info"
                  showIcon
                />
                <LegalEntityInfo hideExpirationDate />
              </div>
              <TableHeader borderTop>
                <span>Sócios, Acionistas e Administradores</span>
              </TableHeader>
              <LegalEntityParticipationsTable disableGoToShow legalEntityID={params.id} />
            </Content>
          </FlexGridItem>
          <FlexGridItem flex={6} borderLeft>
            <ValidateLegalEntityInfoSideBar />
          </FlexGridItem>
        </FlexGrid>
      </Panel>
    </FullWidthTemplate>
  </LoadLegalEntitySingle>
)

const REDIRECT_KEY = VALIDATE_ENTITY_REDIRECT_KEY

const willUnmount = lifecycle({
  componentWillUnmount() {
    this.props.clearRedirect()
  },
})

const mapState = state => ({
  legalEntity: state.legalEntities.single,
})

const mapActions = (dispatch, {match: {params}}) => ({
  redirectAction: () => redirectTo(dispatch, REDIRECT_KEY, `/legal-entities/${params.id}/show`),
  validate: () => {
    refreshEntityRevisedAtApi(params.id).then(() =>
      redirectTo(dispatch, REDIRECT_KEY, `/legal-entities/${params.id}/show`),
    )
  },
  clearRedirect: () => dispatch(clearRedirect(REDIRECT_KEY)),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willUnmount)

export default enhace(ValidateLegalEntityPage)
