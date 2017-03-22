import {connect} from 'react-redux'
import FormDetail from './FormDetail'
import {form_change} from './actions'

const mapStateToProps = (state) => {
  return {
    formToEdit : state.cmsApp.form_editing
  } 
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onChange : (form)=>{dispatch(form_change(form))}
  } 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDetail)
