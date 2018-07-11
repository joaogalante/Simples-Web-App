import 'whatwg-fetch'

import {notification} from 'antd'
import {sessionService} from 'redux-react-session'

import R from 'ramda'

import {API_URL} from '../config/vars'
import paths from './paths'

const {loadSession} = sessionService

const getHeaders = async () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const {token} = await loadSession()
    if (token) return {...headers, Auth: `Bearer ${token}`}
  } catch (err) {}

  return headers
}

const getPath = (url, pathName, variables) => {
  let {path} = paths[pathName]

  for (let key in variables) {
    const value = variables[key]
    path = path.replace(`:${key}`, value)
  }

  const finalPath = url + path
  return finalPath
}

const callServer = R.curry(async (url, pathName, options) => {
  let {method} = paths[pathName]
  const {urlParams, ...customOptions} = options

  const finalPath = getPath(url, pathName, urlParams || {})
  const headers = await getHeaders()

  return new Promise((resolve, reject) => {
    fetch(finalPath, {
      method,
      headers,
      ...customOptions,
      body: JSON.stringify(options.body),
    })
      .then(function(response) {
        // console.log('first response', response)
        // TODO: Handle response errors
        return response.json()
      })
      .then(function(json) {
        // console.log('final response', json)
        resolve(json)
      })
      .catch(function(ex) {
        notification.error({
          message: 'Ops, occorreu um erro',
          description:
            'Occorreu um erro de comunicação com o servidor. Se o erro persistir entre em contato com o desenvolvedor.',
        })
        resolve(ex)
      })
  })
})

export const isError = response => {
  return response instanceof Error || !!response.error
}

export default callServer(API_URL)
