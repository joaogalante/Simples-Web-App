import { notification } from 'antd'

import callServer, { isError } from './callServer'

const handleError = (response, callback) => {
  if(isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao deletar o controle no banco de dados. Se o erro persistir entre em contato com o desenvolvedor.'
    })
    callback(response)
    return true
  }
}

const handleSuccess = (response, callback) => {
  notification.success({
    message: 'Controle removido com sucesso'
  })
  callback(response)
}

export const deleteControlApi = (id) => {
  return new Promise((onSuccess, onError) => {
    callServer('deleteControl', { urlParams: { id } })
      .then(response => {
        if(!handleError(response, onError))
          handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
