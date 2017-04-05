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
import * as languageReducers from './languages/reducers'
import thunkMiddleware from 'redux-thunk'
import {close_drawer,get_session_from_server} from './actions'
import fetch from 'isomorphic-fetch'
import Languages from './languages/CLanguages'
import Language  from './languages/CLanguage'

const Noop = () => {
}

const reducer = combineReducers({
  ...reducers,
  ...languageReducers,
  routing: routerReducer
})

let rMiddleware = routerMiddleware(hashHistory)
let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...[rMiddleware, thunkMiddleware])
)
store.dispatch(get_session_from_server())

const history = syncHistoryWithStore(hashHistory, store)
console.log(history)

const AuthReq = (nextState, replace) => {
  if (store) {
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
      <Route path="/languages" component={Languages} onEnter = {CloseDrawerAndAuth(store)} />
      <Route path="/language/:lang" component={Language} onEnter = { AuthReq } />
    </Router>
  </Provider>
)

export default BackEnd
