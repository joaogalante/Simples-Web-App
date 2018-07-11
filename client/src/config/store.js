import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import reducers from './reducers'

// import thunkMiddleware from 'redux-thunk'
// const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(reducers, applyMiddleware(middleware))

export default store
