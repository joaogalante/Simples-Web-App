import {connect} from 'react-redux'
import React from 'react'

import {branch, compose, lifecycle, renderNothing} from 'recompose'

import {SEARCH_RESULT_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {getUrlParameter} from '../../../helpers/urlParamsHelpers'
import {goToNewLegalEntityInfo} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import {isCNPJNumber} from '../../../helpers/entityCodeHelpers'
import {searchApi} from '../../../api/searchApi'
import {setSearchResult} from '../_common/search.actions'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import ControlItemTableMenu from '../../controls/list/ControlItemTableMenu'
import ControlsTable from '../../controls/list/ControlsTable'
import Icon from '../../../components/shapes/Icon'
import IndividualEntitiesTable from '../../individualEntities/list/IndividualEntitiesTable'
import IndividualEntityItemTableMenu from '../../individualEntities/list/IndividualEntityItemTableMenu'
import LegalEntitiesTable from '../../legalEntities/list/LegalEntitiesTable'
import LegalEntityItemTableMenu from '../../legalEntities/list/LegalEntityItemTableMenu'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import TableHeader from '../../../components/table/TableHeader'
import TableRowButton from '../../../components/table/TableRowButton'

const hideIfNotCNPJ = branch(
  ({code, legalEntities}) => legalEntities.length > 0 || !code || !isCNPJNumber(code),
  renderNothing,
)

const NewLegalEntityButton = hideIfNotCNPJ(({code, goToNewEntity, unregisteredEntity}) => (
  <TableRowButton noBorderTop onClick={() => goToNewEntity({...unregisteredEntity, code})}>
    <Icon name="plus-blue" />
    {!unregisteredEntity.name
      ? `Cadastrar nova empresa com CNPJ ${code}`
      : `Cadastrar empresa: ${unregisteredEntity.name}`}
  </TableRowButton>
))

const SearchResultData = ({
  legalEntities,
  individualEntities,
  loading,
  search,
  controls,
  unregisteredEntity,
  goToNewEntity,
}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <div>
      <TableHeader grey>
        {legalEntities.length > 0 ? 'Empresas encontradas' : 'Nenhuma empresa encontrada'}
        <Icon name="building" color={legalEntities.length !== 0 ? 'blue' : null} />
      </TableHeader>
      <LegalEntitiesTable list={legalEntities} ControlCell={LegalEntityItemTableMenu} />
      <NewLegalEntityButton
        code={search.search}
        legalEntities={legalEntities}
        goToNewEntity={goToNewEntity}
        unregisteredEntity={unregisteredEntity}
      />

      <TableHeader grey>
        {controls.length > 0 ? 'Controles encontradas' : 'Nenhum controle encontrado'}
        <Icon name="papers" color={controls.length !== 0 ? 'blue' : null} />
      </TableHeader>
      <ControlsTable list={controls} ControlCell={ControlItemTableMenu} />

      <TableHeader grey>
        {individualEntities.length > 0 ? 'Pessoas físicas encontradas' : 'Nenhuma pessoa física encontrada'}
        <Icon name="users" color={individualEntities.length !== 0 ? 'blue' : null} />
      </TableHeader>
      <IndividualEntitiesTable list={individualEntities} ControlCell={IndividualEntityItemTableMenu} />
    </div>
  </LoadingSpinnerWrapper>
)

const lifeCycle = lifecycle({
  componentWillMount() {
    this.props.fetchData()
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      this.props.fetchData()
    }
  },
})

const LOADING_KEY = SEARCH_RESULT_LOADING_KEY

const mapState = state => ({
  search: state.search.form,
  legalEntities: state.search.result.legalEntities,
  individualEntities: state.search.result.individualEntities,
  controls: state.search.result.controls,
  unregisteredEntity: state.search.result.unregisteredEntity,
  loading: state.loading[LOADING_KEY],
})

const mapActions = dispatch => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))

    const query = getUrlParameter('q')

    searchApi(query).then(result => {
      dispatch(setSearchResult(result))
      dispatch(stopLoading(LOADING_KEY))
    })
  },

  goToNewEntity: legalEntity => goToNewLegalEntityInfo(dispatch, legalEntity),
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, lifeCycle)

export default enhace(SearchResultData)
