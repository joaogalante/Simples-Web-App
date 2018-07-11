import { connect } from 'react-redux'

import { compose, lifecycle } from 'recompose'

import {
  LEGAL_ENTITIES_TABLE_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import { getLegalEntitiesApi } from '../../../api/getLegalEntitiesApi'
import { setLegalEntitiesList } from '../_common/legalEntities.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import LegalEntitiesTable from './LegalEntitiesTable'

const willMount = lifecycle({
  componentWillMount() { this.props.fetchData() }
})

const LOADING_KEY = LEGAL_ENTITIES_TABLE_LOADING_KEY

const mapState = state =>({
  list: state.legalEntities.list,
  loading: state.loading[LOADING_KEY]
})

const mapActions = dispatch => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getLegalEntitiesApi()
      .then(list => {
        dispatch(setLegalEntitiesList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err=> dispatch(stopLoading(LOADING_KEY)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(LegalEntitiesTable)
