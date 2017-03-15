import {connect} from 'react-redux'
import Forms from './Forms'
import {form_new, form_start} from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    forms: state.cmsApp.forms.list,
    view: ownProps.location.query.view
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    onNewClicked : () => {
      dispatch(form_new())
    },
    onAnnullaClicked : () => {
      dispatch(form_start())
    }
  }
}

const CForms = connect(mapStateToProps, mapActionsToProps)(Forms)

export default CForms
