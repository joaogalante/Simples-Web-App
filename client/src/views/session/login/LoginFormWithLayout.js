import React from 'react'

import LoginForm from './LoginForm'
import Logo from '../../../components/shapes/Logo'
import Separator from '../../../components/helpers/Separator'
import SessionTemplate from '../../../templates/SessionTemplate'

const LoginFormWithLayout = ({ redirectAction }) => (
  <SessionTemplate>
    <Logo /> 
    <Separator />
    <LoginForm redirectAction={redirectAction} />
  </SessionTemplate>
)

export default LoginFormWithLayout
