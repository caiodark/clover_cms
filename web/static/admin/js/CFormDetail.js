import {connect} from 'react-redux'
import FormDetail from './FormDetail'
import {forms_redirect} from './actions'

const mapStateToProps = (state) => {
  return {
    formToEdit: {
      id:undefined,
      name:undefined,
      defaultMessage:undefined
    }
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onSaveClick : ()=>{dispatch(forms_redirect())},
    onCancelClick : ()=>{dispatch(forms_redirect())}
  } 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDetail)
