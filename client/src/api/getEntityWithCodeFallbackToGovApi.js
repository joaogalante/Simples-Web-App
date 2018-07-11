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

const handleSuccess = (response, callback) => {
  if(!!response.id) {
    notification.info({
      message: 'Empresa encontrada no banco de dados',
      description: `A ${response.name} já está cadastrada no banco de dados com o CNPJ digitada.`
    })
  // } else if (!!response.name) {
  //   notification.info({
  //     message: 'Empresa encontrada no API do governo',
  //     description: `A ${response.name} não está cadastrada no banco de dados, mas encontramos ela na API do governo`
  //   })
  }
  callback(response)
}

export const getEntityWithCodeFallbackToGovApi = (code) => {
  return new Promise((onSuccess, onError) => {
    callServer('getEntityWithCodeFallbackToGov', { urlParams: { code: unformatCode(code) } })
      .then(response => {
        if(!handleError(response, onError))
          onSuccess(response)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}
