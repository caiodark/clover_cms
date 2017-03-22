import React,{PropTypes} from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const SectionTitle = (props) => {
  const stylerH2 = {
    color: props.muiTheme.palette.textColor,
    fontFamily: props.muiTheme.fontFamily,
  }

  const stylerHr = {
    border: 0,
    height: "1px",
    color: props.muiTheme.palette.primary1Color,
    backgroundColor: props.muiTheme.palette.primary1Color
  }
  return (
  <div className="title">
    <h2 className="title__elem" style={stylerH2}>{props.sectionName}</h2>
    <hr className="title__ruler" style={stylerHr} />
  </div>)
}

SectionTitle.propTypes = {
  sectionName: PropTypes.string.isRequired
}

export default muiThemeable()(SectionTitle)
