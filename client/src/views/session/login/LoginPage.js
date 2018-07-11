import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React from 'react'

import LoginFormWithLayout from './LoginFormWithLayout'

const LoginPage = ({ goToHome }) => (
	<LoginFormWithLayout redirectAction={goToHome} />
)

const mapActions = dispatch => ({
	goToHome: () => dispatch(push('/'))
})

export default connect(null, mapActions)(LoginPage)
