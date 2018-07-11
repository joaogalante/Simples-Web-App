import {connect} from 'react-redux'

import {compose, lifecycle} from 'recompose'

import {ENTITIES_TABLE_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {getEntitiesFolderStructureForControlApi} from '../../../api/getEntitiesFolderStructureForControlApi'
import {setEntitiesFolderStructure} from '../_common/entities.actions'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import EntitiesFolderStructure from './EntitiesFolderStructure'

const willMount = lifecycle({
  componentWillMount() {
    this.props.fetchData()
  },
})

const LOADING_KEY = ENTITIES_TABLE_LOADING_KEY

const mapState = state => ({
  root: state.entities.folderStructure,
  loading: state.loading[LOADING_KEY],
})

const mapActions = (dispatch, {controlID}) => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getEntitiesFolderStructureForControlApi(controlID)
      .then(list => {
        console.log(list)
        dispatch(setEntitiesFolderStructure(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(EntitiesFolderStructure)
