import {notification} from 'antd'

import callServer, {isError} from './callServer'

const handleError = (response, callback) => {
  if (isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao salvar. Se o erro persistir entre em contato com o desenvolvedor.',
    })
    callback(response)
    return true
  }
}

const handleSuccess = (response, callback) => {
  notification.success({
    message: 'Entidade salva com sucesso',
    // description: 'Ocorreu um erro ao salvar. Se o erro persistir entre em contato com o desenvolvedor.'
  })
  callback(response)
}

export const refreshEntityRevisedAtApi = id => {
  return new Promise((onSuccess, onError) => {
    callServer('refreshEntityRevisedAt', {urlParams: {id}})
      .then(response => {
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
