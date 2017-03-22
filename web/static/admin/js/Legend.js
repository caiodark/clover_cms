import React, {PropTypes} from 'react'
import {cyan100} from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Legend = (props) => {

  const stylerH5 = {
    color: props.muiTheme.palette.secondaryTextColor,
    fontFamily: props.muiTheme.fontFamily,
    padding: "10px",
    margin: 0
  }

  const dvStyle = {
    backgroundColor: cyan100
  }

  return (
    <div style={dvStyle}>
      <h5 style={stylerH5}>{props.name}</h5>
    </div>
  )
}

Legend.propTypes = {
  name: PropTypes.string.isRequired
}

export default muiThemeable()(Legend)
