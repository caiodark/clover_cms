import {connect} from 'react-redux'
import * as actions from './actions'
import Language from './Language'

const mapStateToProps = (state, props) => {
  return {
    language : state.languageModule.language
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    onChange : (form) => {
      dispatch(actions.language_change(form))
    },
    onCancel : () => {
      dispatch(actions.languages_start())
    },
    onSave : (form) => {
      dispatch(actions.language_save_start(form))
    }
  }
}

const CLanguage = connect(mapStateToProps, mapActionsToProps)(Language)

export default CLanguage
