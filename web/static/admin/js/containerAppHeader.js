import {connect} from 'react-redux'
import AppHeader from './AppHeader'
import {logout, toggle_drawer} from './actions'

const getUser = (user) => {
  return user
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state.user)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOutClick : ()=> {
      dispatch(logout())
    },
    onHamburgerMenuClick : () => {
      dispatch(toggle_drawer())
    }
  }
}

const CAppHeader = connect (
  mapStateToProps,
  mapDispatchToProps
)(AppHeader)

export default CAppHeader
