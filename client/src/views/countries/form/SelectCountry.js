import { connect } from 'react-redux'
import React from 'react'

import { compose, lifecycle } from 'recompose'

import {
  COUNTRIES_SELECT_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import { getCountriesApi } from '../../../api/getCountriesApi'
import {
  setCountriesList,
  setCountriesMainList,
} from '../_common/countries.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import Select, { OptGroup, Option } from '../../../components/form/Select'

const SelectCountry = ({ mainOptions, searchData, ...restProps }) => (
	<Select 
		showSearch
		filterOption={(v, o) => o.props.title.toLowerCase().includes(v.toLowerCase())}
		{...restProps}
	>
		<OptGroup label="Digite o nome do país para buscar...">
			{mainOptions.map(item => (
				<Option key={item.id} value={item.id} title={item.namePT}>{item.namePT} ({item.code})</Option>
			))}
		</OptGroup>
	</Select>
)

const willMount = lifecycle({
  componentWillMount() { !this.props.mainOptions.length && this.props.fetchData() }
})

const LOADING_KEY = COUNTRIES_SELECT_LOADING_KEY 

const mapState = state =>({
  mainOptions: state.countries.mainList,
  loading: state.loading[LOADING_KEY]
})

const mapActions = dispatch => ({
  fetchData: () => {
    dispatch(startLoading(LOADING_KEY))
    getCountriesApi()
      .then(list => {
        dispatch(setCountriesMainList(list))
        dispatch(stopLoading(LOADING_KEY))
      })
      .catch(err => dispatch(stopLoading(LOADING_KEY)))
  },
	// searchData: (q) => {
    // dispatch(startLoading(LOADING_KEY))
    // getCountriesApi(q)
      // .then(list => {
        // dispatch(setCountriesList(list))
        // dispatch(stopLoading(LOADING_KEY))
      // })
      // .catch(err => dispatch(stopLoading(LOADING_KEY)))
  // },
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, willMount)

export default enhace(SelectCountry)
