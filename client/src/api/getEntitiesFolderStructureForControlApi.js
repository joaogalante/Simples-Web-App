import {notification} from 'antd'

import callServer, {isError} from './callServer'

const handleError = (response, callback) => {
  if (isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description:
        'Ocorreu um erro ao buscar os entidades da empresa no banco de dados. Se o erro persistir entre em contato com o desenvolvedor.',
    })
    callback(response)
    return true
  }
}

export const getEntitiesFolderStructureForControlApi = controlID => {
  return new Promise((onSuccess, onError) => {
    callServer('getEntitiesFolderStructureForControl', {
      urlParams: {id: controlID},
    })
      .then(response => {
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const getCompressEntitiesFolderStructureForControlApi = controlID => {
  return new Promise((onSuccess, onError) => {
    callServer('getCompressEntitiesFolderStructureForControl', {
      urlParams: {id: controlID},
    })
      .then(response => {
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
