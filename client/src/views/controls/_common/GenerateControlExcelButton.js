import {connect} from 'react-redux'
import React from 'react'

import {generateControlExcelApi} from '../../../api/generateControlExcelApi'
import {mergeControlsSingle} from './controls.actions'
import ReportDownloadButton from '../../../components/actions/ReportDownloadButton'

const GenerateControlExcelButton = ({filePath, generate, onComplete}) => (
  <ReportDownloadButton
    label="Gerar Excel de Controle"
    filePath={filePath}
    generateReport={generate}
    onComplete={onComplete}
  />
)

const mapState = state => ({
  filePath: state.controls.single.filePath,
})

const mapActions = (dispatch, {controlId}) => ({
  generate: () => {
    return generateControlExcelApi(controlId)
  },
  onComplete: response => {
    dispatch(mergeControlsSingle(response))
  },
})

export default connect(mapState, mapActions)(GenerateControlExcelButton)
