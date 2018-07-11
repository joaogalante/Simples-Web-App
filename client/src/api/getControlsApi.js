import { notification } from 'antd'

import callServer, { isError } from './callServer'

const handleError = (response, callback) => {
  if(isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao buscar os relatórios no banco de dados. Se o erro persistir entre em contato com o desenvolvedor.'
    })
    callback(response)
    return true
  }
}

export const getControlsApi = () => {
  return new Promise((onSuccess, onError) => {
    callServer('getControls', {})
      .then(response => {
        if(!handleError(response, onError))
          onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const getControlsForLegalEntityApi = (legalEntityID) => {
  return new Promise((onSuccess, onError) => {
    callServer('getControlsForLegalEntity', { urlParams: { legalEntityID }})
      .then(response => {
        if(!handleError(response, onError))
          onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
