import {push} from 'react-router-redux'

import {clearRedirect, setRedirect} from './redirects.actions'
import store from '../../config/store'
global.store = store

export const redirectTo = (dispatch, key, defaultUrl) => {
  const {redirects} = store.getState()
  const historyUrl = redirects[key]
  dispatch(clearRedirect(key))
  dispatch(push(historyUrl ? historyUrl : defaultUrl))
}

export const setCurrentRouteAsRedirect = (dispatch, key) => {
  const {router} = store.getState()
  dispatch(setRedirect(key, router.location.pathname))
}

export const setRedirectAndGoTo = (dispatch, url, key, redirectUrl) => {
  dispatch(setRedirect(key, redirectUrl))
  dispatch(push(url))
}
