import {Form, Modal} from 'antd'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import React from 'react'

import {compose, lifecycle} from 'recompose'

import {GLOBAL_FORM_SUBMIT_LOADING_KEY} from '../../../logicContainers/loading/loading.keys'
import {countExpiredEntitiesOnCompositionApi} from '../../../api/getEntitiesApi'
import {formSubmitHandler, generateMapPropsToFields} from '../../../helpers/formHelpers'
import {goToValidateLegalEntityComposition} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import {mergeControlsForm} from '../_common/controls.actions'
import {saveControlApi} from '../../../api/saveControlApi'
import {startLoading, stopLoading} from '../../../logicContainers/loading/loading.actions'
import Button from '../../../components/actions/Button'
import ButtonsGroup from '../../../components/actions/ButtonsGroup'
import Content from '../../../components/structure/Content'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import Input from '../../../components/form/Input'
import InputDate from '../../../components/form/InputDate'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'

const ControlForm = ({
  form: {getFieldDecorator},
  loading,
  control,
  redirectTo,
  redirectAction,
  returnTo,
  returnAction,
  form,
  submit,
}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Form onSubmit={formSubmitHandler(submit.bind(null, redirectTo, redirectAction, control), form)}>
      <Content flex={1} basicPadding scroll flexDirection="column">
        <FlexGrid>
          <FlexGridItem basicPaddingRight flex={1}>
            <Input getFieldDecorator={getFieldDecorator} label="Número" fieldName="Número" field="num" focus required />
          </FlexGridItem>

          <FlexGridItem flex={1}>
            <Input
              getFieldDecorator={getFieldDecorator}
              label="Centro de Custo"
              fieldName="Centro de custo"
              field="cost"
            />
          </FlexGridItem>
        </FlexGrid>

        <FlexGrid>
          <FlexGridItem basicPaddingRight flex={1}>
            <InputDate
              getFieldDecorator={getFieldDecorator}
              label="Data de Solicitação"
              fieldName="Solicitação"
              field="requestDate"
              required
            />
          </FlexGridItem>

          <FlexGridItem flex={1}>
            <InputDate
              getFieldDecorator={getFieldDecorator}
              label="Date de Entrega"
              fieldName="Entrega"
              field="deliveryDate"
              required
            />
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

const willMount = lifecycle({
  componentWillMount() {
    this.props.checkExpiredEntities(this.props.legalEntity, this.props.isEditing)
  },
})

const mapState = state => ({
  legalEntity: state.legalEntities.single,
  control: state.controls.form,
  isEditing: !!state.controls.form.id,
  loading: state.loading[LOADING_KEY],
})

const mapActions = dispatch => ({
  checkExpiredEntities: (legalEntity, isEditing) => {
    if (!isEditing) {
      countExpiredEntitiesOnCompositionApi(legalEntity.id).then(count => {
        if (count > 0) {
          Modal.confirm({
            title: 'Entidades vencidas encontradas!',
            content: `Forma encontrados ${count} entidades expiradas. Deseja validar antes de criar esse controle? Se validar as entidades depois é necessário atualizar a data de instancia do controle`,
            okText: 'Verificar',
            cancelText: 'Agora não',
            onOk() {
              goToValidateLegalEntityComposition(dispatch, legalEntity)
            },
          })
        }
      })
    }
  },
  submit: (redirectTo, redirectAction, previousControl, control, handleError) => {
    const newControl = {...previousControl, ...control}
    dispatch(mergeControlsForm(control))
    dispatch(startLoading(LOADING_KEY))
    saveControlApi(newControl)
      .then(response => {
        dispatch(stopLoading(LOADING_KEY))
        redirectTo ? dispatch(push(redirectTo)) : redirectAction({...newControl, ...response})
      })
      .catch(err => {
        handleError(err)
        dispatch(stopLoading(LOADING_KEY))
      })
  },
})

const mapPropsToFields = ({control}) => generateMapPropsToFields(control)
const enhace = compose(connect(mapState, mapActions), willMount, Form.create({mapPropsToFields}))

export default enhace(ControlForm)
