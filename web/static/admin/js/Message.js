import React, {PropTypes} from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Message = (props) => {
  const styler = {
    color: props.muiTheme.palette.textColor,
    fontFamily: props.muiTheme.fontFamily
  }
  return (
    <div>
      <p style={styler}>{props.text}</p>
    </div>
  )
}

Message.propTypes = {
  text : PropTypes.string.isRequired
}

export default muiThemeable()(Message)
