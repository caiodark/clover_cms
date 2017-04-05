import {connect} from 'react-redux'
import * as actions from './actions'
import Languages from './Languages'

const mapStateToProps = (state, props) => {
  return {
    languages : state.languageModule.languages.list
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    onNewLanguage : () => {
      dispatch(actions.language_create())
    },
    onOpenLanguage : (id) => {
      dispatch(actions.language_load(id))
    }
  }
}

const CLanguages = connect(mapStateToProps, mapActionsToProps)(Languages)

export default CLanguages
