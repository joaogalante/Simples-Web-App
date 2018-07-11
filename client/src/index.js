import 'moment/locale/pt'

import './index.css'

import {ConnectedRouter} from 'react-router-redux'
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux'
import {sessionService} from 'redux-react-session'
import React from 'react'
import ReactDOM from 'react-dom'
import pt_BR from 'antd/lib/locale-provider/pt_BR'

import Routes from './Routes'
import registerServiceWorker from './config/registerServiceWorker'
import store, {history} from './config/store'

const options = {refreshOnCheckAuth: true, redirectPath: '/login'}
sessionService.initSessionService(store, options)

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={pt_BR}>
        <Routes />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
