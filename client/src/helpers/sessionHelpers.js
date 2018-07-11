import {sessionService} from 'redux-react-session'
import moment from 'moment'

import {history} from '../config/store'

export const userHasValidAccess = user => {
  if (!user || !user.loggedAt) return false
  const limitDate = moment(user.loggedAt)
    .add(3, 'days')
    .subtract(10, 'minutes')
  return moment().isBefore(limitDate)
}

export const createUserSession = user => {
  const {authToken, ...data} = user
  sessionService.saveSession({token: authToken}).then(() => {
    sessionService.saveUser({...data, loggedAt: new Date()}).then(r => {
      console.log(r)
    })
  })
}

export const destroyUserSession = user => {
  sessionService.deleteSession()
  sessionService.deleteUser()
  history.push('/login')
}
