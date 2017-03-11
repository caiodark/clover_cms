import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, hashHistory} from "react-router"
import LoginCard from './LoginCard'
import DashBoard from './DashBoard'
import Forms from './CForms'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, dispatch } from 'redux'
import { cmsApp } from './reducers'
import thunkMiddleware from 'redux-thunk'
import {close_drawer} from './actions'

const Noop = () => {
}

let store = createStore(cmsApp, applyMiddleware(thunkMiddleware))

const AuthReq = (nextState, replace) => {
  if (store) {
    if (store.getState().user.loggedIn === false) {
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
    <Router history={hashHistory} component={Noop}>
      <Route path="/login" component={LoginCard} />
      <Route path="/" component={DashBoard} onEnter={ AuthReq } />
      <Route path="/forms" component={Forms} onEnter= { CloseDrawerAndAuth(store) } />
    </Router>
  </Provider>
)

export default BackEnd
