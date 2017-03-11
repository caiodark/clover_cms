import {connect} from 'react-redux'
import Forms from './Forms'
import {form_new} from './actions'

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    forms: state.forms.list,
    view: ownProps.location.query.view
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
