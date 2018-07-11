import {notification} from 'antd'

import callServer, {isError} from './callServer'

const handleError = (response, callback) => {
  if (isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description:
        'Ocorreu um erro ao buscar os associados da empresa no banco de dados. Se o erro persistir entre em contato com o desenvolvedor.',
    })
    callback(response)
    return true
  }
}

export const getParticipationsCompositionForLegalEntityApi = (legalEntityID, controlID) => {
  return new Promise((onSuccess, onError) => {
    callServer('getParticipationsCompositionForLegalEntity', {
      urlParams: {id: legalEntityID, controlID: controlID || 0},
    })
      .then(response => {
        console.log(response)
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const getParticipationsForLegalEntityApi = legalEntityID => {
  return new Promise((onSuccess, onError) => {
    callServer('getParticipationsForLegalEntity', {urlParams: {id: legalEntityID}})
      .then(response => {
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const getParticipationsForAssociatedEntityApi = associateEntityID => {
  return new Promise((onSuccess, onError) => {
    callServer('getParticipationsForAssociatedEntity', {urlParams: {id: associateEntityID}})
      .then(response => {
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
