import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, hashHistory} from "react-router"
import {routerMiddleware, syncHistoryWithStore, routerReducer} from 'react-router-redux'
import LoginCard from './LoginCard'
import DashBoard from './DashBoard'
import Forms from './CForms'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, dispatch, combineReducers} from 'redux'
import * as reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import {close_drawer} from './actions'
import {enableBatching} from 'redux-batched-actions'

const Noop = () => {
}

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

let rMiddleware = routerMiddleware(hashHistory)
let store = createStore(
  enableBatching(reducer),
  applyMiddleware(...[rMiddleware, thunkMiddleware])
)

const history = syncHistoryWithStore(hashHistory, store)

const AuthReq = (nextState, replace) => {
  if (store) {
    console.log(store.getState())
    if (store.getState().cmsApp.user.loggedIn === false) {
      replace("/login", null)
    }
  }
}

const CloseDrawerAndAuth = (store) => {
  return (nextState, replace) => {
    store.dispatch(close_drawer())
    return AuthReq(nextState, replace)
  }
}

const BackEnd = () => (
  <Provider store={store}>
    <Router history={history} component={Noop}>
      <Route path="/login" component={LoginCard} />
      <Route path="/" component={DashBoard} onEnter={ AuthReq } />
      <Route path="/forms" component={Forms} onEnter= { CloseDrawerAndAuth(store) } />
    </Router>
  </Provider>
)

export default BackEnd
