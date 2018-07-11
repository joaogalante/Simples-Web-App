import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {ENTITIES_TABLE_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {ENTITY_TYPES, ENTITY_TYPES_LABELS} from '../../../config/vars'
import {VALIDATE_ENTITY_REDIRECT_KEY} from '../../../logicContainers/redirects/redirects.keys'
import {checkSortForEntitiesOnControlSearch} from '../../../helpers/entitiesHelpers'
import {displayCode} from '../../../helpers/entityCodeHelpers'
import {expidationDateFromNow} from '../../../helpers/entityExpirationDate'
import {getExpiredEntitiesOnCompositionApi} from '../../../api/getEntitiesApi'
import {goToValidateEntity} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import {setEntitiesList} from '../_common/entities.actions'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import Button from '../../../components/actions/Button'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import Table, {TableCell, TableRow} from '../../../components/table/Table'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

const ExpiredEntitiesOnCompositionTable = ({list, loading, goToValidate}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Table>
      {list.sort(checkSortForEntitiesOnControlSearch).map(item => (
        <TableRow key={item.id} grey={item.entityType === ENTITY_TYPES.LEGAL}>
          <TableCell flex={3} main>
            <TitleSubtitle title={item.name} subtitle={displayCode(item)} />
          </TableCell>
          <TableCell flex={2}>{ENTITY_TYPES_LABELS[item.entityType]}</TableCell>
          <TableCell flex={2}>
            <span className="color-red">Vencido {expidationDateFromNow(item)}</span>
          </TableCell>
          <TableCell flex={1}>
            <Button small onClick={() => goToValidate(item)}>
              Analizar
            </Button>
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

const LOADING_KEY = ENTITIES_TABLE_LOADING_KEY

const mapState = state => ({
  list: state.entities.list,
  loading: state.loading[LOADING_KEY],
})

const mapActions = (dispatch, {legalEntityID}) => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getExpiredEntitiesOnCompositionApi(legalEntityID)
      .then(list => {
        dispatch(setEntitiesList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
  goToValidate: entity => goToValidateEntity(dispatch, entity, VALIDATE_ENTITY_REDIRECT_KEY),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(ExpiredEntitiesOnCompositionTable)
