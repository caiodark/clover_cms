import {connect} from 'react-redux'
import AppMenu from './AppMenu'
import {toggle_drawer, goto_dashboard, form_start} from './actions'

const getIsDrawerOpen = (ui) => {
  return ui.drawer
}

const mapStateToProps = (state) => {
  return {
    open: getIsDrawerOpen(state.ui)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseClick : () => {dispatch(toggle_drawer())},
    onDashboardClick: () => {dispatch(goto_dashboard())},
    onFormsClick: () => {dispatch(form_start())}    
  }
}

const CAppMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)

export default CAppMenu
