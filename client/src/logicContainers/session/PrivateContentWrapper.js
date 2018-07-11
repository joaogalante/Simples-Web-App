import {connect} from 'react-redux'
import React from 'react'

import {userHasValidAccess} from '../../helpers/sessionHelpers'
import LoginFormWithLayout from '../../views/session/login/LoginFormWithLayout'
import Spinner from '../../components/shapes/Spinner'

const PrivateContentWrapper = ({user, checked, authenticated, children}) => {
  if (!checked) return <Spinner />
  if (!authenticated || !userHasValidAccess(user)) return <LoginFormWithLayout />

  return children
}

const mapState = ({session}) => ({
  user: session.user,
  checked: session.checked,
  authenticated: session.authenticated,
})

export default connect(mapState)(PrivateContentWrapper)
