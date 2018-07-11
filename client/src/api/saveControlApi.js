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
    message: 'Relatório salvo com sucesso',
    // description: 'Ocorreu um erro ao salvar. Se o erro persistir entre em contato com o desenvolvedor.'
  })
  callback(response)
}

export const createControlApi = control => {
  return new Promise((onSuccess, onError) => {
    callServer('createControl', {body: {...control}})
      .then(response => {
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const updateControlApi = (id, control) => {
  return new Promise((onSuccess, onError) => {
    callServer('updateControl', {urlParams: {id}, body: {...control}})
      .then(response => {
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const refreshControlInstanceDateApi = id => {
  return new Promise((onSuccess, onError) => {
    callServer('refreshControlInstanceDate', {urlParams: {id}})
      .then(response => {
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const saveControlApi = control =>
  !!control.id ? updateControlApi(control.id, control) : createControlApi(control)
