import {notification} from 'antd'

import callServer, {isError} from './callServer'

const handleError = (response, callback) => {
  if (isError(response)) {
    notification.error({
      message: 'Ops, occorreu um erro',
      description: 'Ocorreu um erro ao gerar o relatório. Se o erro persistir entre em contato com o desenvolvedor.',
    })
    callback(response)
    return true
  }
}

export const generateControlExcelApi = id => {
  return new Promise((onSuccess, onError) => {
    callServer('generateControlExcel', {urlParams: {id}})
      .then(response => {
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const generateControlsEntitiesExcelApi = id => {
  return new Promise((onSuccess, onError) => {
    callServer('generateControlsEntitiesExcel', {urlParams: {id}})
      .then(response => {
        if (!handleError(response, onError)) onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
