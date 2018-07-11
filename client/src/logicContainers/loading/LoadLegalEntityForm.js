import { connect } from 'react-redux'
import React from 'react'

import { compose, lifecycle } from 'recompose'

import { getLegalEntityApi } from '../../api/getLegalEntityApi'
import {
  setLegalEntitiesForm,
} from '../../views/legalEntities/_common/legalEntities.actions'
import LoaderTemplateWrapper from '../../templates/LoaderTemplateWrapper'
import PrivateContentWrapper from '../session/PrivateContentWrapper'

const willMount = lifecycle({
  componentWillMount() { this.props.fetchData() }
})

const mapState = state => ({
  loaded: !!state.legalEntities.form && !!state.legalEntities.form.id
})

const mapActions = (dispatch, { id }) => ({
  fetchData: () => {
    getLegalEntityApi(id)
      .then(item => dispatch(setLegalEntitiesForm(item)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)
const Loader = enhace(LoaderTemplateWrapper)

export default (props) => <PrivateContentWrapper><Loader {...props} /></PrivateContentWrapper>
