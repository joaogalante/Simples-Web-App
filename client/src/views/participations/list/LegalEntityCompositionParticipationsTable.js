import {connect} from 'react-redux'
import React from 'react'

import {branch, renderComponent, compose, lifecycle} from 'recompose'

import {PARTICIPATIONS_TABLE_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {SortableTable, SortableTableRow, TableCell, TableLinkCell} from '../../../components/table/Table'
import {
  changeParticipationsListItemSort,
  setParticipationsDrilldownList,
  toggleParticipationsDrilldownListCollapse,
} from '../_common/participations.actions'
import {displayCode} from '../../../helpers/entityCodeHelpers'
import {findParticipationsDeepLevel} from '../../../helpers/loopParticipationsDeepLevel'
import {getParticipationTitle} from '../../../helpers/participationNamesHelpers'
import {getParticipationsCompositionForLegalEntityApi} from '../../../api/getParticipationsApi'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import {updateParticipationSortApi} from '../../../api/saveParticipationApi'
import DropdownTableCell from '../../../components/table/DropdownTableCell'
import EmptyMessage from '../../../components/notifications/EmptyMessage'
import EntityExpirationIcon from '../../entities/_common/EntityExpirationIcon'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import ParticipationLabel from '../../../components/ParticipationLabel'
import ParticipationTypeTag from '../../../components/ParticipationTypeTag'
import TableRowMessage from '../../../components/table/TableRowMessage'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

const showEmptyMessageIfHasNoData = branch(
  ({participations, loading}) => !loading && !participations.length,
  renderComponent(({emptyMessage}) => <EmptyMessage msg={emptyMessage} />),
)

const RowStructure = ({item, color, ControlCell, toggleRow, parent, title, subtitle, noSubtitle}) => (
  <SortableTableRow level={item.level} index={item.index}>
    <DropdownTableCell onClick={toggleRow} collapsed={item.collapsed} collapsable={item.collapsable} color={color} />
    <TableLinkCell flex={2} onClick={toggleRow}>
      <TitleSubtitle
        title={title || item.associatedEntity.name}
        subtitle={noSubtitle ? false : subtitle || displayCode(item.associatedEntity)}
      />
    </TableLinkCell>
    <TableCell flex={1}>
      <EntityExpirationIcon entity={item.associatedEntity} />
    </TableCell>
    <TableCell flex={2}>
      <ParticipationTypeTag type={item.participationType} shareholderType={item.shareholderType} />
    </TableCell>
    <TableCell flex={2}>
      <ParticipationLabel participation={item} parent={parent} />
    </TableCell>
    <TableCell>
      <ControlCell item={item} />
    </TableCell>
  </SortableTableRow>
)

const wrapPropsOnLogic = ({toggleRow, ControlCell}) => {
  ControlCell = ControlCell || (() => false)

  const renderRow = (item, parent) => (
    <RowStructure
      key={item.key}
      item={item}
      parent={parent}
      toggleRow={() => item.collapsable && toggleRow(item)}
      ControlCell={ControlCell}
    />
  )

  const renderSpecialShareholderRow = (item, parent) => (
    <RowStructure
      key={item.key}
      title={getParticipationTitle(item)}
      noSubtitle={!item.treasury}
      item={item}
      parent={parent}
      color="yellow"
      ControlCell={ControlCell}
    />
  )

  const renderInfiniteNodeRow = (item, parent) => (
    <TableRowMessage
      key={item.key + '_$'}
      level={item.level + 1}
      title={`A composição dessa empresa já foi apresentada nesse level do drilldown`}
      subtitle={`A composição dessa empresa se encontra alguns niveis acima`}
    />
  )

  const renderRows = (participations, parent) => {
    if (!participations || !participations.length) return false

    return participations.reduce((rows, item) => {
      const newRow =
        item.notEntity || item.treasury ? renderSpecialShareholderRow(item, parent) : renderRow(item, parent)
      let childRows = []
      if (item.collapsed) {
        childRows = !item.infiniteNode
          ? renderRows(item.associatedParticipations, item.associatedEntity)
          : [renderInfiniteNodeRow(item, parent)]
      }
      return [...rows, newRow, ...childRows]
    }, [])
  }

  return renderRows
}

const willMount = lifecycle({
  componentWillMount() {
    this.props.fetchData()
  },
})

const LOADING_KEY = PARTICIPATIONS_TABLE_LOADING_KEY

const LegalEntityCompositionParticipationsTable = props => (
  <LoadingSpinnerWrapper loading={props.loading}>
    <SortableTable
      useDragHandle
      onSortEnd={props.sortRow.bind(null, props.participations)}
      onSortStart={(_, event) => event.preventDefault()}>
      {wrapPropsOnLogic(props)(props.participations)}
    </SortableTable>
  </LoadingSpinnerWrapper>
)

const mapState = state => ({
  participations: state.participations.drilldownList,
  loading: state.loading[LOADING_KEY],
})

const mapActions = (dispatch, {legalEntityID, controlID}) => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getParticipationsCompositionForLegalEntityApi(legalEntityID, controlID)
      .then(list => {
        dispatch(setParticipationsDrilldownList(list, legalEntityID))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
  toggleRow: participation => dispatch(toggleParticipationsDrilldownListCollapse(participation.id)),
  sortRow: (participations, {oldIndex, newIndex}) => {
    const participationThatMoved = findParticipationsDeepLevel(participations, i => i.index === oldIndex)
    const participationOnFinalPosition = findParticipationsDeepLevel(participations, i => i.index === newIndex)
    if (participationThatMoved.legalEntityID === participationOnFinalPosition.legalEntityID) {
      updateParticipationSortApi(participationThatMoved.id, participationOnFinalPosition.sort)
      dispatch(changeParticipationsListItemSort(participationThatMoved, participationOnFinalPosition))
    }
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount, showEmptyMessageIfHasNoData)

export default enhace(LegalEntityCompositionParticipationsTable)
