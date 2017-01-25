import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, browserHistory} from "react-router"
import LoginCard from './LoginCard'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { cmsApp } from './reducers'

const Noop = () => {
}

let store = createStore(cmsApp);

const BackEnd = () => (
  <Provider store={store}>
    <Router history={browserHistory} component={Noop}>
      <Route path="/admin" component={LoginCard} />
    </Router>
  </Provider>
)

export default BackEnd
