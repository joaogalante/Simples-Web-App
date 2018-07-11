import { connect } from 'react-redux'
import React from 'react'

import { compose, lifecycle } from 'recompose'

import {
  CONTROLS_FOR_LEGAL_ENTITY_MODAL_KEY,
} from '../../../logicContainers/modal/modal.keys'
import {
  CONTROLS_SECONDARY_LIST_LOADING_KEY,
} from '../../../logicContainers/loading/loading.keys'
import { closeModal } from '../../../logicContainers/modal/modal.actions'
import { getControlsForLegalEntityApi } from '../../../api/getControlsApi'
import {
  goToNewControl,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import { setControlsSecondaryList } from '../_common/controls.actions'
import {
  startLoading,
  stopLoading,
} from '../../../logicContainers/loading/loading.actions'
import Alert from '../../../components/notifications/Alert'
import ControlItemTableMenu from '../list/ControlItemTableMenu'
import Icon from '../../../components/shapes/Icon'
import LoadingSpinnerWrapper from
  '../../../logicContainers/loading/LoadingSpinnerWrapper'
import Modal from '../../../components/structure/Modal'
import SmallControlsTable from '../list/SmallControlsTable'
import TableRowButton from '../../../components/table/TableRowButton'

const MODAL_KEY = CONTROLS_FOR_LEGAL_ENTITY_MODAL_KEY 
const LOADING_KEY = CONTROLS_SECONDARY_LIST_LOADING_KEY 

const AlertMessage = ({ legalEntity }) => (
  <Alert 
    message={`Esses controles já estão cadastrados no sistema para a empreas ${legalEntity.name}. Você pode editar um deles ou cadastrar um novo.`}
    type="info" 
    showIcon />
)

const ControlsForLegalEntityModal = ({ legalEntity, goToNewControl, list, loading, submit, closeModal, open }) => (
  <Modal title={`Controles - ${legalEntity.name}`} visible={open} onCancel={!loading && closeModal} noControls>
    <LoadingSpinnerWrapper loading={loading}>
      <AlertMessage legalEntity={legalEntity} />
      <TableRowButton grey onClick={() => goToNewControl(legalEntity)}>
        <Icon name='plus-blue' />
        Criar novo controle
      </TableRowButton>
      <SmallControlsTable list={list} ControlCell={ControlItemTableMenu} />
    </LoadingSpinnerWrapper>
  </Modal>
)

const lifeCycle = lifecycle({
  componentWillMount() { 
    const { fetchData, legalEntity, open } = this.props
    if(open) fetchData(legalEntity) 
  },
  componentWillReceiveProps(nextProps) {
    if(
      nextProps.open && !!nextProps.legalEntity.id && !nextProps.loading
      && (nextProps.legalEntity.id !== this.props.legalEntity.id || nextProps.open !== this.props.open)) 
    {
      this.props.fetchData(nextProps.legalEntity)
    }
  }
})

const mapState = state => ({
  open: state.modal[MODAL_KEY],
  legalEntity: state.legalEntities.single,
  list: state.controls.secondaryList,
  loading: state.loading[LOADING_KEY]
})

const mapActions = dispatch => ({
  goToNewControl: (legalEntity) => {
    dispatch(closeModal(MODAL_KEY))
    goToNewControl(dispatch, legalEntity)
  },

  fetchData: (legalEntity) => {
    dispatch(startLoading(LOADING_KEY))
    getControlsForLegalEntityApi(legalEntity.id)
      .then(result => {
        dispatch(stopLoading(LOADING_KEY))
        if(!result.length) {
          dispatch(closeModal(MODAL_KEY))
          goToNewControl(dispatch, legalEntity)
        } else {
          dispatch(setControlsSecondaryList(result))
        }
      }).catch(err => {
        dispatch(closeModal(MODAL_KEY))
        dispatch(stopLoading(LOADING_KEY))
      })
  },

  closeModal: () => dispatch(closeModal(MODAL_KEY))
})

const connectState = connect(mapState, mapActions)
const enhace = compose(connectState, lifeCycle)

export default enhace(ControlsForLegalEntityModal)
