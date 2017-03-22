import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import HTMLEditor from './SimpleRichTextEditor'
import Paper from 'material-ui/Paper'
import Legend from './Legend'

const FormDetail = ({formToEdit, onSaveClick, onCancelClick, onChange}) =>
{
  const nameErrors = formToEdit.errors.filter((el) => el.name === 'name')
  const nameError = nameErrors.length > 0 ? nameErrors[0].error : ''

  const setRteState = (value) => {
    var newState = Object.assign({}, formToEdit, {defaultMessage: value})
    onChange(newState)
  }
  
  const setName = (event, newValue) => {
    var newState = Object.assign({}, formToEdit, {name: newValue})
    onChange(newState)
  }

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
        <TextField floatingLabelText="Nome" value={formToEdit.name} onChange={setName} errorText={nameError}/><br/>
        <HTMLEditor value={formToEdit.defaultMessage} placeholder={'Testo di ringraziamento'} format={'html'} onChange={setRteState} />
      </div>
    </Paper>
  )
}

FormDetail.propTypes = {
  formToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    defaultMessage: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      error: PropTypes.string
    }))
  }),
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default FormDetail 
