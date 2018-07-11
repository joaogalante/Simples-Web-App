import {connect} from 'react-redux'
import React from 'react'

import {API_URL} from '../../config/vars'
import {openModal, closeModal} from '../../logicContainers/modal/modal.actions'
import {startLoading, stopLoading} from '../../logicContainers/loading/loading.actions'
import Button from './Button'
import Content from '../structure/Content'
import Icon from '../shapes/Icon'
import IconButton from './IconButton'
import LoadingSpinnerWrapper from '../../logicContainers/loading/LoadingSpinnerWrapper'
import Modal from '../structure/Modal'
import Separator from '../helpers/Separator'

const ReportDownloadButton = ({label, filePath, loading, generate, download, open, closeModal}) => (
  <div>
    <IconButton tip={label} icon="download-document" onClick={generate} />

    <Modal
      title={!!loading ? 'Gerando relatório...' : 'Relatório pronto para download'}
      visible={open}
      onCancel={closeModal}
      noControls>
      <Content basicPadding centerChild>
        <Separator />
        <LoadingSpinnerWrapper loading={loading}>
          <Button green onClick={download.bind(null, filePath)}>
            <Icon name={'download-document'} white />
            Fazer Download
          </Button>
        </LoadingSpinnerWrapper>
        <Separator />
      </Content>
    </Modal>
  </div>
)

const LOADING_KEY = 'DEFAULT_GENERATE_EXCEL_LOADING_KEY'
const MODAL_KEY = 'DEFAULT_GENERATE_EXCEL_MODAL_KEY'

const mapState = (state, {modalKey, loadingKey}) => ({
  open: state.modal[modalKey || MODAL_KEY],
  loading: state.loading[loadingKey || LOADING_KEY],
})

const mapActions = (dispatch, {generateReport, onComplete, loadingKey, modalKey}) => ({
  generate: () => {
    dispatch(startLoading(loadingKey || LOADING_KEY))
    dispatch(openModal(modalKey || MODAL_KEY))
    generateReport()
      .then(response => {
        onComplete(response)
        dispatch(stopLoading(loadingKey || LOADING_KEY))
      })
      .catch(() => {
        dispatch(stopLoading(loadingKey || LOADING_KEY))
      })
  },
  download: filePath => {
    window.open(API_URL + filePath, 'Download')
  },
  closeModal: () => dispatch(closeModal(modalKey || MODAL_KEY)),
})

export default connect(mapState, mapActions)(ReportDownloadButton)
