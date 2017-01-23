import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, browserHistory} from "react-router"
import HiButton from './hibutton'

const Noop = () => {
}

const BackEnd = () => (
  <Router history={browserHistory} component={Noop}>
   <Route path="/admin" component={HiButton} />
  </Router>
)

export default BackEnd
