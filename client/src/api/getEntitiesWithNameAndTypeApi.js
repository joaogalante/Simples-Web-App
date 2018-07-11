import { notification } from 'antd'

import callServer, { isError } from './callServer'

const handleError = (response, callback) => {
  if(isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao efetuar a busca. Se o erro persistir entre em contato com o desenvolvedor.'
    })
    callback(response)
    return true
  }
}

export const getEntitiesWithNameAndTypeApi = (q, type) => {
  return new Promise((onSuccess, onError) => {
    callServer('getEntitiesWithNameAndType', { urlParams: { q: encodeURIComponent(q), type } })
      .then(response => {
        if(!handleError(response, onError))
          onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
