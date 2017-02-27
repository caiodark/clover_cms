import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, hashHistory} from "react-router"
import LoginCard from './LoginCard'
import DashBoard from './DashBoard'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { cmsApp } from './reducers'
import thunkMiddleware from 'redux-thunk'

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

const BackEnd = () => (
  <Provider store={store}>
    <Router history={hashHistory} component={Noop}>
      <Route path="/login" component={LoginCard} />
      <Route path="/" component={DashBoard} onEnter={ AuthReq } />
    </Router>
  </Provider>
)

export default BackEnd
