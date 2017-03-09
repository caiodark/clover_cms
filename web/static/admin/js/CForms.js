import {connect} from 'react-redux'
import Forms from './Forms'
import {form_new} from './actions'

const mapStateToProps = state => {
  return {
    forms: state.forms.list,
    view: state.forms.view
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    onNewClicked : () => {
      dispatch(form_new())
    }
  }
}

const CForms = connect(mapStateToProps, mapActionsToProps)(Forms)

export default CForms
