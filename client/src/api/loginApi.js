import { notification } from 'antd'

import callServer, { isError } from './callServer'

const handleError = (response, callback) => {
  if(isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao logar no sistema. Verifique se os dados estão corretos.'
    })
    callback(response)
    return true
  }
}

export const loginApi = (user) => {
  return new Promise((onSuccess, onError) => {
    callServer('login', { body: { ...user } })
      .then(response => {
        if(!handleError(response, onError))
          onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

