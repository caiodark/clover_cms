import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

const HiButton = () => (
  <MuiThemeProvider>
    <div>
    <AppBar 
      title="CloverLab CMS"
      iconClassNameRight="muidocs-icon-navigation-expand-more" 
    />
    <RaisedButton label="Ciao" />
    </div>
  </MuiThemeProvider>
)

export default HiButton
