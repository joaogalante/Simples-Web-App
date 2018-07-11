import React from 'react'

import Logo from '../../../components/shapes/Logo'
import RequestPasswordForm from './RequestPasswordForm'
import Separator from '../../../components/helpers/Separator'
import SessionTemplate from '../../../templates/SessionTemplate'

const RequestPasswordPage = () => (
  <SessionTemplate>
    <Logo /> 
    <Separator />
    <RequestPasswordForm />
  </SessionTemplate>
)

export default RequestPasswordPage
