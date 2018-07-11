import {connect} from 'react-redux'
import React from 'react'

import {branch, renderComponent, compose, lifecycle} from 'recompose'

import {PARTICIPATIONS_TABLE_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {displayCode} from '../../../helpers/entityCodeHelpers'
import {getParticipationsForAssociatedEntityApi} from '../../../api/getParticipationsApi'
import {goToShowLegalEntity} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import {setParticipationsList} from '../_common/participations.actions'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import EmptyMessage from '../../../components/notifications/EmptyMessage'
import EntityExpirationIcon from '../../entities/_common/EntityExpirationIcon'
import IconButton from '../../../components/actions/IconButton'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import ParticipationLabel from '../../../components/ParticipationLabel'
import ParticipationTypeTag from '../../../components/ParticipationTypeTag'
import Table, {TableCell, TableLinkCell, TableRow} from '../../../components/table/Table'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

const showEmptyMessageIfHasNoData = branch(
  ({list, loading}) => !loading && !list.length,
  renderComponent(({emptyMessage}) => (
    <EmptyMessage msg={emptyMessage || 'Nenhuma associação com essa entidade foi cadastrada'} />
  )),
)

const AssociatedEntityParticipationsTable = ({list, loading, goToShow, disableGoToShow, ControlCell}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Table>
      {list.map(item => (
        <TableRow key={item.id}>
          <TableLinkCell flex={2} onClick={() => !disableGoToShow && goToShow(item)}>
            <TitleSubtitle title={item.legalEntity.name} subtitle={displayCode(item.legelEntity)} />
          </TableLinkCell>
          <TableCell flex={1}>
            <EntityExpirationIcon entity={item.legalEntity} />
          </TableCell>
          <TableCell flex={2}>
            <ParticipationTypeTag type={item.participationType} shareholderType={item.shareholderType} />
          </TableCell>
          <TableCell flex={2}>
            <ParticipationLabel participation={item} />
          </TableCell>
          <TableCell>
            {!disableGoToShow && <IconButton blue icon="search" tooltip="Ver Empresa" onClick={() => goToShow(item)} />}
          </TableCell>
        </TableRow>
      ))}
    </Table>
  </LoadingSpinnerWrapper>
)

const willMount = lifecycle({
  componentWillMount() {
    this.props.fetchData()
  },
})

const LOADING_KEY = PARTICIPATIONS_TABLE_LOADING_KEY

const mapState = state => ({
  list: state.participations.list,
  loading: state.loading[LOADING_KEY],
})

const mapActions = (dispatch, {associatedEntityID}) => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getParticipationsForAssociatedEntityApi(associatedEntityID)
      .then(list => {
        dispatch(setParticipationsList(list, associatedEntityID))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
  goToShow: participation => goToShowLegalEntity(dispatch, participation.legalEntity),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount, showEmptyMessageIfHasNoData)

export default enhace(AssociatedEntityParticipationsTable)
