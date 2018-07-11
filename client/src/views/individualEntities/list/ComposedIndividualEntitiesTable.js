import { connect } from 'react-redux'

import { compose, lifecycle } from 'recompose'

import {
  INDIVIDUAL_ENTITIES_TABLE_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import {
  getIndividualEntitiesApi,
} from '../../../api/getIndividualEntitiesApi'
import { setIndividualEntitiesList } from '../_common/individualEntities.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import IndividualEntitiesTable from './IndividualEntitiesTable'

const willMount = lifecycle({
  componentWillMount() { this.props.fetchData() }
})

const LOADING_KEY = INDIVIDUAL_ENTITIES_TABLE_LOADING_KEY

const mapState = state =>({
  list: state.individualEntities.list,
  loading: state.loading[LOADING_KEY]
})

const mapActions = dispatch => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getIndividualEntitiesApi()
      .then(list => {
        dispatch(setIndividualEntitiesList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err=> dispatch(stopLoading(LOADING_KEY)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(IndividualEntitiesTable)
