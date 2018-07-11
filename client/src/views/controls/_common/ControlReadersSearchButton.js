import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import React from 'react'

import {connectPageReadersForControlApi} from '../../../api/connectPageReadersForControlApi'
import Button from '../../../components/actions/Button'

const SearchButton = ({perform}) =>
  false && (
    <Button small red onClick={perform}>
      Efetuar Pesquisas
    </Button>
  )

const mapActions = (dispatch, {controlId}) => ({
  perform: () => {
    connectPageReadersForControlApi(controlId).then(response => {
      // TODO: Set response on store and go to page
      dispatch(push(`/controls/${controlId}/readers-logs`))
      console.log(321321, response)
    })
  },
})

export default connect(null, mapActions)(SearchButton)
