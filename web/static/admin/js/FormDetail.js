import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'

let id
let name
let defaultMessage

const FormDetail = ({formToEdit, onSaveClick, onCancelClick}) =>
{

return (
  <div>
    <TextField floatingLabelText="Nome"/><br/>
  </div>
    )
}

FormDetail.propTypes = {
  formToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    defaultMessage: PropTypes.string
  }),
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
}

export default FormDetail 
