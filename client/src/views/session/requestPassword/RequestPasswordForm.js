import { Form } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { formSubmitHandler } from '../../../helpers/formHelpers'
import Button from '../../../components/actions/Button'
import FormItem from '../../../components/form/FormItem'
import Input from '../../../components/form/Input'
import Link from '../../../components/actions/Link'
import Separator from '../../../components/helpers/Separator'

const RequestPasswordForm = ({ form: { getFieldDecorator }, form, request }) => (
  <Form onSubmit={formSubmitHandler(request, form)} className="login-form">
    <Input 
      getFieldDecorator={getFieldDecorator} 
      placeholder="Senha..." 
      fieldName="Senha" 
      field="pass" 
      type="password" 
      smallMargin
      textCenter
      required />

    <Link small href="/login">Voltar para login</Link>

    <Separator />

    <FormItem noMargin>
      <Button submit fullWidth>Entrar</Button>
    </FormItem>
  </Form>
)

const mapActions = dispatch => ({
  request: (user, handleError) => {}
})

const enhace = compose(
  connect(null, mapActions), 
  Form.create()
)

export default enhace(RequestPasswordForm)
