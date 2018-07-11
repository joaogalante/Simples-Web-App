import { connect } from 'react-redux'
import React from 'react'

import { compose, lifecycle } from 'recompose'

import {
  JOB_TITLES_SELECT_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import { getJobTitlesApi } from '../../../api/getJobTitlesApi'
import {
  mergeJobTitlesList,
  setJobTitlesList
} from '../_common/jobTitles.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import InputArray from '../../../components/form/InputArray'

const SelectJobTitles = ({ options, mergeJobTitles, ...restProps }) => (
	<InputArray
		onChange={mergeJobTitles}
		options={options.map(item => item.name)}
		{...restProps}
	/>
)

const willMount = lifecycle({
  componentWillMount() { !this.props.options.length && this.props.fetchData() }
})

const LOADING_KEY = JOB_TITLES_SELECT_LOADING_KEY 

const mapState = state =>({
  options: state.jobTitles.list,
  loading: state.loading[LOADING_KEY]
})

const mapActions = dispatch => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getJobTitlesApi()
      .then(list => {
        dispatch(setJobTitlesList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },

	mergeJobTitles: (values) => {
		dispatch(mergeJobTitlesList(values.map(name => ({ name }))))
	}
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(SelectJobTitles)
