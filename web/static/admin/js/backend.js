import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, hashHistory} from "react-router"
import LoginCard from './LoginCard'
import DashBoard from './DashBoard'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { cmsApp } from './reducers'

const Noop = () => {
}

let store = createStore(cmsApp);

const BackEnd = () => (
  <Provider store={store}>
    <Router history={hashHistory} component={Noop}>
      <Route path="/login" component={LoginCard} />
      <Route path="/" component={DashBoard} />
    </Router>
  </Provider>
)

export default BackEnd
