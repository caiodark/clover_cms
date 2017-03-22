import {connect} from 'react-redux'
import FormDetail from './FormDetail'
import {forms_redirect, form_change} from './actions'

const mapStateToProps = (state) => {
  return {
    formToEdit : state.cmsApp.form_editing
  } 
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onSaveClick : ()=>{dispatch(forms_redirect())},
    onCancelClick : ()=>{dispatch(forms_redirect())},
    onChange : (form)=>{dispatch(form_change(form))}
  } 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDetail)
