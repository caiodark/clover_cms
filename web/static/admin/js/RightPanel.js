import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Legend from './Legend'

const RightPanel = (props) => {
  const btnStyle = {
    margin: 12
  }
  const pprStyle = {
    minHeight: "100px"
  }

  const dvStyle = {
    padding: "10px"
  }

  return (
    <Paper zDepth={1} style={pprStyle}>
      <Legend name={'Pubblicazione'} />
      <div style={dvStyle}>
        <FlatButton label="Salva" secondary={true} style={btnStyle} onClick={props.onSalvaClicked}/>
        <FlatButton label="Chiudi" onClick={props.onAnnullaClicked} />
      </div>
    </Paper>
  )
}

RightPanel.propTypes = {
  onSalvaClicked : PropTypes.func,
  onAnnullaClicked : PropTypes.func
}

export default RightPanel
