import {Divider, Form} from 'antd'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import React from 'react'

import {GLOBAL_FORM_SUBMIT_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {formSubmitHandler, generateMapPropsToFields} from '../../../helpers/formHelpers'
import {mergeIndividualEntitiesForm} from '../_common/individualEntities.actions'
import {saveIndividualEntityApi} from '../../../api/saveIndividualEntityApi'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import {validateCPF} from '../../../helpers/entityCodeHelpers'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import Content from '../../../components/structure/Content'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import Input from '../../../components/form/Input'
import InputDate from '../../../components/form/InputDate'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import SelectCountry from '../../countries/form/SelectCountry'
import Separator from '../../../components/helpers/Separator'

const IndividualEntityInfoForm = ({
  form: {getFieldDecorator},
  entity,
  redirectTo,
  redirectAction,
  returnTo,
  returnAction,
  form,
  submit,
  loading,
}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Form onSubmit={formSubmitHandler(submit.bind(null, redirectTo, redirectAction, entity), form)}>
      <Content flex={1} basicPadding scroll>
        <Input getFieldDecorator={getFieldDecorator} label="Nome" fieldName="Nome" field="name" required />

        <FlexGrid>
          <FlexGridItem basicPaddingRight flex={1}>
            <Input getFieldDecorator={getFieldDecorator} label="CPF" fieldName="CPF" field="code" />
          </FlexGridItem>

          <FlexGridItem basicPaddingRight flex={1}>
            <InputDate
              getFieldDecorator={getFieldDecorator}
              label="Data de Nascimento"
              fieldName="Data de nascimento"
              field="bornAt"
            />
          </FlexGridItem>

          <FlexGridItem flex={1}>
            <SelectCountry
              getFieldDecorator={getFieldDecorator}
              label="País"
              fieldName="País"
              value={form.getFieldValue('countryID')}
              field="countryID"
            />
          </FlexGridItem>
        </FlexGrid>

        <Divider />
        <Separator small />

        <FlexGrid>
          <FlexGridItem basicPaddingRight flex={3}>
            <Input
              getFieldDecorator={getFieldDecorator}
              label="Logradouro"
              fieldName="Logradouro"
              field="address.name"
            />
          </FlexGridItem>

          <FlexGridItem flex={1}>
            <Input getFieldDecorator={getFieldDecorator} label="Número" fieldName="Número" field="address.num" />
          </FlexGridItem>
        </FlexGrid>

        <FlexGrid>
          <FlexGridItem basicPaddingRight flex={1}>
            <Input
              getFieldDecorator={getFieldDecorator}
              label="Complemento"
              fieldName="Complemento"
              field="address.complement"
            />
          </FlexGridItem>

          <FlexGridItem flex={1}>
            <Input getFieldDecorator={getFieldDecorator} label="CEP" fieldName="CEP" field="address.postal" />
          </FlexGridItem>
        </FlexGrid>

        <FlexGrid>
          <FlexGridItem basicPaddingRight flex={2}>
            <Input getFieldDecorator={getFieldDecorator} label="Bairro" fieldName="Bairro" field="address.region" />
          </FlexGridItem>

          <FlexGridItem basicPaddingRight flex={2}>
            <Input getFieldDecorator={getFieldDecorator} label="Cidade" fieldName="Cidade" field="address.city" />
          </FlexGridItem>

          <FlexGridItem basicPaddingRight flex={1}>
            <Input getFieldDecorator={getFieldDecorator} label="UF" fieldName="UF" field="address.state" />
          </FlexGridItem>
        </FlexGrid>
      </Content>

      <ButtonsGroup>
        <Button lightGrey fullWidth to={returnTo} onClick={returnAction}>
          Voltar
        </Button>
        <Button submit fullWidth>
          Avançar
        </Button>
      </ButtonsGroup>
    </Form>
  </LoadingSpinnerWrapper>
)

const LOADING_KEY = GLOBAL_FORM_SUBMIT_LOADING_KEY

const mapState = state => ({
  entity: state.individualEntities.form,
  loading: state.loading[LOADING_KEY],
})

const mapActions = dispatch => ({
  submit: (redirectTo, redirectAction, previousEntity, entity, handleError) => {
    if (entity.code) {
      const err = validateCPF(entity.code)
      if (err) return handleError(err)
    }

    dispatch(startLoading(LOADING_KEY))
    dispatch(mergeIndividualEntitiesForm(entity))
    const newEntity = {...previousEntity, ...entity}
    saveIndividualEntityApi(newEntity)
      .then(response => {
        dispatch(stopLoading(LOADING_KEY))
        const newEntityWithId = {...newEntity, id: response.id}
        dispatch(mergeIndividualEntitiesForm(newEntityWithId))
        redirectTo ? dispatch(push(redirectTo)) : redirectAction(newEntityWithId)
      })
      .catch(err => {
        dispatch(stopLoading(LOADING_KEY))
        handleError(err)
      })
  },
})

const mapPropsToFields = ({entity}) => generateMapPropsToFields(entity)

const enhace = compose(connect(mapState, mapActions), Form.create({mapPropsToFields}))

export default enhace(IndividualEntityInfoForm)
