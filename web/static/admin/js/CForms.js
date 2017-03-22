import {connect} from 'react-redux'
import Forms from './Forms'
import {form_new, form_start, form_save_start, form_load} from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    forms: state.cmsApp.forms.list,
    view: ownProps.location.query.view,
    formToEdit: state.cmsApp.form_editing
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    onNewClicked : () => {
      dispatch(form_new())
    },
    onAnnullaClicked : () => {
      dispatch(form_start())
    },
    onSaveClicked: (form) => {
      dispatch(form_save_start(form))
    },
    onOpenClicked: (id) => {
      dispatch(form_load(id))
    }
  }
}

const CForms = connect(mapStateToProps, mapActionsToProps)(Forms)

export default CForms
