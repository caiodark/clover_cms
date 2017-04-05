import {connect} from 'react-redux'
import AppMenu from './AppMenu'
import {toggle_drawer, redirect_dashboard, form_start} from './actions'
import {languages_start} from './languages/actions'

const getIsDrawerOpen = (ui) => {
  return ui.drawer
}

const getIsLanguageModulePresent = (state) => {
  const count = state.user.modules.reduce((a, elem) => {
    if (elem.module.name === "languages")
    { 
      return 1
    }
    else {
      return a
    }
  }, 0)
  return count > 0
}

const mapStateToProps = (state) => {
  return {
    open: getIsDrawerOpen(state.cmsApp.ui),
    language: getIsLanguageModulePresent(state.cmsApp)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseClick : () => {dispatch(toggle_drawer())},
    onDashboardClick: () => {dispatch(redirect_dashboard())},
    onFormsClick: () => {dispatch(form_start())},
    onLanguagesClick: () => {dispatch(languages_start())}    
  }
}

const CAppMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)

export default CAppMenu
