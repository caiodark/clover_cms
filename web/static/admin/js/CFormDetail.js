import {connect} from 'react-redux'
import FormDetail from './FormDetail'
import {forms_redirect, form_name_change, form_default_message_change} from './actions'

const mapStateToProps = (state) => {
  return {
    formToEdit : state.cmsApp.form_editing
  } 
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onSaveClick : ()=>{dispatch(forms_redirect())},
    onCancelClick : ()=>{dispatch(forms_redirect())},
    onNameChange : (event, newValue) => {dispatch(form_name_change(newValue))},
    onDefaultMessageChange: (value) => {dispatch(form_default_message_change(value))}
  } 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDetail)
