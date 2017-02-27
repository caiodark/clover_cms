import {connect} from 'react-redux'
import DashBoard from './DashBoard.js'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const CDashBoard = connect(mapStateToProps)(DashBoard)

export default CDashBoard
