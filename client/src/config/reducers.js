import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {sessionReducer} from 'redux-react-session'

import controls from '../views/controls/_common/controls.reducer.js'
import countries from '../views/countries/_common/countries.reducer.js'
import jobTitles from '../views/jobTitles/_common/jobTitles.reducer.js'
import entities from '../views/entities/_common/entities.reducer.js'
import individualEntities from '../views/individualEntities/_common/individualEntities.reducer.js'
import legalEntities from '../views/legalEntities/_common/legalEntities.reducer.js'
import loading from '../logicContainers/loading/loading.reducer.js'
import redirects from '../logicContainers/redirects/redirects.reducer.js'
import modal from '../logicContainers/modal/modal.reducer.js'
import participations from '../views/participations/_common/participations.reducer.js'
import search from '../views/search/_common/search.reducer.js'

const reducers = combineReducers({
  legalEntities,
  controls,
  jobTitles,
  countries,
  individualEntities,
  entities,
  participations,
  search,
  loading,
  redirects,
  modal,
  router: routerReducer,
  session: sessionReducer,
})

export default reducers
