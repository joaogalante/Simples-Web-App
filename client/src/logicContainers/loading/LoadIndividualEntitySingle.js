import { connect } from 'react-redux'
import React from 'react'

import { compose, lifecycle } from 'recompose'

import { getIndividualEntityApi } from '../../api/getIndividualEntityApi'
import {
  setIndividualEntitiesSingle,
} from '../../views/individualEntities/_common/individualEntities.actions'
import LoaderTemplateWrapper from '../../templates/LoaderTemplateWrapper'
import PrivateContentWrapper from '../session/PrivateContentWrapper'

const willMount = lifecycle({
  componentWillMount() { this.props.fetchData() }
})

const mapState = state => ({
  loaded: !!state.individualEntities.single && !!state.individualEntities.single.id
})

const mapActions = (dispatch, { id }) => ({
  fetchData: () => {
    getIndividualEntityApi(id)
      .then(item => dispatch(setIndividualEntitiesSingle(item)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)
const Loader = enhace(LoaderTemplateWrapper)

export default (props) => <PrivateContentWrapper><Loader {...props} /></PrivateContentWrapper>
