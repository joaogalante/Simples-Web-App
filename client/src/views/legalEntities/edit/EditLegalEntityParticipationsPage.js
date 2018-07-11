import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {EDIT_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {NEW_PARTICIPATION_ASSOCIATED_ENTITY_CODE_MODAL_KEY} from '../../../logicContainers/modal/modal.keys'
import {clearRedirect} from '../../../logicContainers/redirects/redirects.actions'
import {mergeParticipationsDrilldownListEntity} from '../../participations/_common/participations.actions'
import {openNewParticipationAndClearState} from '../../../logicContainers/modal/composedModal.actions'
import {redirectTo} from '../../../logicContainers/redirects/redirectHelpers'
import Button from '../../../components/actions/Button'
import EditIndividualEntityInfoModal from '../../individualEntities/modal/EditIndividualEntityInfoModal'
import EditLegalEntityInfoModal from '../modal/EditLegalEntityInfoModal'
import EditLegalEntityParticipationsTableMenu from './EditLegalEntityParticipationsTableMenu'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import IconButton from '../../../components/actions/IconButton'
import LegalEntityCompositionParticipationsTable from '../../participations/list/LegalEntityCompositionParticipationsTable'
import LoadLegalEntitySingle from '../../../logicContainers/loading/LoadLegalEntitySingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import ParticipationModalFlow from '../../participations/modal/ParticipationModalFlow'
import TableHeader from '../../../components/table/TableHeader'

const MODAL_KEY = NEW_PARTICIPATION_ASSOCIATED_ENTITY_CODE_MODAL_KEY

const EditLegalEntityParticipationsPage = ({
  legalEntity,
  returnAction,
  redirectAction,
  onUpdateEntity,
  openNewParticipationModal,
  match: {params},
}) => (
  <LoadLegalEntitySingle id={params.id}>
    <FullWidthTemplate activeMenuItem="legalEntities">
      <PageHeader
        title={`Editando Associados a ${legalEntity.name}`}
        sideContent={
          <Button grey onClick={() => redirectAction(params.id)} small>
            Finalizar
          </Button>
        }
        returnAction={() => returnAction(params.id)}
      />
      <Panel stretch scroll noPadding flex={1}>
        <TableHeader>
          <span>Sócios, Acionistas e Administradores</span>
          <IconButton icon="add-person" onClick={() => openNewParticipationModal(legalEntity)} />
        </TableHeader>
        <LegalEntityCompositionParticipationsTable
          legalEntityID={params.id}
          redirectAction={() => redirectAction(params.id)}
          returnAction={() => returnAction(params.id)}
          ControlCell={EditLegalEntityParticipationsTableMenu}
          emptyMessage={`Não há nenhum socio/administrador cadastrado para ${
            legalEntity.name
          }. Clique no botão azul acima para adicionar um.`}
        />
      </Panel>
      <ParticipationModalFlow />
      <EditLegalEntityInfoModal submit={onUpdateEntity} />
      <EditIndividualEntityInfoModal submit={onUpdateEntity} />
    </FullWidthTemplate>
  </LoadLegalEntitySingle>
)

const REDIRECT_KEY = EDIT_ENTITY_REDIRECT_KEY

const willUnmount = lifecycle({
  componentWillUnmount() {
    this.props.clearRedirect()
  },
})

const mapState = state => ({
  legalEntity: state.legalEntities.single,
})

const mapActions = dispatch => ({
  returnAction: id => redirectTo(dispatch, REDIRECT_KEY, `/legal-entities/${id}/show`),
  redirectAction: id => redirectTo(dispatch, REDIRECT_KEY, `/legal-entities/${id}/show`),
  clearRedirect: () => dispatch(clearRedirect(REDIRECT_KEY)),
  onUpdateEntity: entity => dispatch(mergeParticipationsDrilldownListEntity(entity)),
  openNewParticipationModal: legalEntity => openNewParticipationAndClearState(dispatch, legalEntity),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willUnmount)

export default enhace(EditLegalEntityParticipationsPage)
