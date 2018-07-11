import {connect} from 'react-redux'
import React from 'react'

import {
  getCompressEntitiesFolderStructureForControlApi,
} from '../../../api/getEntitiesFolderStructureForControlApi'
import {mergeControlsSingle} from './controls.actions'
import ReportDownloadButton from '../../../components/actions/ReportDownloadButton'

const GenerateButton = ({filePath, generate, onComplete}) => (
  <ReportDownloadButton
    label="Gerar strutura de pastas para download"
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
    return getCompressEntitiesFolderStructureForControlApi(controlId)
  },
  onComplete: response => {
    dispatch(mergeControlsSingle(response))
  },
})

export default connect(mapState, mapActions)(GenerateButton )
