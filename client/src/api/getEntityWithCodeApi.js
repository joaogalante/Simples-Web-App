import { notification } from 'antd'

import { unformatCode } from '../helpers/entityCodeHelpers'
import callServer, { isError } from './callServer'

const handleError = (response, callback) => {
  if(isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao buscar a empresa no banco de dados. Se o erro persistir entre em contato com o desenvolvedor.'
    })
    callback(response)
    return true
  }
}

export const getEntityWithCodeApi = (code) => {
  return new Promise((onSuccess, onError) => {
    callServer('getEntityWithCode', { urlParams: { code: unformatCode(code) } })
      .then(response => {
        if(!handleError(response, onError))
          onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
