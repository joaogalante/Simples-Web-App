import {connect} from 'react-redux'

import {compose, lifecycle} from 'recompose'

import {ENTITIES_TABLE_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {getEntitiesOnControlApi} from '../../../api/getEntitiesOnControlApi'
import {setEntitiesList} from '../_common/entities.actions'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import EntitiesOnControlTable from './EntitiesOnControlTable'

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

const mapActions = (dispatch, {controlID}) => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getEntitiesOnControlApi(controlID)
      .then(list => {
        console.log(list)
        dispatch(setEntitiesList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(EntitiesOnControlTable)
