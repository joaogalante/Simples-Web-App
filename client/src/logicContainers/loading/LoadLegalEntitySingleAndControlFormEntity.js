import {connect} from 'react-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {getLegalEntityApi} from '../../api/getLegalEntityApi'
import {setControlsForm} from '../../views/controls/_common/controls.actions'
import {setLegalEntitiesSingle} from '../../views/legalEntities/_common/legalEntities.actions'
import LoaderTemplateWrapper from '../../templates/LoaderTemplateWrapper'
import PrivateContentWrapper from '../session/PrivateContentWrapper'

const willMount = lifecycle({
  componentWillMount() {
    this.props.fetchData()
  },
})

const mapState = state => ({
  loaded: !!state.legalEntities.single && !!state.legalEntities.single.id,
})

const mapActions = (dispatch, {id, onLoad}) => ({
  fetchData: () => {
    getLegalEntityApi(id).then(item => {
      const callback = () => {
        dispatch(setLegalEntitiesSingle(item))
        dispatch(setControlsForm({legalEntityID: item.id}))
      }
      if (onLoad) {
        onLoad(item, callback)
      } else {
        callback()
      }
    })
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)
const Loader = enhace(LoaderTemplateWrapper)

export default props => (
  <PrivateContentWrapper>
    <Loader {...props} />
  </PrivateContentWrapper>
)
