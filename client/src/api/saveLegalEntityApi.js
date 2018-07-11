import { notification } from 'antd'

import callServer, { isError } from './callServer'

const handleError = (response, callback) => {
  if(isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao salvar. Se o erro persistir entre em contato com o desenvolvedor.'
    })
    callback(response)
    return true
  }
}

const handleSuccess = (response, callback) => {
  notification.success({
    message: 'Empresa salva com sucesso'
    // description: 'Ocorreu um erro ao salvar. Se o erro persistir entre em contato com o desenvolvedor.'
  })
  callback(response)
}

export const createLegalEntityApi = (entity) => {
  return new Promise((onSuccess, onError) => {
    callServer('createLegalEntity', { body: { ...entity } })
      .then(response => {
        if(!handleError(response, onError))
          handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const updateLegalEntityApi = (id, entity) => {
  return new Promise((onSuccess, onError) => {
    callServer('updateLegalEntity', { urlParams: { id }, body: { ...entity } })
      .then(response => {
        if(!handleError(response, onError))
          handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const saveLegalEntityApi = (entity) => (
  !!entity.id ? 
    updateLegalEntityApi(entity.id, entity) : 
    createLegalEntityApi(entity)
)
