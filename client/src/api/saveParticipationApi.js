import {notification} from 'antd'

import {PARTICIPATION_TYPES, SHAREHOLDER_TYPES} from '../config/vars'
import {cleanPercentageAndQuotasForParticipation} from '../helpers/participationOwnershipHelpers'
import callServer, {isError} from './callServer'

const {BOTH, SHAREHOLDER} = PARTICIPATION_TYPES

const formatBeforeSave = p => {
  return cleanPercentageAndQuotasForParticipation({
    ...p,
    associatedEntityID: p.associatedEntity ? p.associatedEntity.id : null,
    legalEntityID: p.legalEntity.id,
    participationType: (p.participationTypeArray.length === 2 ? BOTH : p.participationTypeArray[0]) || SHAREHOLDER,
    shareholderType: p.shareholderType || SHAREHOLDER_TYPES.ENTITY,
    legalEntity: null,
    associatedEntity: null,
  })
}

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
    message: 'Associação salva com sucesso',
    // description: 'Ocorreu um erro ao salvar. Se o erro persistir entre em contato com o desenvolvedor.'
  })
  callback(response)
}

export const createParticipationApi = participation => {
  console.log(formatBeforeSave(participation))
  return new Promise((onSuccess, onError) => {
    console.log('SAVING', formatBeforeSave(participation))
    callServer('createParticipation', {body: {...formatBeforeSave(participation)}})
      .then(response => {
        console.log(response)
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const updateParticipationApi = (id, participation) => {
  return new Promise((onSuccess, onError) => {
    console.log('SAVING', formatBeforeSave(participation))
    callServer('updateParticipation', {urlParams: {id}, body: {...formatBeforeSave(participation)}})
      .then(response => {
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const updateParticipationSortApi = (id, sort) => {
  return new Promise((onSuccess, onError) => {
    callServer('updateParticipationsSorts', {urlParams: {id}, body: {sort}})
      .then(response => {
        if (!handleError(response, onError)) handleSuccess(response, onSuccess)
      })
      .catch(error => {
        handleError(error, onError)
      })
  })
}

export const saveParticipationApi = participation =>
  !!participation.id ? updateParticipationApi(participation.id, participation) : createParticipationApi(participation)
