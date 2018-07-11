import {Form} from 'antd'
import {compose} from 'redux'
import {connect} from 'react-redux'
import React from 'react'

import {createUserSession} from '../../../helpers/sessionHelpers'
import {formSubmitHandler} from '../../../helpers/formHelpers'
import {loginApi} from '../../../api/loginApi'
import Button from '../../../components/actions/Button'
import FormItem from '../../../components/form/FormItem'
import Input from '../../../components/form/Input'
import Link from '../../../components/actions/Link'
import Separator from '../../../components/helpers/Separator'

const LoginForm = ({form: {getFieldDecorator}, form, redirectAction, login}) => (
  <Form onSubmit={formSubmitHandler(login.bind(null, redirectAction), form)} className="login-form">
    <Input
      getFieldDecorator={getFieldDecorator}
      placeholder="Email..."
      fieldName="Email"
      field="email"
      smallMargin
      textCenter
      required
    />

    <Input
      getFieldDecorator={getFieldDecorator}
      placeholder="Senha..."
      fieldName="Senha"
      field="pass"
      type="password"
      textCenter
      smallMargin
      required
    />

    <Link small to="/request-password">
      Esqueceu a senha?
    </Link>

    <Separator />

    <FormItem noMargin>
      <Button submit fullWidth>
        Entrar
      </Button>
    </FormItem>
  </Form>
)

const mapActions = dispatch => ({
  login: (redirectAction, user, handleErrors) => {
    loginApi(user)
      .then(response => {
        if (!response.authToken) {
          handleErrors(response)
          return
        }
        createUserSession(response)
        if (redirectAction) redirectAction(response)
      })
      .catch(error => {
        handleErrors(error)
      })
  },
})

const enhace = compose(connect(null, mapActions), Form.create())

export default enhace(LoginForm)
