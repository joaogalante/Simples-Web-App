import { connect } from 'react-redux'
import React from 'react'

import { compose, lifecycle } from 'recompose'

import { getControlApi } from '../../api/getControlApi'
import {
  setControlsForm,
} from '../../views/controls/_common/controls.actions'
import LoaderTemplateWrapper from '../../templates/LoaderTemplateWrapper'
import PrivateContentWrapper from '../session/PrivateContentWrapper'

const willMount = lifecycle({
  componentWillMount() { this.props.fetchData() }
})

const mapState = state => ({
  loaded: !!state.controls.form && !!state.controls.form.id
})

const mapActions = (dispatch, { id }) => ({
  fetchData: () => {
    getControlApi(id)
      .then(item => dispatch(setControlsForm(item)))
  },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)
const Loader = enhace(LoaderTemplateWrapper)

export default (props) => <PrivateContentWrapper><Loader {...props} /></PrivateContentWrapper>
