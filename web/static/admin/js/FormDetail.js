import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import HTMLEditor from './SimpleRichTextEditor'
import Paper from 'material-ui/Paper'
import Legend from './Legend'

const FormDetail = ({formToEdit, onSaveClick, onCancelClick, onNameChange, onDefaultMessageChange}) =>
{

  /*const setRteState = (value) => {
    formToEdit.defaultMessage = value
  }*/

  const dvStyle = {
    marginBottom : "15px"
  }

  const dvInside = {
    padding: "10px"
  }

  return (
    <Paper style={dvStyle} zDepth={1}>
      <Legend name={'Base'} />
      <div style={dvInside}>
        <TextField floatingLabelText="Nome" value={formToEdit.name} onChange={onNameChange}/><br/>
        <HTMLEditor value={formToEdit.defaultMessage} placeholder={'Testo di ringraziamento'} format={'html'} onChange={onDefaultMessageChange} />
      </div>
    </Paper>
  )
}

FormDetail.propTypes = {
  formToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    defaultMessage: PropTypes.string
  }),
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDefaultMessageChange: PropTypes.func.isRequired
}

export default FormDetail 
