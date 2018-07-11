import { connect } from 'react-redux'

import { compose, lifecycle } from 'recompose'

import {
  CONTROLS_TABLE_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import { getControlsApi } from '../../../api/getControlsApi'
import { setControlsList } from '../_common/controls.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import ControlsTable from './ControlsTable'

const willMount = lifecycle({
  componentWillMount() { this.props.fetchData() }
})

const LOADING_KEY = CONTROLS_TABLE_LOADING_KEY 

const mapState = state =>({
  list: state.controls.list,
  loading: state.loading[LOADING_KEY]
})

const mapActions = dispatch => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getControlsApi()
      .then(list => {
        dispatch(setControlsList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(ControlsTable)
